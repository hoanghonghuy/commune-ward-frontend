import { useCommuneSearch } from "./hooks/useCommuneSearch";
import { SearchBar } from "./components/SearchBar";
import { ResultsList } from "./components/ResultsList";
import { InitialState } from "./components/InitialState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "sonner";
import { ThemeToggle } from "./components/ThemeToggle";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

function App() {
  const {
    results,
    isLoading,
    searchParams,
    hasSearched,
    paginationData,
    currentPage,
    handleSearch,
    handleReset,
    handlePageChange,
  } = useCommuneSearch();

  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center gap-4">
                <CardTitle className="text-2xl md:text-4xl font-bold">
                  Tra cứu Phường/Xã sau Sáp nhập
                </CardTitle>
                <ThemeToggle />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
                Tìm kiếm thông tin đơn vị hành chính mới theo tên cũ.
              </p>
              <SearchBar 
                onSearch={handleSearch} 
                onReset={handleReset} 
                isLoading={isLoading}
                initialParams={searchParams}
              />
            </CardContent>
          </Card>

          <main>
            {hasSearched ? (
              <>
                {!isLoading && paginationData && (
                  <div className="mb-4 text-sm">
                    <p>
                      Tìm thấy <strong>{paginationData.count}</strong> nhóm kết quả.
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
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                          className={!paginationData.previous ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>
                      <PaginationItem>
                        <span className="p-2 font-medium text-sm">Trang {currentPage}</span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
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