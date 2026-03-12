import Input from "@/components/Input";
import type { WriteProps } from "@/types/write";

export default function WriteContent ({ write, onChange }: WriteProps) {

    return (
        <section 
            className="
                w-full p-5
                rounded-lg shadow-sm shadow-gray-200 
                bg-white">
            <div>
                <h3>제목</h3>
                <Input 
                    name="title" type="text" value={write.title}
                    variant="main"
                    onChange={(e) => {
                        onChange(prev => ({
                            ...prev,
                            title: e.target.value
                        }))
                    }} />
            </div>
            <div>
                <h3>내용</h3>
                <textarea 
                    value={write.content}
                    onChange={(e) => {
                        onChange(prev => ({
                            ...prev,
                            content: e.target.value
                        }))
                    }}
                    className="
                        w-full min-h-[200px]
                        rounded-lg border-1 border-gray-400
                        resize-none"/>
            </div>
        </section>
    );
};