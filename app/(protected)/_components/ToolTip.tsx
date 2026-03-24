import type { Tooltip } from "@/types/tooltip";

type Props = {
    data: Tooltip;
}

export default function ToolTip ({ data }: Props) {
    return (
        <div 
            className="bg-black text-white px-1 text-sm rounded cursor-default pointer-events-none"
            style={{ position: "fixed", top: data.y, left: data.x}}>
            <p>{data.date}</p>
            <p>{data.count}개 기록</p>
        </div>
    );
};