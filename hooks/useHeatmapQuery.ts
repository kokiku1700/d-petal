import { useQuery } from "@tanstack/react-query";

type HeatmapData = {
    date: string;
    count: number;
};

type Response = {
    ok: boolean,
    heatmap: HeatmapData[];
};

export function useHeatmapQuery () {
    return useQuery<Response>({
        queryKey: ["posts", "heatmap"],
        queryFn: async () => {
            const res = await fetch("/api/posts/heatmap");

            if ( !res.ok ) {
                throw new Error("히트맵 데이터를 불러오지 못했습니다.");
            }

            return res.json();
        },

        staleTime: 1000 * 60 * 5,
    });
}