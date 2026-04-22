export const emotionsObj = {
    joy: { label: "기쁨", emoji: "😊"},
    calm: { label: "평온", emoji: "😌"},
    achievement: { label: "성취", emoji: "💪"},
    expectation: { label: "기대", emoji: "🤩"},
    sad: { label: "슬픔", emoji: "😞"},
    angry: { label: "분노", emoji: "😡"},
    anxienty: { label: "불안", emoji: "😰"},
    tired: { label: "피로", emoji: "😩"},
} as const;

export type EmotionKey = keyof typeof emotionsObj;

export const emotionsArr = [
    { value: "joy", label: "기쁨", emoji: "😊"},
    { value: "calm", label: "평온", emoji: "😌"},
    { value: "achievement", label: "성취", emoji: "💪"},
    { value: "expectation", label: "기대", emoji: "🤩"},
    { value: "sad", label: "슬픔", emoji: "😞"},
    { value: "angry", label: "분노", emoji: "😡"},
    { value: "anxienty", label: "불안", emoji: "😰"},
    { value: "tired", label: "피로", emoji: "😩"},
];

export const emotionChartColor: Record<EmotionKey, string> = {
    joy: "#f9a8d4",
    calm: "#93c5fd",
    achievement: "#c4b5fd",
    expectation: "#fcd34d",
    sad: "#60a5fa",
    angry: "#f87171",
    anxienty: "#a78bfa",
    tired: "#9ca3af",
};