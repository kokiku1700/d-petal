import type { EmotionKey } from "@/constant/emotions";

export type Post = {
    activity_date: string;
    category_color: string;
    category_id: number;
    category_name: string
    content: string;
    emotion: EmotionKey;
    post_id: number;
    satisfaction: number;
    title: string;
    created_at: string;
};