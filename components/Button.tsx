
type Props = {
    object: string;
};

export default function Button ({object}: Props) {

    return (
        <button 
            className="
            w-full 
            px-4 py-2
            text-xl text-[#3b2f4a]
            bg-[#f3dff0]
            rounded-4xl
            cursor-pointer
            hover:bg-[#e6cfe1]
            transition-color duration-200">
            {object}
        </button>
    )
}