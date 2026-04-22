type Trend = "up" | "down" | "flat";

// 연속 기록인지 판단하는 함수
export function getStreak ( counts: number[] ) {
    let streak = 0;

    for ( let i = counts.length - 1; i >= 0; i-- ) {
        if ( counts[i] > 0 ) streak++;
        else break;
    };

    return streak;
};

// 일주일 간 기록이 증가 중인지 감소 중인지 판단하는 함수
export function getTrend ( counts: number[] ): Trend {
    const mid = Math.floor(counts.length / 2);

    const firstHalf = counts.slice(0, mid);
    const secondHalf = counts.slice(mid);

    const avg = ( arr: number[] ) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const firstAvg = avg(firstHalf);
    const secondAvg = avg(secondHalf);

    if ( secondAvg > firstAvg + 0.3 ) return "up";
    if ( secondAvg < firstAvg - 0.3 ) return "down";

    return "flat";
}

// 위 두 함수를 토대로 인사이트를 반환.
export function getWeekTrendInsight( counts: number[], trend: Trend ) {
    const total = counts.reduce((a, b) => a + b, 0);
    const streak = getStreak(counts);

    if ( total === 0 ) {
        return "이번 주는 아직 기록이 없어요. 오늘 한 줄부터 시작해보세요.";
    };
    if  ( streak >= 5 ) {
        return `${streak}일 연속 기록 중이에요. 아주 좋은 흐름이에요.`;
    };
    if ( streak >= 2 ) {
        return `${streak}일 연속 기록 중이에요. 꾸준히 이어가고 있어요.`;
    };
    if ( streak === 1 ) {
        return "오늘 기록으로 다시 흐름을 시작했어요.";
    };
    if ( trend === "up" ) {
        return "최근 기록 수가 조금씩 늘고 있어요.";
    } 
    if ( trend === "flat" ) {
        return "최근 기록 흐름이 안정적으로 유지되고 있어요.";
    }
    if ( trend === "down" ) {
        return "이번 주는 기록 빈도가 살짝 줄었어요.";
    }

    return "이번 주 기록 흐름을 살펴보고 있어요.";
};