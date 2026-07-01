import Link from "next/link";
import Profile from "./Profile";
import Categories from "./Categories";
import Posts from "./Posts";
import CategoriesChart from "./CategoriesChart";
import SelecedFilter from "./SelectedFilter";
import TextFilter from "./TextFilter";
import Record from "./Record";


export default function Main () {

    return (
        <main className="w-full flex flex-col gap-3 p-5">
            <div 
                className="
                    flex flex-col gap-3
                    lg:grid lg:grid-cols-2
                    2xl:flex 2xl:flex-row">
                {/* 프로필 */}
                <Link href="/app/profile" 
                    className="
                        basis-2/10
                        border border-gray-200
                        rounded-lg bg-white/80 
                        transition duration-300
                        hover:ring
                        hover:ring-pink-200">
                    <Profile />
                </Link>
                {/* 
                    기록 요약 및 기록 차트(잔디) 
                    현재 컴포넌트는 서버 컴포넌트여서 useState를 사용하지 못한다. 
                    모바일에서 토글 기능을 넣기 위해 한 번 더 감쌌다.
                */}
                <Record />
            </div>
            <div 
                className="
                    grid grid-cols-2 gap-2 items-center
                    xl:flex">
                {/* 카테고리, 날짜 필터뷰 */}
                <div className="basis-1/5 order-1">
                    <SelecedFilter />
                </div>
                {/* 기록 검색 */}
                <div 
                    className="
                        basis-3/5 px-[10%]
                        col-span-2 order-3
                        xl:order-2">
                    <TextFilter />
                </div>
                {/* 기록 작성 */}
                <div className="basis-1/5 order-2 xl:order-3">
                    <Link 
                        href="/app/write"
                        className="
                            w-[80%] mx-auto py-2.5
                            flex justify-center items-center
                            text-sm font-medium text-pink-500
                            rounded-full
                            bg-gradient-to-r from-pink-100 to-pink-200
                            shadow-[1_2px_6px_rgba(236,72,153,0.08)]
                            hover:from-pink-200 hover:to-pink-300
                            hover:shadow-[0_4px_10px_rgba(236,72,153,0.12)]
                            transition">
                        + 기록하러 가기
                    </Link>
                </div>
            </div>
            <div 
                className="
                    flex flex-col gap-2
                    xl:flex-row">
                {/* 카테고리 목록 */}
                <div className="basis-1/10">
                    <Categories />
                </div>
                {/* 기록 목록 */}
                <div className="basis-7/10">
                    <Posts />
                </div>
                {/* 기록 차트(도넛 차트, top3) */}
                <div 
                    className="
                        hidden flex flex-col gap-2 basis-2/10
                        xl:flex">
                    <CategoriesChart />
                </div>
            </div>
        </main>
    )
};