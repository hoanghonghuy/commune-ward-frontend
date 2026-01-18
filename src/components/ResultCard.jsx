import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HighlightedText = ({ text = "", highlight = "" }) => {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-yellow-200 px-1 rounded-sm text-slate-800"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export function ResultCard({ data, query }) {
  return (
    <div>
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>
            <HighlightedText text={data.commune_new} highlight={query} />
          </CardTitle>
          <CardDescription>
            <HighlightedText text={data.province} highlight={query} />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <span className="font-semibold">Sáp nhập từ:</span>{" "}
            <HighlightedText
              text={data.merged_list.join(", ")}
              highlight={query}
            />
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
