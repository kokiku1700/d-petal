import { getSessionUser } from "@/lib/getSessionUser"
import { 
    getTodaySummaryDetail, 
    getWeekSummaryDetail, 
    getWeekPostTrend,
    getWeekCategorySummaryDetail,
    getWeekEmotionSummaryDetail,
    getWeekSatisfactionSummaryDetail } from "@/lib/summary";
import { emotionsObj, EmotionKey } from "@/constant/emotions";
import WeekPostTrendChart from "./_components/WeekPostTrendChart";
import WeekSatisfactionSummaryDetail from "./_components/WeekSatisfaction";
import WeekEmotionSummaryDetail from "./_components/WeekEmotion";
import WeekCategroySummaryDetail from "./_components/WeekCategory";
import { getTodayInsight } from "@/constant/insight/today";

export default async function RecordSummary () {
    const user = await getSessionUser();

    if ( !user ) return null;

    // 오늘 기록 요약
    const todaySummary = await getTodaySummaryDetail(user.user_id);
    // 일주일 요약
    const weekSummary = await getWeekSummaryDetail(user.user_id);
    // 일주일 간 작성한 글 개수
    const weekPostTrend = await getWeekPostTrend(user.user_id);
    // 일주일 간 카테고리 개수 
    const weekCategorySummaryDetail = await getWeekCategorySummaryDetail(user.user_id);
    // 일주일 간 감정 개수
    const weekEmotionSummaryDetail = await getWeekEmotionSummaryDetail(user.user_id);
    // 일주일 간 만족도(1 ~ 5) 개수 
    const weekSatisfactionSummaryDetail = await getWeekSatisfactionSummaryDetail(user.user_id);
    
    const topEmotion = todaySummary?.top_emotion;
    const emoji = topEmotion ? emotionsObj[topEmotion as EmotionKey].emoji : "";

    const todayInsight = getTodayInsight(todaySummary.count, todaySummary.avg_satisfaction, todaySummary.top_emotion)
    
    return (
        <main 
            className="
                w-[95%] pt-4
                flex flex-col gap-4
                mx-auto
                lg:w-[75%]">
            {/* 상단: 오늘 기록 요약 */}
            <section
                className="
                    w-full p-2 rounded-lg bg-white shadow
                    lg:p-5">
                <h1 
                    className="
                        pb-2 pl-2
                        text-lg font-semibold 
                        border-b border-gray-400
                        lg:text-2xl lg:pl-0">
                    오늘 기록 요약
                </h1>
                <div className="w-full flex justify-center items-center p-4">
                    <div className="basis-3/5 flex flex-col gap-4">
                        <div className="w-full flex justify-around ">
                            <div>
                                <span className="text-lg lg:text-2xl">{todaySummary.count}</span>
                                <span className="px-1 text-gray-500">기록</span>
                            </div>
                            <div>
                                <span className="text-lg lg:text-2xl">{todaySummary.avg_satisfaction}</span>
                                <span className="px-1 text-gray-500">점</span>
                            </div>    
                        </div>
                        <p 
                            style={{ textShadow: "5px 5px 20px #f365ec"}}
                            className="text-center text-base italic lg:text-lg">
                            {`"${todayInsight}"`}
                        </p>
                    </div> 
                    <div className="basis-2/5 text-center">
                        <span 
                            className="w-12 h-12 rounded-xl shadow text-2xl cursor-default lg:6xl">
                            {emoji ? emoji : "-"}
                        </span>
                        <span className="px-1">{topEmotion ? emotionsObj[todaySummary.top_emotion as EmotionKey].label : ""}</span>
                    </div>
                </div>
            </section>
            {/* 중단: 일주일 간 기록 그래프 */}
            <section
                className="
                    w-full p-2 rounded-lg bg-white shadow
                    lg:p-5">
                <div>
                    <div 
                        className="
                            flex flex-col items-start
                            pb-2 pl-2 border-b border-gray-400
                            lg:flex-row lg:items-end lg:gap-4">
                        <h1 className="text-lg font-semibold lg:text-2xl">
                            7일 간 추이
                        </h1>
                        <p className="text-sm text-gray-400 lg:text-md">
                            7일 간의 기록을 돌아보세요.
                        </p>
                    </div>
                    
                    {/* 중단-기록, 만족도 */}
                    <div 
                        className="
                            flex flex-col gap-4 mb-4
                            lg:flex-row lg:mb-0"> 
                        <WeekPostTrendChart data={weekPostTrend} />
                        <WeekSatisfactionSummaryDetail data={weekSatisfactionSummaryDetail} />
                    </div>
                    {/* 중단-감정, 카테고리 */}
                    <div 
                        className="
                            flex flex-col gap-4
                            lg:flex-row">  
                        <WeekEmotionSummaryDetail data={weekEmotionSummaryDetail} />
                        <WeekCategroySummaryDetail data={weekCategorySummaryDetail} />
                    </div>
                </div>    
            </section>
        </main>
    )
}