import { useQuery } from "@tanstack/react-query";

export const useMeQuery = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const res = await fetch("/api/me");

            if ( !res.ok ) {
                return null;
            };

            return res.json();
        },
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}