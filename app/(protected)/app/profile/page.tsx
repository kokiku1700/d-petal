import { getSessionUser } from "@/lib/getSessionUser";
import MyRecordSummary from "./_components/MyRecordSummary";
import ProfileEditController from "./_components/ProfileEditController";
import CategoriesEdit from "./_components/CategoriesEdit";


export default async function Profile () {
    const user = await getSessionUser();

    if ( !user ) return null;
    
    return (
        // 기존 페이지는 서버 컴포넌트로 구성되어 있었지만, 
        // 프로필 수정 모달이 추가되면서
        // 최소 범위만 클라이언트로 전환하기 위해 래퍼 컴포넌트를 도입했다.
        // 상태가 필요한 MyProfileSummary, ProfileEditModal, MyInfo만 클라이언트에서 관리하고,
        // MyRecordSummary는 서버 컴포넌트로 유지했다.
        <main 
            className="
                w-[95%] p-2 mx-auto
                flex flex-col gap-2
                xl:w-[85%]
                2xl:w-[75%]">
            <ProfileEditController user={user}>
                <MyRecordSummary />
            </ProfileEditController> 
            <CategoriesEdit />
        </main>
    )
}