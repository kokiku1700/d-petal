import { getSessionUser } from "@/lib/getSessionUser";
import MyInfo from "./_components/MyInfo";
import MyProfileSummary from "./_components/MyProfileSummary";
import MyRecordSummary from "./_components/MyRecordSummary";


export default async function Profile () {
    const user = await getSessionUser();

    return (
        <main 
            className="
                w-[70%] p-2 mx-auto
                flex flex-col gap-2">
            <MyProfileSummary user={user} />
            <div className="flex gap-2">
                <MyInfo user={user} />
                <MyRecordSummary />
            </div>     
        </main>
    )
}