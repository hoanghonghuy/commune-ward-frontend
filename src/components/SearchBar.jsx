import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

export function SearchBar({ onSearch, onReset, isLoading }) {
  const [query, setQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/provinces/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleSearchClick = () => {
    onSearch({ q: query, province: selectedProvince });
  };

  const handleResetClick = () => {
    setQuery("");
    setSelectedProvince("");
    onReset();
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className="flex w-full flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
      <Select
        value={selectedProvince}
        onValueChange={(value) => setSelectedProvince(value === "all" ? "" : value)}
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
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button onClick={handleSearchClick} disabled={isLoading} className="w-full sm:w-auto">
        <Search className="mr-2 h-4 w-4" />
        {isLoading ? "Đang tìm..." : "Tìm kiếm"}
      </Button>
      <Button variant="outline" onClick={handleResetClick} disabled={isLoading} className="w-full sm:w-auto">
        <RotateCcw className="mr-2 h-4 w-4" />
        Đặt lại
      </Button>
    </div>
  );
}