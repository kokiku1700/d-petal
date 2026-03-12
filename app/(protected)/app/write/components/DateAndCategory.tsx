import Button from "@/components/Button";
import Input from "@/components/Input";
import { useCategoriesQuery } from "@/hooks/useCategoriesQuery";
import type { WriteProps } from "@/types/write";

export default function DateAndCategory ({ write, onChange }: WriteProps) {
    const { data } = useCategoriesQuery();

    const handleWrite = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="w-full flex px-6 py-3 border-b border-gray-300">
            <div 
                className="
                    basis-1/2 pr-4 
                    border-r border-gray-300
                    flex justify-around items-center">
                <label  
                    className="
                        
                        basis-1/4 whitespace-nowrap">
                    날짜
                </label>
                <Input 
                    name="date" type="date" variant="main"
                    value={write.date} onChange={handleWrite} />
            </div>
            <div 
                className="
                    basis-1/2
                    flex justify-center items-center">
                <label className="basis-1/4 text-center">
                    항목
                </label>
                <div className="flex flex-wrap justify-center gap-3">
                    {data?.map((category) => (
                        <Button 
                            key={category.category_id}
                            object={category.name} 
                            type="button" color={category.color}
                            style={
                                write.category === category.category_id 
                                ? { boxShadow: `2px 2px 3px ${category.color}` }
                                : undefined
                            }
                            onClick={() => {
                                onChange(prev => ({
                                    ...prev,
                                    category: category.category_id,
                                }))
                            }}
                            variant="category" />
                    ))}
                </div>
            </div>
        </div>
    )
}