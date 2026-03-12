import AuthEntry from "./_components/AuthEntry";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/getSessionUser";

export default async function Home () {
	const user = await getSessionUser();

	if ( user ) {
		redirect("/app");
	};

	return (
		<AuthEntry />
	);
}
