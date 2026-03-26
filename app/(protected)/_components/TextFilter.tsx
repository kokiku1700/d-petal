"use client";

import Input from "@/components/Input";
import { useFilterStore } from "@/hooks/useFilterStore";

//Main 컴포넌트를 서버 컴포넌트를 유지하기 위해 만들었다.
export default function TextFilter () {
    const { searchText, setSearchText } = useFilterStore();

    return (
        <div>
            <Input 
                name="textFilter" type="text" 
                value={searchText} onChange={e => setSearchText(e.target.value)}
                variant="filter"
                placeholder="작성한 기록을 찾아보세요(제목 + 내용)"/>
        </div>
        
    );
};