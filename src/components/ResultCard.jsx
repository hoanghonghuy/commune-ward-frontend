import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { data } from "autoprefixer";

const HighlightedText = ({ text = "", highlight = "" }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, index) => {
                regex.test(part) ? (
                    <mark key={index} className="bg-yellow-200 px-1 rounded">
                        {part}
                    </mark>
                ) : (
                    part
                )
            })}
        </span>
    );
};
export function ResultCard({ data, query }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle text={data.commune_new} highlight={query}>{communeNew}</CardTitle>
                <CardDescription>{data.province}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    <span className="font-semibold">
                        Sáp nhập từ: 
                    </span>
                    {" "}
                    <HighlightedText text={data.merged_list.join(", ")} highlight={query}/>
                </p>
            </CardContent>
        </Card>
    )
}