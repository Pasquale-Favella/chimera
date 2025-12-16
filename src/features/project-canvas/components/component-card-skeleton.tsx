import { Skeleton } from "@/components/ui/skeleton";

export function ComponentCardSkeleton() {
    return (
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                </div>
            </div>
            <div className="aspect-video w-full rounded-lg border bg-muted/20 overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
        </div>
    );
}
