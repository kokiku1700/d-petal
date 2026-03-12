import { getSessionUser } from "@/lib/getSessionUser";
import { redirect } from "next/navigation";
import Main from "../_components/Main";

export default async function App () {
    const user = await getSessionUser();

    if ( !user ) {
        redirect("/");
    };

    return (
        <div className="w-full">
            <Main />
        </div>
    );
}
