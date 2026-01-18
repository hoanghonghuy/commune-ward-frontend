import { ResultCard } from "./ResultCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const SkeletonCard = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-1/3 mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full" />
    </CardContent>
  </Card>
);

export function ResultsList({ isLoading, results, query }) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-slate-600">Không tìm thấy kết quả phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((item) => (
        <ResultCard
          key={`${item.commune_new}-${item.province}`}
          data={item}
          query={query}
        />
      ))}
    </div>
  );
}
