import { useState, useCallback } from "react";
import { SearchBar } from "./components/SearchBar";
import { ResultsList } from "./components/ResultsList";
import { InitialState } from "./components/InitialState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { ThemeToggle } from "./components/ThemeToggle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({ q: "", province: "" });
  const [hasSearched, setHasSearched] = useState(false);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useCallback(async (params, page) => {
    // Không tìm kiếm nếu không có bất kỳ tham số nào
    if (!params.q && !params.province) {
      setResults([]);
      setPaginationData(null);
      // Giữ hasSearched=true nếu người dùng xóa hết chữ, để hiển thị "Không tìm thấy kết quả"
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
      setPaginationData({
        count: data.count,
        next: data.next,
        previous: data.previous,
      });
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setResults([]);
      setPaginationData(null);
      toast.error("Đã có lỗi xảy ra khi tải dữ liệu.");
    } finally {
      setIsLoading(false);
    }
  }, []); // Mảng rỗng vì hàm chỉ dùng setter, vốn đã ổn định

  const handleSearch = useCallback((params) => {
    setSearchParams(params);
    fetchData(params, 1); // Tìm kiếm mới luôn bắt đầu từ trang 1
  }, [fetchData]);

  const handleReset = useCallback(() => {
    setResults([]);
    setPaginationData(null);
    setSearchParams({ q: "", province: "" });
    setHasSearched(false);
    setCurrentPage(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1) {
      fetchData(searchParams, newPage);
    }
  };

  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center gap-4">
                <CardTitle className="text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                  Tra cứu Phường/Xã sau Sáp nhập
                </CardTitle>
                <ThemeToggle />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                Tìm kiếm thông tin đơn vị hành chính mới theo tên cũ.
              </p>
              <SearchBar onSearch={handleSearch} onReset={handleReset} isLoading={isLoading} />
            </CardContent>
          </Card>

          <main>
            {hasSearched ? (
              <>
                {!isLoading && paginationData && (
                  <div className="mb-4 text-sm text-slate-700 dark:text-slate-400">
                    <p>
                      Tìm thấy <strong>{paginationData.count}</strong> nhóm kết quả sáp nhập.
                    </p>
                  </div>
                )}
                <ResultsList
                  isLoading={isLoading}
                  results={results}
                  query={searchParams.q}
                />
                {!isLoading && paginationData && (paginationData.next || paginationData.previous) && (
                  <Pagination className="mt-8">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => { e.preventDefault(); if (paginationData.previous) handlePageChange(currentPage - 1); }}
                          className={!paginationData.previous ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <span className="p-2 font-medium text-sm">Trang {currentPage}</span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => { e.preventDefault(); if (paginationData.next) handlePageChange(currentPage + 1); }}
                          className={!paginationData.next ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </>
            ) : (
              <InitialState />
            )}
          </main>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;