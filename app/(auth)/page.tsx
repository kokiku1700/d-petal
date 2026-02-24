import { cookies } from "next/headers";
import AuthEntry from "./_components/AuthEntry";
import { redirect } from "next/navigation";

export default async function Home () {
	const session = (await cookies()).get("dp_session");

	if ( session ) {
		redirect("/app");
	};

	return (
		<AuthEntry />
	);
}
