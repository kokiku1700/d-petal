import Input from "@/components/Input";
import { useState } from "react";


export default function BirthAndGenderField () {
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [date, setDate] = useState("");

    return (
        <div className="w-full flex gap-5">
            <div className="w-full">
                <label className="text-lg text-[#3b2f4a] font-semibold">
                    <span className="text-red-500 mx-1">*</span>
                    생년월일
                </label>
                <div className="flex w-full items-center gap-3">
                    <Input 
                        type="number" value={year} 
                        onChange={e => setYear(e.target.value)} 
                        variant="signup"
                        placeholder={new Date().getFullYear().toString()} />
                    <span className="text-gray-400">/</span>
                    <Input 
                        type="number" value={month} 
                        onChange={e => setMonth(e.target.value)} 
                        variant="signup"
                        placeholder={(new Date().getMonth() + 1).toString()} />
                    <span className="text-gray-400">/</span>
                    <Input 
                        type="number" value={date} 
                        onChange={e => setDate(e.target.value)} 
                        variant="signup"
                        placeholder={new Date().getDate().toString()} />
                </div>
            </div>
            <div className="w-full">
                <label className="text-lg text-[#3b2f4a] font-semibold">
                    <span className="text-red-500 mx-1">*</span>
                    성별
                </label>
                <div className="flex gap-1">
                    <span className="py-2 px-4 border rounded-xl">남</span>
                    <span className="py-2 px-4 border rounded-xl">여</span>
                </div>
            </div>
        </div>
    );
};