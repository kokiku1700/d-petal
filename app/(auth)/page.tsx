"use client"

import { useState } from "react";
import AuthShell from "./_components/AuthShell";
import LeftPanel from "./_components/LeftPanel";
import SignInForm from "./_components/SignInForm";
import SignUpForm from "./_components/SignUpForm";

export default function Home () {
	const [mode, setMode] = useState<"signin" | "signup">("signin");

	// 컴포넌트를 선언할 때 < /> 형태가 아닌
	// <> </> 이 형태로 받게 되는 경우 사이에 있는 컴포넌트는 props 형식이 된다. 
	return (
		<AuthShell mode={mode}>
			<LeftPanel mode={mode} />
			{mode === "signin" ?
				<SignInForm onSwitch={() => setMode("signup")} /> :
				<SignUpForm onSwitch={() => setMode("signin")} />
			}	
		</AuthShell>
	);
}
