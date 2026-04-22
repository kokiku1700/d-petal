type Props = {
    satisfaction: number;
    count: number;
};

export function getWeekSatisfactionInsight ( data: Props[] ) {
    const totalScore = data.map(e => {
        return e.count * e.satisfaction
    }).reduce((a, b) => a + b, 0);

    const totalCount = data.map(e => {
        return e.count;
    }).reduce((a, b) => a + b, 0);

    const avg = totalCount === 0 ? 0 : totalScore / totalCount;
    let first = "";
    let last = "";

    if ( avg === 0 ) {
        last = "아직 기록이 없습니다."
    } else if ( avg >= 4 ) {
        last = "전반적으로 만족도가 높아요.";
    } else if ( avg >= 3 ) {
        last = "무난한 만족도였어요.";
    } else {
        last = "조금 아쉬움이 남는 나날이었어요.";
    };
    if ( totalCount < 2 && totalCount > 0 ) {
        first = "짧지만"
    };

    return first + " " +last;
};