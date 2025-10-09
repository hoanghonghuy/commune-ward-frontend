import { ResultCard } from "./ResultCard";

export function ResultsList({ isLoading, results, query }) {
    // tb đang tải dữ liệu
    if (isLoading) {
        return <p className="text-center text-slate-600">Đang tải dữ liệu...</p>
    }
    // tb không có kết quả
    if (results.length === 0) {
        return <p className="text-center text-slate-600">Không tìm thấy kết quả phù hợp.</p>
    }
    // hiển thị danh sách kết quả
  return (
    <div className="space-y-4">
      {results.map((item, index) => (
        <ResultCard key={index} data={item} query={query} />
      ))}
    </div>
  );
}