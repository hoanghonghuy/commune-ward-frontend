import { SearchBar } from "./components/SearchBar";
import { ResultsList } from "./components/ResultsList";

function App() {
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
          <SearchBar />
          <div className="mt-8">
            <ResultsList />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App;