import DateAndCategory from "./DateAndCategory";
import EmotionAndSatisfaction from "./EmotionAndSatisfaction";
import type { WriteProps } from "@/types/write";

export default function WriteRecordInfo ({ write, onChange }: WriteProps) {

    return (
        <section 
            className="
                w-full 
                p-5
                rounded-lg shadow-sm shadow-gray-200 
                bg-white">
            <h3 
                className="
                    pl-2 pb-1
                    text-xl text-left
                    border-b border-gray-200">
                기록 정보 
            </h3>
            <div className="w-full mt-2 py-2 px-4 rounded-lg bg-pink-100/40">
                <DateAndCategory write={write} onChange={onChange} />
                <EmotionAndSatisfaction write={write} onChange={onChange} />
            </div>
        </section>
    );
};