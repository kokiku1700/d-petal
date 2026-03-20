import type { EmotionKey } from "@/constant/emotions";

export type Write = {
    date: string;
    category: number;
    emotion: EmotionKey;
    satisfaction: number;
    title: string;
    content: string;
};

export type WriteProps = {
    write: Write;
    onChange: React.Dispatch<React.SetStateAction<Write>>;
};