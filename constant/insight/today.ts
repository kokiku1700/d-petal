export const TODAY_INSIGHT_MESSAGES = {
    noRecord: [
        "오늘은 아직 기록이 없어요.",
        "오늘의 첫 기록을 남겨보는 건 어떨까요?",
    ],
    low: {
        high: {
            positive: [
                "많지는 않았지만 기분 좋게 하루를 남긴 날이에요.",
                "가벼운 기록 속에서도  만족감이 느껴지는 하루였어요.",
            ],
            calm: [
                "많지는 않았지만 차분하게 하루를 남긴 날이에요.",
                "가볍지만 안정감 있게 하루를 정리한 느낌이에요.",
            ],
            negative: [
                "많지 않은 기록 속에도 오늘의 마음이 남아 있어요.",
                "짧은 기록이지만 오늘의 감정이 또렷하게 담겨 있어요.",
            ],
        },
        mid: {
            positive: [
                "가볍게 남긴 기록 속에 기분 좋은 분위기가 느껴져요.",
            ],
            calm: [
                "가볍게 하루를 정리한 차분한 기록이었어요.",
            ],
            negative:[
                "짧게 남긴 기록이지만 오늘의 무게가 느껴져요.",
            ],
        },
        low: {
            positive: [
                "기록은 많지 않았지만, 작은 만족이 남은 하루였어요.",
            ],
            calm: [
                "조용히 하루를 정리해 둔 듯한 기록이에요.",
            ],
            negative: [
                "많지 않은 기록 속에 조금 지친 마음이 보여요.",
                "짧지만 오늘을 버텨낸 흔적이 담겨 있어요.",
            ],
        },
    },
    medium: {
        high: {
            positive: [
                "적당한 기록이 쌓였고, 기분 좋은 흐름이 느껴지는 하루였어요."
            ],
            calm: [
                "적당한 기록 속에 안정적인 하루의 분위기가 담겨 있어요.",
            ],
            negative: [
                "하루를 충분히 남기면서도 감정의 결이 분명했던 날이에요.",
            ],
        },
        mid: {
            positive: [
                "적당한 기록이 쌓인, 비교적 기분 좋은 하루였어요.",
            ],
            calm: [
                "무난하고 차분하게 하루를 정리한 느낌이에요.",
            ],
            negative: [
                "하루를 잘 남겼지만 조금은 무거운 감정도 보이네요.",
            ],
        },
        low: {
            positive: [
                "기록은 잘 남아 있지만, 하루가 조금 벅찼을지도 몰라요.",
            ],
            calm: [
                "하루를 담담하게 정리해 둔 기록이네요.",
            ],
            negative: [
                "기록은 충분했지만, 다소 지친 하루였던 것 같아요.",
                "오늘의 흔적은 또렷하지만 마음은 조금 무거워 보여요.",
            ],
        },
    },
    high: {
        high: {
            positive: [
                "하루를 풍부하게 기록했고, 만족감과 좋은 감정이 함게 남아 있어요.",
                "알차게 남긴 기록 속에 기분 좋은 에너지가 느껴져요.",
            ],
            calm: [
                "하루를 충분히 기록하며 안정적으로 정리한 하루였어요.",
            ],
            negative: [
                "많은 기록 속에 오늘의 복잡한 마음까지 함게 담겨 있어요.",
            ],
        },
        mid: {
            positive: [
                "기록이 풍부하게 쌓였고, 전반적으로 좋은 흐름의 하루였어요.",
            ],
            calm: [
                "알차게 기록하며 차분하게 하루를 돌아본 느낌이에요.",
            ],
            negative: [
                "풍부하게 남긴 기록 속에 조금 지친 감정도 비쳐 보여요.",
            ],
        },
        low: {
            positive: [
                "많이 기록한 하루였지만, 마음 한편은 꽤 지쳐 있었을지도 몰라요.",
            ],
            calm: [
                "하루를 오래 붙잡고 정리한 흔적이 느껴져요.",
            ],
            negative: [
                "많은 기록 속에 오늘의 무게가 깊게 남아 있네요.",
                "하루를 많이 남긴 만큼, 감정도 진하게 스친 날이었어요.",
            ],
        },
    },
} as const;

type SatisfactionLevel = "high" | "mid" | "low";
type EmotionGroup = "positive" | "calm" | "negative";
type CountLevel = "noRecord" | "low" | "medium" | "high";

function getCountLevel ( count: number ): CountLevel {
    if ( count === 0 ) return "noRecord";
    if ( count < 2 ) return "low";
    if ( count < 4 ) return "medium";
    return "low";
};

function getSatisfactionLevel ( avgSatisfaction: number ): SatisfactionLevel {
    if ( avgSatisfaction >= 4 ) return "high";
    if ( avgSatisfaction >= 3 ) return "mid";
    return "low";
}

function getEmotionGroup ( topEmotion: string |null ): EmotionGroup {
    if ( !topEmotion ) return "calm";
    if ( ["joy", "achievement", "expectation"].includes(topEmotion) ) {
        return "positive";
    };
    if ( topEmotion === "calm" ) return "calm";

    return "negative";
};

function pickRandomMessage ( messages: readonly string[] ) {
    return messages[Math.floor(Math.random() * messages.length)];
};

export function getTodayInsight (
    count: number, avgSatisfaction: number, topEmotion: string | null
) {
    const countLevel = getCountLevel(count);

    if ( countLevel === "noRecord" ) {
        return pickRandomMessage(TODAY_INSIGHT_MESSAGES.noRecord);
    };
    const satisfactionLevel = getSatisfactionLevel(avgSatisfaction);
    const emotionGroup = getEmotionGroup(topEmotion);

    return pickRandomMessage(TODAY_INSIGHT_MESSAGES[countLevel][satisfactionLevel][emotionGroup]);
};