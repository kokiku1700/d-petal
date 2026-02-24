import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function App () {
    const session = (await cookies()).get("dp_session");

    if ( !session ) {
        redirect("/");
    };

    return (
        <>
            로그인 후
        </>
    );
}
