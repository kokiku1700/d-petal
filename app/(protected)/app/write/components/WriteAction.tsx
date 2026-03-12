import Button from "@/components/Button";


export default function WriteAction () {

    return (
        <section 
            className="
                w-full p-5 
                rounded-lg shadow-sm shadow-gray-200 
                bg-white">
            <div className="w-[70%] mx-auto flex justify-center">
                <Button object="임시 저장" type="button" variant="duplication" />
                <Button object="저장" type="submit" variant="duplication" />
                <Button object="취소" type="button" variant="duplication" />
            </div>
        </section>
    );
};