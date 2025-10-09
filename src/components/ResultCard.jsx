import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ResultCard({ communeNew, province, mergedList }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{communeNew}</CardTitle>
                <CardDescription>{province}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    <span className="font-semibold">
                        Sáp nhập từ: 
                    </span>
                    {" "}
                    {mergedList?.join(", ")}
                </p>
            </CardContent>
        </Card>
    )
}