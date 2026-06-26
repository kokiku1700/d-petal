"use client";

import Spinner from "@/components/Spinner";
import { useMeQuery } from "@/hooks/useMeQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

function AuthInitializer ({ children }: { children: ReactNode }) {
    const { isLoading } = useMeQuery();

    if ( isLoading )  {
        return (
            <div 
                className="
                    w-full h-screen
                    flex flex-col justify-center items-center gap-1">
                <Spinner />
                <p className="text-sm italic">
                    꽃 잎을 찾고 있습니다..
                </p>
                <p className="text-sm italic">
                    잠시만 기다려 주세요..
                </p>
            </div>
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