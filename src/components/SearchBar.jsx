import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SearchBar() {
    return (
        <div className="flex w-full items-center space-x-2 rounded-lg bg-white p-4 shadow">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tất cả tỉnh"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem></SelectItem>
                    <SelectItem></SelectItem>
                </SelectContent>
            </Select>
            <Input type="text" placeholder="Nhập tên xã/phường..."></Input>
            <Button type="submit">Tìm kiếm</Button>
            <Button variant="outline">Đặt lại</Button>
        </div>
    );
} 