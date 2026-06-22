# D.PETAL - 당신의 하루를 기록해보세요.

next.js를 활용한 개인 기록 서비스

## 배포 링크

배포 후 링크 넣을 자리.

## 주요 기능

### 회원가입 / 로그인 / 소셜 로그인
![LoginImg](./public/readme/login.png)

본 서비스는 기록 데이터를 사용자별로 관리하기 때문에 계정 기반 서비스 형태로 구현했다. 

기본적인 회원가입 및 로그인 기능을 구현했고, 추가로 소셜 로그인 기능을 넣어 사용자 편의성을 높였다.

소셜 로그인은 Google, Kakao, Naver, GitHub를 통해 이용할 수 있으며, OAuth 인증 과정을 직접 구현했다.

또한 사용자의 로그인 상태를 유지하기 위해 쿠키 기반 세션 인증을 직접 구현했다.


### 기록 작성
![Write](./public/readme/write.png)

기록 작성은 활동 날짜, 카테고리, 감정, 만족도, 제목, 내용을 작성할 수 있도록 구현했다.

카테고리는 고유한 색상을 가지고 있으며, 해당 색상은 글 목록 및 통계 그래프에서도 동일하게 사용해 사용자가 직관적으로 데이터를 구분할 수 있도록 구현했다.

또한 기록 작성 중 오른 쪽 영역에서 실시간 미리 보기를 통해 결과를 확인할 수 있도록 구현했다. 

현재 이미지에 보이는 임시저장 기능은 UI만 구현된 상태이며, 추후 추가할 예정이다. 

### 카테고리 관리
![Write](./public/readme/categoryEdit.png)

서비스 특성에 맞게 사용자가 직접 카테고리를 생성할 수 있게 구현했다.

카테고리 이름과 색상은 사용자 별로 고유한 값을 가지도록 설계했으며, 중복 생성이 불가능하도록 UNIQUE 제약 조건을 적용했다.

입력 중인 카테고리 이름과 색상은 실기간 미리보기로 확인할 수 있어 사용자 경험을 개선했다.

색상 선택은 color picker 라이브러리를 활용해 구현했으며, 선택된 색상은 HEX 형식으로 저장된다.

추후 카테고리 수정, 삭제 기능을 추가할 예정이다.  

### 검색 및 조건 필터링
![Write](./public/readme/main(filtering).png)
![Write](./public/readme/main(filtering)2.png)

작성한 기록을 카테고리, 날짜, 검색어 기반으로 검색할 수 있도록 구현했다. 

Zustand를 사용해 현재 각각의 필터 상태를 관리했으며, 여러 조건이 동시에 적용된 결과값을 실시간으로 확인할 수 있도록 구현했다. 

또한 선택된 필터 상태를 전역으로 관리해 컴포넌트 간 상태 공유와 UI 동기화를 쉽게 처리할 수 있도록 구현했다.

### 기록 통계 및 시각화
![Write](./public/readme/heatmap.png)
![Write](./public/readme/categoryRatio.png)
![Write](./public/readme/recordSummary.png)

히트맵을 적용해 날짜 기반으로 기록 빈도를 확인할 수 있도록 구현했으며, 특정 날짜를 클릭하면 해당 날짜 기록만 필터링할 수 있도록 구성했다.
 
전체 카테고리 비율은 원형 차트로 시각화했으며, 그래프의 카테고리를 클릭하면 해당 카테고리 기록만 확인할 수 있도록 연동했다. 

또한 기록 요약 상세 페이지에서는 최근 일주일간 작성한 기록의 흐름과 통계를 그래프로 확인할 수 있도록 구현했다. 

### 프로필 관리
![Write](./public/readme/editInfo.png)
![Write](./public/readme/editProfileImage.png)
![Write](./public/readme/editPassword.png)

개인 정보 수정은 하나의 모달 내부에 탭 구조를 적용해, 원하는 정보를 한 곳에서 수정할 수 있도록 구현했다.

개인 정보에서는 자기소개 문구와 닉네임을 변경할 수 있다.

프로필 이미지는 Cloudinary를 사용해 관리하고 있다.

이미지 파일은 Cloudinary 서버에 저장하고, 데이터베이스에는 이미지 URL만 저장하는 방식으로 구현했다.

이를 통해 서버 저장소 부담을 줄이고, CDN 기반 이미지 제공 및 최적화를 활용할 수 있도록 구성했다.

## 기술 스택

### 프론트엔드
- **Next.js**: App Router 기반 페이지 구성, Route Handler를 활용한 API 구현

- **TypeScript**: 컴포넌트 Props, API 응답, 감정/카테고리 데이터 타입 정의

- **Tailwind CSS**: 반응형 레이아웃 및 UI 스타일링

### 백엔드 & 데이터 베이스
- **Next.js Route Handler**: 로그인, 회원가입, 게시글, 카테고리, 통계 API 구현

- **PostgreSQL**: 사용자, 세션, 카테고리, 게시글 테이블 설계 및 관계형 데이터 관리

### 상태 관리
- **Zustand**: 카테고리, 날짜, 검색어, 페이지네이션 등 클라이언트 필터 상태 관리

- **Tanstack Query**: 게시글, 카테고리, 사용자 정보, 통계 데이터 캐싱 및 서버 상태 관리

### 인증 및 유효성 검사
- **bcrypt**: 비밀번호 해싱

- **Node.js crypto**: 세션 토큰 생성 및 해시 처리

- **Zod**: 회원가입/로그인/프로필 수정 입력값 검증

### 데이터 시각화 및 이미지 처리
- **Recharts**: 카테고리/감정 비율, 만족도 등 통계 차트 구현

- **Cloudinary**: 프로필 이미지 업로드 및 저장

## 프로젝트 구조
```
📦app
 ┣ 📂(auth)
 ┃ ┣ 📂find-password
 ┃ ┣ 📂_components
 ┣ 📂(protected)
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂record-summary
 ┃ ┃ ┃ ┣ 📂_components
 ┃ ┃ ┣ 📂write
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📂edit
 ┃ ┗ 📂_components
 ┣ 📂api
 ┃ ┣ 📂auth
 ┃ ┣ 📂categories
 ┃ ┣ 📂category-chart
 ┃ ┣ 📂edit-post
 ┃ ┣ 📂email-check
 ┃ ┣ 📂logout
 ┃ ┣ 📂me
 ┃ ┣ 📂nickname-check
 ┃ ┣ 📂posts
 ┃ ┣ 📂profile
 ┃ ┣ 📂sign-in
 ┃ ┣ 📂sign-up
 ┃ ┗ 📂write-post
 ┣ 📂utils
 ┗ 📜providers.tsx
```

(auth)폴더는 로그인, 회원가입 등 인증 이전 페이지를 관리한다.

(protected)폴더는 로그인 이후 접근 가능한 메인 서비스 페이지를 관리한다.

API는 Next.js Router Handler를 활용해 관리했으며, 서버에서 공통적으로 사용 될 로직은 'hooks' 혹은 'lib' 폴더로 분리했다.

여러 페이지에서 공통으로 사용되는 컴포넌트는 공통 컴포넌트 폴더에서 관리하며, 특정 페이지에서만 사용되는 컴포넌트는 해당 페이지 내부의 '_component' 폴더에서 관리하게 구성했다. 

## 데이터베이스 설계
### users 
- 사용자의 정보를 관리하는 테이블이다.
- 기본 회원가입뿐 아니라 소셜 로그인을 함께 지원하기 위해 이메일 제공자(provider) 정보를 함께 저장하도록 설계했다.
- 'user_id', 'user_name', 'user_nickname', 'user_email', 'user_emailprovider', 'user_email_verifieied_at', 'user_password', 'user_birth', 'user_sex', 'user_sex', 'user_bio', 'user_profile_image'의 컬럼으로 구성했다.

### sessions 
- 사용자의 로그인 상태 유지를 위한 세션 테이블이다. 
- 세션 토큰은 해시 처리 후 저장되며, 기본적으로 7일 동안 유지되도록 구현했다.
- 'session_id', 'user_id', 'session_token_hash', 'expires_at', 'created_at'의 컬럼이 존재한다.
- user_id는 users 테이블의 user_id를 참조한다.

### categories 
- 사용자별 카테고리를 관리하기 위한 테이블이다.
- 각 사용자는 자신만의 카테고리를 생성할 수 있으며, 카테고리 이름과 색상은 사용자 기준으로 중복되지 않게 설계했다.
- 'category_id', 'user_id', 'name', 'color', 'is_default', 'sort_order', 'created_at'의 컬럼이 존재한다.
- 'user_id'는 users 테이블의 'user_id'를 참조한다. 

### posts 
- 사용자가 작성한 기록 데이터를 관리하는 테이블이다.
- 기록은 사용자 및 카테고리와 연결되며, 감정과 만족도 데이터를 함께 저장해 통계 및 시각화 기능에 활용할 수 있도록 구성했다.
- 'post_id', 'user_id', 'category_id', 'title', 'content', 'activity_date', 'created_at', 'updated_at', 'emotion', 'satisfaction'의 컬럼이 존재한다.
- 'user_id'는 users 테이블의 'user_id'를 참조하고 'category_id'는 categories 테이블의 'category_id'를 참조한다. 

## 트러블 슈팅

### 1. QueryKey 설계 실수
#### 문제

기록 수정 페이지는 URL의 id를 기반으로 해당 기록의 정보를 조회한다.

처음 수정 페이지에 진입했을 때는 정상적으로 데이터를 불러왔지만, 이후 다른 기록의 수정 페이지로 이동해도 이전 기록의 정보가 그대로 표시되는 문제가 발생했다.

#### 원인분석
처음에는 수정 후 캐시가 갱신되지 않아 발생한 문제라고 판단해 invalidateQueries를 확인했다. 하지만 문제는 캐시 무효화가 아니라 React Query의 queryKey 설계에 있었다.

#### 헤결
``` javascript
useQuery({
    queryKey: ["post"],
    queryFn: () => getPost(id),
});
```
위와 같이 모든 기록이 동일한 querykey를 사용하고 있었기 때문에 React Query는 서로 다른 기록도 같은 데이터로 인식했다. 그 결과 가장 먼저 조회한 기록의 캐시가 재사용되면서 다른 기록 페이지에서도 동일한 데이터가 표시되었다. 

이를 해결하기 위해 id를 queryKey에 포함시켜 기록 별로 독립적인 캐시를 사용하도록 수정했다.

``` javascript
useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
});
```
#### 결과
수정 후에는 각 기록이 고유한 캐시를 가지게 되었고, 다른 기록의 수정 페이지로 이동해도 해당 기록의 정보가 정상적으로 표시되었다.

#### 배운점
- React Query의 캐시는 queryKey를 기준으로 관리된다.
- 조회 대상이 달라지는 데이터라면 식별자(id)를 반드시 queryKey에 포함해야 한다.
- 데이터 갱신 문제라고 생각했던 현상이 실제로는 캐시 설계 문제일 수 있다는 점을 경험했다.

### 2. 서버 컴포넌트 + 클라이언트 컴포넌트 분리

#### 문제
내 정보 페이지는 사용자 정보를 조회하는 페이지이기 때문에 Server Component로 구현되어 있었다. 

이후 프로필 수정 모달 기능을 추가하면서 모달의 열림/닫힘 상태를 관리하기 위한 useState가 필요해졌다. 

처음에는 페이지 최상위 컴포넌트를 Client Component로 변경하려고 했지만, 이렇게 되면 하위에 위치한 컴포넌트들까지 모두 클라이언트에서 렌더링되어 Server Component의 장점을 활용할 수 없게 된다. 

#### 해결
모달 상태를 관리하는 ProfileEditController 컴포넌트를 별도의 Client Component로 분리했다.
```javascript
<ProfileEditController>
    <MyRecordSummary />
</ProfileEditController>
```
ProfileEditController는 모달 상태만 관리하고, 실제 데이터 조회와 화면 렌더링을 담당하는 컴포넌트들은 Server Component로 유지했다.

이를 통해 필요한 부분만 Client Component로 전환하고 나머지는 Server Component의 장점을 그대로 사용할 수 있었다.

#### 배운 점 
처음에는 상태 관리가 필요한 경우 부모 컴포넌트 전체를 Client Component로 변경해야 한다고 생각했다. 

하지만 App Router에서는 Client Component가 children으로 전달받은 Server Component를 렌더링할 수 있기 때문에, 상태가 필요한 부분만 최소 범위로 Client Component로 분리하는 구조를 사용할 수 있다는 점을 배웠다.

### 3. 로그아웃 및 회원탈퇴 후 뒤로 가기 접근 문제

#### 문제 
로그아웃 또는 회원탈퇴 후 로그인 페이지로 이동하도록 구현했다.

하지만 로그인 페이지에서 브라우저의 뒤로가기 버튼을 클릭하면, 인증이 필요한 메인 페이지로 접근이 가능한 문제가 발생했다.

#### 원인 분석
처음에는 세션이 정상적으로 삭제되지 않은 것으로 생각햇다.

하지만 확인 결과 DB의 세션 정보와 브라우저 쿠키는 정상적으로 제거되고 있었다.

문제는 브라우저가 이전에 방문했던 페이지를 캐시에서 복원하여 화면에 표시하고 있었기 때문이었다.

#### 해결
로그아웃 및 회원탈퇴 시 세션과 쿠키를 모두 제거한 뒤 로그인 페이지로 이동하도록 구현했다.

또한 인증이 필요한 페이지에서는 서버에서 세션을 검증하도록 구성했다.

```javascript
const uesr = await getSessionUser();

if ( !user ) {
    redirect("/");
};
```
이를 통해 브라우저 캐시로 인해 이전 화면이 표시되더라도 실제 접근 시에는 서버에서 다시 인증 여부를 확인하도록 했다.

추가로 router.refresh()를 사용해 최신 상태를 다시 가져오도록 처리했다.

#### 배운 점
처음에는 로그아웃 문제를 세션 삭제 문제로 생각했지만, 실제 원인은 브라우저 캐시에 있었다.

인증이 필요한 페이지는 클라이언트 상태가 아니라 서버에서 인증 여부를 검증해야하며, 세션 제거와 접근 제어는 별개의 문제라는 점을 배울 수 있었다.

## 실행 방법
```bash
# 프로젝트 클론
git clone https://github.com/kokiku1700/d-petal.git

# 프로젝트 폴더 이동
cd d-petal

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

## 환경 변수 설정
```env
DATABASE_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
KAKAO_REDIRECT_URI=

NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=
NAVER_REDIRECT_URI=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=

RESEND_API_KEY=
```

## 회고
d.petal은 단순히 기능 구현에만 집중한 프로젝트가 아니라 실제 서비스를 운영한다는 가정으로 진행한 프로젝트다.

개발 과정에서는 최대한 사용자의 입장에서 UI와 UX를 설계하려고 노력했으며, 이전 프로젝트들과는 다르게 인증과 보안에 대해서도 고민하며 개발을 진행했다.

특히 세션을 데이터 베이스에서 관리하고 브라우저의 쿠키와 비교해 사용자를 인증하는 과정, 비밀번호와 같은 민감한 정보를 해싱하여 저장하는 과정 등을 직접 구현하면서 프론트엔드 개발을 넘어 서비스 전반의 동작 방식을 이해할 수 있었다.

또한 OAuth 로그인, 세션 관리, 이메일 인증, 파일 업로드 등의 기능을 구현하면서 예상하지 못했던 다양한 문제를 경험했다. 이 과정에서 단순히 에러를 해결하는 것에 그치지 않고, 문제가 발생한 원인을 분석하고 해결 방법이 왜 효과적인지 이해하려고 노력했다.

이번 프로젝트를 통해 기능 구현 능력뿐만 아니라 문제 해결 과정의 중요성을 다시 한 번 느낄 수 있었으며, 앞으로도 새로운 기술을 두려워하지 않고 직접 구현하며 경험의 폭을 넓혀가고자 한다.