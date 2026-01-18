import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

export function SearchBar({ onSearch, onReset, isLoading, initialParams }) {
  const [query, setQuery] = useState(initialParams.q || "");
  const [selectedProvince, setSelectedProvince] = useState(
    initialParams.province || "",
  );
  const [provinces, setProvinces] = useState([]);

  const debouncedQuery = useDebounce(query, 500);
  const debouncedProvince = useDebounce(selectedProvince, 500);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/provinces/`);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        setProvinces(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
        toast.error("Không thể tải danh sách tỉnh thành. Vui lòng thử lại.");
      }
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    // Chỉ gọi onSearch nếu các giá trị đã thay đổi so với giá trị ban đầu được lưu
    if (
      debouncedQuery !== initialParams.q ||
      debouncedProvince !== initialParams.province
    ) {
      onSearch({ q: debouncedQuery, province: debouncedProvince });
    }
  }, [debouncedQuery, debouncedProvince, onSearch, initialParams]);

  const handleResetClick = () => {
    setQuery("");
    setSelectedProvince("");
    onReset();
  };

  return (
    <div className="flex w-full flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <Select
        value={selectedProvince}
        onValueChange={(value) =>
          setSelectedProvince(value === "all" ? "" : value)
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Tất cả tỉnh" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả tỉnh</SelectItem>
          {provinces.map((provinceName) => (
            <SelectItem key={provinceName} value={provinceName}>
              {provinceName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Nhập tên xã/phường..."
          className="pl-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        onClick={handleResetClick}
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Đặt lại
      </Button>
    </div>
  );
}
