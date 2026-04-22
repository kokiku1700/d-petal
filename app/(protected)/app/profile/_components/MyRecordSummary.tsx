import { EmotionKey, emotionsObj } from "@/constant/emotions";
import { getSessionUser } from "@/lib/getSessionUser";
import { getSummary } from "@/lib/summary"
import AllRecordCountIcon from "@/components/AllRecordCountIcon";
import AllRecordAvgSatisfactionIcon from "@/components/AllRecordAvgSatisfactionIcon";
import AllRecordTopEmotionIcon from "@/components/AllRecordTopEmotionIcon";
import AllRecordTopCategoryIcon from "@/components/AllRecordTopCategoryIcon";

export default async function MyRecordSummary () {
    const user = await getSessionUser();

    if ( !user ) return null;

    const summary = await getSummary(user.user_id);
    const topEmotion = emotionsObj[summary.top_emotion as EmotionKey].label;

    const summaryArr = [
        {
            title: "총 기록 수",
            value: summary.count,
            svg: AllRecordCountIcon,
        },
        {
            title: "가장 많은 감정",
            value: topEmotion,
            svg: AllRecordTopEmotionIcon,
        },
        {
            title: "평균 만족도",
            value: summary.avg_satisfaction,
            svg: AllRecordAvgSatisfactionIcon,
        },
        {
            title: "가장 많은 카테고리",
            value: summary.top_category_name,
            svg: AllRecordTopCategoryIcon,
        },
    ];
    
    return (
        <section 
            className="
                flex flex-col
                w-[70%] p-2
                rounded-xl
                border border-gray-400
                bg-white">
            <h1 
                className="
                    pl-5 py-2 
                    text-xl font-bold 
                    border-b border-gray-300">
                내 기록
            </h1>
            <div className="w-full h-full flex">    
                {summaryArr.map((e, idx) => (
                    <div 
                        key={idx}
                        className="
                            w-full 
                            flex flex-col justify-center items-center gap-3">
                        <e.svg />
                        <h3
                            className="
                                text-sm text-gray-500">
                            {e.title}
                        </h3>
                        <strong
                            className="
                                text-xl font-bold text-gray-600">
                            {e.value}
                        </strong>
                    </div>
                ))}
            </div>
        </section>
    );
};