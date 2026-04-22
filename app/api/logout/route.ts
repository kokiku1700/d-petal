import { cookies } from "next/headers";
import deleteSession from "@/lib/session";

export async function POST () {
    const cookieStore = await cookies();
    const token = cookieStore.get("dp_session")?.value;

    if ( token ) {
        await deleteSession(token);
    };

    cookieStore.delete("dp_session");

    return Response.json({ ok: true });
};