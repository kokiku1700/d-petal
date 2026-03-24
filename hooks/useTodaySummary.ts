import { useQuery } from "@tanstack/react-query"


export const useTodaySummary = () => {
    return useQuery({
        queryKey: ["posts", "summary"],
        queryFn: async () => {
            const res = await fetch("/api/posts/summary/today");

            if ( !res.ok ) {
                throw new Error("summary fetch error"); 
            };

            return res.json();
        },
        staleTime: 1000 * 60 * 5, 
    });
};