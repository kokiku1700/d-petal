"use client"

import { useState } from "react";
import AuthShell from "./AuthShell";
import LeftPanel from "./LeftPanel";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

// AuthEntry.ts는 없어도 되는 컴포넌트다. 
// 단순히 껍데기에 불과하지만 굳이 추가한 이유는
// "use client"때문이댜. 
// 최상위 루트가 "use client"가 되는 것을 막기 위해서다. 
export default function AuthEntry () {
    const [mode, setMode] = useState<"signin" | "signup">("signin");

    // 컴포넌트를 선언할 때 < /> 형태가 아닌
    // <> </> 이 형태로 받게 되는 경우 사이에 있는 컴포넌트는 props 형식이 된다. 
    // 코드의 가독성을 높여주고 AuthShell의 내부 코드 수정 없이 
    // 화면을 변화시킬 수 있다. 
    // 또한 역할 분담을 확실히 해준다.
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