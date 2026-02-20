import Input from "@/components/Input";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

type Props = {
    birthValue: string;
    genderValue: string;
    onChangeBirth: Dispatch<SetStateAction<string>>;
    onChangeGender: Dispatch<SetStateAction<"남" | "여">>;
}

function SplitBirth ( birth: string ) {
    const [yyyy="", mm="", dd=""] = birth.split("/");

    return { yyyy, mm, dd };
};

export default function BirthAndGenderField ({ birthValue, onChangeBirth, genderValue, onChangeGender}: Props) {
    const inputBirth = SplitBirth(birthValue);
    const [yyyymmdd, setYyyymmdd] = useState({
        year: inputBirth.yyyy,
        month: inputBirth.mm,
        date: inputBirth.dd,
    });

    const birth = useMemo(() => {
        if ( !yyyymmdd.year || !yyyymmdd.month || !yyyymmdd.date ) return "";
        return `${yyyymmdd.year}/${yyyymmdd.month}/${yyyymmdd.date}`
    }, [yyyymmdd]);

    useEffect(() => {
        onChangeBirth(birth);
        console.log(birth)
    }, [birth]);

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const s = value.trim();

        if ( s.length === 1 ) {
            setYyyymmdd(prev => ({
                ...prev, 
                [name]: s.padStart(2, "0"),
            }));
        };
    };

    const onClickChangeGender = ( value: "남" | "여") => {
        if ( genderValue === value ) return;
        onChangeGender(value);
    };

    return (
        <div className="w-full flex gap-5">
            <div className="w-full">
                <label className="text-lg text-[#3b2f4a] font-semibold">
                    <span className="text-red-500 mx-1">*</span>
                    생년월일
                </label>
                <div className="flex w-full items-center gap-3">
                    <Input 
                        name="year"
                        type="number" value={yyyymmdd.year} 
                        onChange={e => setYyyymmdd(prev => ({...prev, [e.target.name]: e.target.value}))} 
                        variant="signup"
                        placeholder={new Date().getFullYear().toString()} />
                    <span className="text-gray-400">/</span>
                    <Input 
                        name="month"
                        type="number" value={yyyymmdd.month} 
                        onChange={e => setYyyymmdd(prev => ({...prev, [e.target.name]: e.target.value}))}  
                        onBlur={onBlur}
                        variant="signup"
                        placeholder={(new Date().getMonth() + 1).toString()} />
                    <span className="text-gray-400">/</span>
                    <Input 
                        name="date"
                        type="number" value={yyyymmdd.date} 
                        onChange={e => setYyyymmdd(prev => ({...prev, [e.target.name]: e.target.value}))} 
                        onBlur={onBlur}
                        variant="signup"
                        placeholder={new Date().getDate().toString()} />
                </div>
            </div>
            <div className="w-full">
                <label className="mx-1 text-lg text-[#3b2f4a] font-semibold">
                    성별
                </label>
                <div className="flex gap-2">
                    <span 
                        onClick={() => onClickChangeGender("남")} 
                        className={`
                            py-2 px-4 border-none rounded-xl cursor-pointer
                            ${genderValue === "남" ? "bg-[#f3dff0]" : "bg-white hover:bg-[#f3dff0]/30"}`}>
                        남
                    </span>
                    <span
                        onClick={() => onClickChangeGender("여")} 
                        className={`
                            py-2 px-4 border-none rounded-xl cursor-pointer
                            ${genderValue === "여" ? "bg-[#f3dff0]" : "bg-white hover:bg-[#f3dff0]/30"}`}>
                        여
                    </span>
                </div>
            </div>
        </div>
    );
};