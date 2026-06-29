type Props = {
    height: string;
    text1?: string;
    text2?: string;
};

export default function LoadingSpinner ({ height, text1, text2, }: Props) {
    return (
        <div 
            className={`
                w-full ${height === "screen" ? "h-screen" : "h-full"}
                flex flex-col justify-center items-center gap-1`}>
            <div 
                className="
                    w-6 h-6
                    border-4 border-pink-200 border-t-pink-600
                    rounded-full animate-spin"/>
            <p className="text-sm italic">{text1}</p>
            <p className="text-sm italic">{text2}</p>
        </div>
        
    );
};