
type Props = {
    placeholder: string;
};

export default function Input ({ placeholder }: Props) {


    return (
        <input
            className="
            w-full
            py-2 px-4
            text-xl
            rounded-4xl border-2 border-[#3b2f4a]
            focus:outline-none
            focus:border-[#e5c9dd]"
            placeholder={placeholder}
        />
    )
}