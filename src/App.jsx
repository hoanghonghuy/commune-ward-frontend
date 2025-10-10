import { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ResultsList } from "./components/ResultsList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { ThemeToggle } from "./components/ThemeToggle";
import { InitialState } from "./components/InitialState";

function App() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async ({ q, province }) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(q);

    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (province) params.append('Province', province);
    
    const url = `http://127.0.0.1:8000/api/communeHistory/?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("API call failed");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch search results:", error);
      setResults([]);
      toast.error("Đã có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults([]);
    setSearchQuery("");
    setHasSearched(false);
  };

  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
        <div className="container mx-auto p-4 md:p-8">
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-center">
              <CardTitle className="text-center text-2xl md:text-4xl font-bold text-slate-800 dark:text-slate-200">
                Tra cứu Phường/Xã sau Sáp nhập
              </CardTitle>
              <ThemeToggle />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-slate-600 mb-6">
                Tìm kiếm thông tin đơn vị hành chính mới theo tên cũ.
              </p>
              <SearchBar onSearch={handleSearch} onReset={handleReset} isLoading={isLoading} />
            </CardContent>
          </Card>

          <main>
            {hasSearched ? (
              // Nếu đã tìm kiếm, hiển thị kết quả
              <>
                {!isLoading && (
                  <div className="mb-4 text-sm text-slate-700 dark:text-slate-400">
                    <p>
                      Hiển thị <strong>{results.length}</strong> kết quả.
                    </p>
                  </div>
                )}
                <ResultsList
                  isLoading={isLoading}
                  results={results}
                  query={searchQuery}
                />
              </>
            ) : (
              // Nếu chưa tìm kiếm, hiển thị trạng thái ban đầu
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