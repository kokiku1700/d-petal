import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Refresh from "./Refresh";
import Profile from "@/app/(protected)/_components/Profile";
import { beforeEach } from "node:test";

// 리액트 쿼리에 들어갈 가짜 함수 생성
const meRefetch = vi.fn();
const categoriesRefetch = vi.fn();

// useMeQuery 목 데이터 생성
vi.mock("@/hooks/useMeQuery", () => ({
    useMeQuery: () => ({
        data: null,
        isLoading: false,
        isError: true,
        refetch: meRefetch,
    }),
}));

// useCategoriesChartQuery 목 데이터 생성 
vi.mock("@/hooks/useCategoriesChartQuery", () => ({
    useCategoriesChartQuery: () => ({
        data: null,
        isLoading: false,
        isError: false,
        refetch: categoriesRefetch,
    }),
}));

// vitest에는 next/image를 최적화 하는 기능이 없다.
// 그래서 기본 img 태그로 변환한다.
vi.mock("next/image", () => ({
    default: (props: any) => {
        return <img {...props} />;
    },
}));

// 프로필 컴포넌트를 테스트한다.
describe("Profile", () => {
    // 테스트 전 데이터 초기화
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("데이터를 불러오지 못하면 새로고침 버튼이 보인다", () => {
        // 가상의 화면에 Profile 컴포넌트 렌더링
        render(<Profile />);

        // Profile 내부에 있는 "새로고침" 버튼을 찾는다.
        expect(
            screen.getByRole("button", { name: "새로고침" })
        ).toBeInTheDocument();
    });

    it("새로고침 버튼을 클릭하면 me와 categories를 다시 요청한다", async () => {
        // 사용자의 행위를 위해 생성(클릭)
        const user = userEvent.setup();

        render(<Profile />);

        // "새로고침" 버튼을 찾아 클릭 이벤트 실행
        await user.click(
            screen.getByRole("button", { name: "새로고침" })
        );

        // 각각의 검사가 한 번 실행됐는지 체크
        expect(meRefetch).toHaveBeenCalledTimes(1);
        expect(categoriesRefetch).toHaveBeenCalledTimes(1);
    });
});

// 데이터를 불러오지 못했을 때 보여지는 새로고침 버튼이 
// 정상적으로 실행되는 지 검사하는 코드.
describe("Refresh", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    it("새로고침 버튼을 클릭하면 onClick이 실행된다.", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();
    
        render(<Refresh onClick={onClick} />);

        const button = screen.getByRole("button", {
            name: "새로고침",
        });

        await user.click(button);

        expect(onClick).toHaveBeenCalledTimes(1);
    });
})