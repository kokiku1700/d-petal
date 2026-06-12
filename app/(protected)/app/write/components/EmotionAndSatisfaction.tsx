import Button from "@/components/Button";
import type { WriteProps } from "@/types/write";
import { EmotionKey, emotionsArr } from "@/constant/emotions";

const stars = [1, 2, 3, 4, 5];

export default function EmotionAndSatisfaction ({ write, onChange }: WriteProps) {

    const handleClick = ( star: number ) => {
        if ( write.satisfaction === star ) {
            onChange(prev => ({
                ...prev,
                satisfaction: 0
            }));
            return;
        };
        onChange(prev => ({
            ...prev,
            satisfaction: star
        }));
        console.log(write)
    };

    return (
        <div 
            className="
                flex flex-col items-center gap-3
                p-3
                lg:flex-row lg:gap-0">
            <div 
                className="
                    pr-4 
                    flex flex-col justify-around items-center gap-2
                    lg:flex-row lg:gap-0 lg:basis-7/10 lg:border-r lg:border-gray-300">
                <label 
                    className="text-center whitespace-nowrap font-semibold">
                    감정
                </label>
                <div 
                    className="
                        flex flex-wrap justify-center gap-2
                        lg:justify-none">
                    {emotionsArr.map(emotion => (
                        <Button 
                            key={emotion.label}
                            type="button" variant="emotion"
                            style={write.emotion === emotion.value
                                ? { boxShadow: "1px 1px 3px #999" }
                                : undefined  
                            }
                            object={`${emotion.emoji}${emotion.label}`} 
                            onClick={() => {
                                onChange(prev => ({
                                    ...prev,
                                    emotion: emotion.value as EmotionKey
                                }))
                            }}/>
                    ))}
                </div>

            </div>
            <div 
                className="
                    flex flex-col justify-around items-center gap-2
                    lg:flex-row lg:gap-0 lg:basis-3/10">
                <label className="font-semibold">만족도</label>
                <div>
                    {stars.map(star => {
                        const filled = star <= write.satisfaction;
                        
                        return (
                            <button 
                                key={star} type="button"
                                onClick={() => handleClick(star)}
                                className="cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-7 h-7"
                                    fill={filled ? "#db277760" : "none"}
                                    stroke="#db277760"
                                    strokeWidth="2">
                                    <path  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
                                </svg>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};