import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SearchBar({ onSearch, onReset, isLoading }) {
    const [ query, setQuery ] = useState("");
    const [ selectedProvince, setSelectedProvince ] = useState("");
    const [ provinces, setProvinces ] = useState([]);

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/provinces/");
                if (!response.ok) {
                    throw new Error("Failed to fetch provinces");
                }
                const data = await response.json();
                setProvinces(data);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };

        fetchProvinces();
    }, []);

    const handleSearchClick = () => {
        onSearch({ query: query, province: selectedProvince });
    }

    const handleResetClick = () => {
        setQuery("");
        setSelectedProvince("");
        onReset();
    }
    return (
        <div className="flex w-full items-center space-x-2 rounded-lg bg-white p-4 shadow">
            <Select value={selectedProvince} onValueChange={(value) => setSelectedProvince(value === "all" ? "" : value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tất cả tỉnh"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Tất cả tỉnh</SelectItem>
                    {provinces.map((provinceName) => {
                        <SelectItem key={provinceName} value={provinceName}>
                            {provinceName}
                        </SelectItem>
                    })}
                </SelectContent>
            </Select>
            <Input type="text" placeholder="Nhập tên xã/phường..." value={query} onChange={(e) => setQuery(e.target.value)}/>
            <Button type="submit" onClick={handleSearchClick} disabled={isLoading}>
                {isLoading ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
            <Button variant="outline" onClick={handleResetClick} disabled={isLoading}>Đặt lại</Button>
        </div>
    );
} 