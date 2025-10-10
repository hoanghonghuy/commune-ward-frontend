import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";

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
      localStorage.clear();
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
    if (params.q) urlParams.append('q', params.q);
    if (params.province) urlParams.append('Province', params.province);
    urlParams.append('page', page);
    
    const url = `http://127.0.0.1:8000/api/communeHistory/?${urlParams.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("API call failed");
      const data = await response.json();
      setResults(data.results);
      setPaginationData({ count: data.count, next: data.next, previous: data.previous });
      setCurrentPage(page);
    } catch (error) {
      toast.error("Đã có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback((params) => {
    setSearchParams(params);
    fetchData(params, 1);
  }, [fetchData]);

  const handleReset = useCallback(() => {
    setResults([]);
    setPaginationData(null);
    setSearchParams({ q: "", province: "" });
    setHasSearched(false);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    if (newPage >= 1) {
      fetchData(searchParams, newPage);
    }
  }, [searchParams, fetchData]);

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