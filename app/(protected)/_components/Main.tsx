import Link from "next/link";
import Profile from "./Profile";
import RecordChart from "./RecordChart";
import RecordSummary from "./RecordSummary";
import Categories from "./Categories";
import Posts from "./Posts";
import CategoriesChart from "./CategoriesChart";
import CategoriesTop3 from "./CategoriesTop3";
import SelecedFilter from "./SelectedFilter";
import TextFilter from "./TextFilter";


export default function Main () {

    return (
        <main className="w-full flex flex-col gap-3 p-5">
            <div className="
                flex flex-cols gap-3">
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
                <Link href="/app/record-summary" 
                    className="
                        basis-3/10
                        border border-gray-200
                        rounded-lg bg-white/80 
                        transition duration-300
                        hover:ring
                        hover:ring-purple-200">
                    <RecordSummary />
                </Link>
                <div
                    className="
                        basis-5/10
                        border border-gray-200
                        rounded-lg bg-white/80">
                    <RecordChart />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <div className="basis-1/5">
                    <SelecedFilter />
                </div>
                <div className="basis-3/5 px-[10%]">
                    <TextFilter />
                </div>
                <div className="basis-1/5">
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
            <div className="flex gap-2">
                <div className="basis-1/10">
                    <Categories />
                </div>
                <div className="basis-7/10">
                    <Posts />
                </div>
                <div className="flex flex-col gap-2 basis-2/10">
                    <CategoriesChart />
                    <CategoriesTop3 />   
                </div>
            </div>
        </main>
    )
};