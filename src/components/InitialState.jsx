import { SearchCode } from "lucide-react";

export function InitialState() {
  return (
    <div className="text-center py-16 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
      <div className="flex justify-center items-center mb-4">
        <SearchCode className="h-16 w-16 text-slate-400 dark:text-slate-500" />
      </div>
      <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
        Bắt đầu tra cứu
      </h2>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        Sử dụng thanh tìm kiếm phía trên để tìm thông tin sáp nhập xã/phường.
      </p>
    </div>
  );
}