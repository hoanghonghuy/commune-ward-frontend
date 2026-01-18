import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 30000;
const DEBUG_MODE = import.meta.env.VITE_ENABLE_DEBUG === "true";

export function useCommuneSearch() {
  const [results, setResults] = useState(() => {
    const savedResults = localStorage.getItem("results");
    return savedResults ? JSON.parse(savedResults) : [];
  });
  const [searchParams, setSearchParams] = useState(() => {
    const savedParams = localStorage.getItem("searchParams");
    return savedParams ? JSON.parse(savedParams) : { q: "", province: "" };
  });
  const [hasSearched, setHasSearched] = useState(() => {
    const savedHasSearched = localStorage.getItem("hasSearched");
    return savedHasSearched ? JSON.parse(savedHasSearched) : false;
  });
  const [paginationData, setPaginationData] = useState(() => {
    const savedPagination = localStorage.getItem("paginationData");
    return savedPagination ? JSON.parse(savedPagination) : null;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? JSON.parse(savedPage) : 1;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (hasSearched) {
      localStorage.setItem("results", JSON.stringify(results));
      localStorage.setItem("searchParams", JSON.stringify(searchParams));
      localStorage.setItem("paginationData", JSON.stringify(paginationData));
      localStorage.setItem("currentPage", JSON.stringify(currentPage));
      localStorage.setItem("hasSearched", JSON.stringify(true));
    } else {
      // Remove only search-related keys, not theme preference
      const keysToRemove = [
        "results",
        "searchParams",
        "paginationData",
        "currentPage",
        "hasSearched",
      ];
      keysToRemove.forEach((key) => localStorage.removeItem(key));
    }
  }, [results, searchParams, paginationData, currentPage, hasSearched]);

  const fetchData = useCallback(async (params, page) => {
    if (!params.q && !params.province) {
      setResults([]);
      setPaginationData(null);
      return;
    }
    setIsLoading(true);
    setHasSearched(true);

    const urlParams = new URLSearchParams();
    if (params.q) urlParams.append("q", params.q);
    if (params.province) urlParams.append("Province", params.province);
    urlParams.append("page", page);

    const url = `${API_BASE_URL}/api/communeHistory/?${urlParams.toString()}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

      const response = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail ||
            errorData.message ||
            `HTTP Error: ${response.status}`,
        );
      }

      const data = await response.json();

      if (DEBUG_MODE) {
        console.log("API Response:", data);
      }

      setResults(data.results || []);
      setPaginationData({
        count: data.count || 0,
        next: data.next || null,
        previous: data.previous || null,
      });
      setCurrentPage(page);
    } catch (error) {
      if (error.name === "AbortError") {
        toast.error("Không thể kết nối với máy chủ. Vui lòng thử lại.");
        console.error("API timeout:", error);
      } else if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError")
      ) {
        toast.error(
          "Không thể kết nối với máy chủ. Vui lòng kiểm tra kết nối mạng.",
        );
        console.error("Network error:", error);
      } else {
        toast.error(error.message || "Đã có lỗi xảy ra khi tải dữ liệu.");
        console.error("API error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (params) => {
      setSearchParams(params);
      fetchData(params, 1);
    },
    [fetchData],
  );

  const handleReset = useCallback(() => {
    setResults([]);
    setPaginationData(null);
    setSearchParams({ q: "", province: "" });
    setHasSearched(false);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 1) {
        fetchData(searchParams, newPage);
      }
    },
    [searchParams, fetchData],
  );

  return {
    results,
    isLoading,
    searchParams,
    hasSearched,
    paginationData,
    currentPage,
    handleSearch,
    handleReset,
    handlePageChange,
  };
}
