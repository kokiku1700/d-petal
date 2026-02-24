"use client";

import { useMeQuery } from "@/hooks/useMeQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

function AuthInitializer ({ children }: { children: ReactNode }) {
    const { isLoading } = useMeQuery();

    if ( isLoading ) return <div>로딩 중...</div>
    return <>{children}</>
}

export default function Providers ({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthInitializer>
                {children}
            </AuthInitializer>
        </QueryClientProvider>
    );
};