import Spinner from "@/components/Spinner"

const Loading = () => {
    return (
        <div 
            className="
                w-full h-screen 
                flex flex-col justify-center items-center">
            <Spinner />
            <p className="text-sm italic">
                꽃잎 정보를 불러오는 중...
            </p>
        </div>
    )   
};

export default Loading;