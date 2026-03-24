import Link from "next/link";
import Profile from "./Profile";
import RecordChart from "./RecordChart";
import RecordSummary from "./RecordSummary";
import Categories from "./Categories";
import Posts from "./Posts";
import CategoriesChart from "./CategoriesChart";
import CategoriesTop3 from "./CategoriesTop3";
import Input from "@/components/Input";
import DateAndSelectedCategory from "./DateAndSelectedCategory";


export default function Main () {


    return (
        <main className="w-full">
            <div className="
                flex flex-cols gap-3
                p-3">
                <Link href="/app/profile" 
                    className="
                        basis-2/10
                        bg-white shadow-pink-200
                        rounded-lg shadow-md
                        transition duration-300
                        hover:-translate-y-0.5
                        hover:shadow-lg">
                    <Profile />
                </Link>
                <Link href="/app/record-summary" 
                    className="
                        basis-3/10
                        bg-white shadow-purple-200
                        rounded-lg shadow-md
                        transition duration-300
                        hover:-translate-y-0.5
                        hover:shadow-lg">
                    <RecordSummary />
                </Link>
                <div
                    className="
                        basis-5/10
                        bg-white shadow-gray-200
                        rounded-lg shadow-md">
                    <RecordChart />
                </div>
            </div>
            <div className="flex items-center gap-2 p-3">
                <div className="basis-2/10">
                    <DateAndSelectedCategory />
                </div>
                <div className="basis-6/10 px-[10%]">
                    <Input />
                </div>
                <div className="basis-2/10">
                    <Link 
                        href="/app/write"
                        className="
                            w-[80%] mx-auto
                            flex justify-center items-center
                            border py-2.5 rounded-lg">
                        + 기록하러 가기
                    </Link>
                </div>
            </div>
            <div className="flex gap-2 p-3">
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