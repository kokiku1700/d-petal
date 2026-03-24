import Post from "@/app/(protected)/_components/Post";
import { useCategoriesQuery } from "@/hooks/useCategoriesQuery";
import type { Write } from "@/types/write";

type Props = {
    write: Write;
};

export default function WritePreview ({ write }: Props) {
    const { data } = useCategoriesQuery();

    const selectedCategory = data?.find(category => Number(category.category_id) === write.category)

    const previewData = {
        post_id: 0,
        activity_date: write.date || new Date().toISOString().slice(0, 10),
        category_id: write.category,
        category_name: selectedCategory?.name || "카테고리",
        category_color: selectedCategory?.color || "#fab9f4",
        emotion: write.emotion || "joy",
        satisfaction: 0,
        title: write.title || "제목",
        content: write.content || "내용",
        created_at: new Date().toISOString().slice(0, 10),
    };

    return (
        <section 
            className="
                w-full p-5
                rounded-lg shadow-sm shadow-gray-200 
                bg-white">
            <h1 className="pl-3 pb-2 border-b border-gray-200">미리보기</h1>
            <div className="flex justify-center pt-2">
                <Post data={previewData} />
            </div>
            
        </section>
    );
};