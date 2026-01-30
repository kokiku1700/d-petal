import Input from "@/components/Input";
import { useEffect, useMemo, useState } from "react";

// select의 option에 들어갈 도메인들
const PRESET_DOMAINS = [ 
    "gmail.com", 
    "naver.com", 
    "kakao.com", 
    "daum.net"] as const;
const CUSTOM = "직접입력" as const;

// PRESET_DOMAINS를 유니온 타입으로 변경
type PresetDomain = typeof PRESET_DOMAINS[number];
type DomainOption = PresetDomain | typeof CUSTOM;

type Props = {
    value: string;
    onChange: (email: string) => void;
};

// 타입스크립트의 타입 가드다.
// 반환 값이 true면 v는 PresetDomain의 유니온 타입으로 좁혀진다. 
function isPresetDomain ( v: string ): v is PresetDomain {
    return (PRESET_DOMAINS as readonly string[]).includes(v);
};

// 매개변수로 들어온 값을 아이디와 도메인으로 분리해서 각각 저장
function splitEmail ( value: string ) {
    const [id = "", domain = ""] = value.split("@");
    
    return { id, domain };
};

// email은 아이디와 도메인으로 구성되어 있다. 
// 도메인은 select로 선택하거나 직접입력할 수 있다.
// 선택한 경우는 도메인input은 disabled가 된다.
// 직접선택을 선택한 경우 도메인 input에 직접 도메인을 작성할 수 있다. 
export default function EmailField ({value, onChange}: Props) {
    // 받은 이메일을 아이디와 도메인으로 분리
    const initial = splitEmail(value);
    // 분리한 아이디를 저장
    const [id, setId] = useState(initial.id);
    //분리한 도메인을 저장
    const [domain, setDomain] = useState(initial.domain);
    
    const [domainOption, setDomainOption] = useState<DomainOption>(
        isPresetDomain(initial.domain) ? initial.domain : CUSTOM
    );
    // domainOption이 직접입력이면 공백으로 초기화한다. 
    // 아닐 경우 domain 값을 도메인 리스트에서 
    // 선택한 값 중 하나로 변경한다.
    useEffect(() => {
        if ( domainOption === CUSTOM ) {
            return setDomain("");
        };
        setDomain(domainOption);
    }, [domainOption]);
    // 작성된 아이디와 도메인을 결합해 반환한다. 
    const email = useMemo(() => {
        if ( !id || !domain ) return "";
        return `${id}@${domain}`;
    }, [id, domain]);
   
    useEffect(() => {
        onChange(email);
    }, [email, onChange])
    
    // 도메인이 직접선택이 아닐 때 도메인 input 수정을 막기 위한 변수
    const domainReadOnly = domainOption !== CUSTOM;

    return (
        <div className="w-full">
            <label className="text-lg font-semibold">
                <span className="text-red-500 mx-1">*</span>
                이메일
            </label>
            <div className="flex items-center gap-1">
                <Input 
                    type="text"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    variant="signup"/>

                <span className="text-gray-400">@</span>

                <Input
                    type="text"
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    readonly={domainReadOnly}
                    variant="signup"/>
                
                <select 
                    value={domainOption}
                    onChange={e => setDomainOption(e.target.value as DomainOption)}
                    className="
                        py-1 px-2 
                        text-lg
                        border rounded-lg 
                        focus:ring
                        focus:ring-[#e5c9dd]
                        focus:border-[#e5c9dd]">
                    <option value={CUSTOM}>직접입력</option>
                    {PRESET_DOMAINS.map(d => (
                        <option key={d} value={d} className="focus:bg-gray-200">{d}</option>
                    ))}
                </select>
            </div>
        </div>
    )
};