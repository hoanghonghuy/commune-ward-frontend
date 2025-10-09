import { SearchBar } from "./components/SearchBar";
import { ResultsList } from "./components/ResultsList";
import { useState } from "react";

function App() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ results, setResults ] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ hasSearched, setHasSearched ] = useState(false);

  const handleSearch = async ({ query, province}) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(query);
    // url động
    const params = new URLSearchParams();
    if (query) 
      params.append("query", query);
    if (province)
      params.append("Province", province);
    const url = `http://127.0.0.1:8000/api/communeHistory/?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleReset = () => {
    setResults([]);
    setSearchQuery("");
    setHasSearched(false);
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-800">
          Tra cứu Phường/Xã sau sáp nhập
        </h1>
        <p className="text-slate-600 mt-2">
          Tìm kiếm thông tin đơn vị hành chính mới theo tên cũ.
        </p>
        </header>

        <main>
          <SearchBar onSearch={handleSearch} onReset={handleReset} isLoading={isLoading}/>
          <div className="mt-8">
            {hasSearched && (
              <ResultsList isLoading={isLoading} results={results} query={searchQuery}/>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App;