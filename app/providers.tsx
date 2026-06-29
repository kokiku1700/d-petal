"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useMeQuery } from "@/hooks/useMeQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

function AuthInitializer ({ children }: { children: ReactNode }) {
    const { isLoading } = useMeQuery();

    if ( isLoading )  {
        return (
            <LoadingSpinner 
                height="screen"
                text1="꽃 잎을 찾고 있습니다." 
                text2="잠시만 기다려 주세요."/>
        )
    }
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