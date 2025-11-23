# K-Quest 소셜 로그인 설정 가이드 (5분 컷)

사장님께서는 이 문서를 보시면서 **복사&붙여넣기**만 하시면 됩니다.
카카오/구글 로그인 버튼이 활성화됩니다.

---

## 1단계: Google 로그인 설정 (2분)

### 1-1. Google Cloud Console 접속
1. https://console.cloud.google.com/ 접속
2. 프로젝트 선택 (없으면 새로 만들기)
3. 왼쪽 메뉴 **"API 및 서비스" → "OAuth 동의 화면"** 클릭

### 1-2. OAuth 동의 화면 설정
- **사용자 유형**: "외부" 선택
- **앱 이름**: `K-Quest`
- **사용자 지원 이메일**: 본인 이메일
- **승인된 도메인**: `quest-k.com` 입력
- 나머지는 건너뛰기

### 1-3. OAuth 클라이언트 ID 생성
1. 왼쪽 메뉴 **"사용자 인증 정보"** 클릭
2. 상단 **"+ 사용자 인증 정보 만들기" → "OAuth 클라이언트 ID"**
3. 애플리케이션 유형: **"웹 애플리케이션"**
4. **승인된 리디렉션 URI**에 아래 2개 입력:
   ```
   https://quest-k.com/auth/callback
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
   (YOUR_PROJECT_ID는 Supabase 대시보드 URL에서 확인)
   
5. **"만들기"** 클릭
6. 나타나는 **"클라이언트 ID"**와 **"클라이언트 보안 비밀번호"**를 복사해두세요.

### 1-4. Supabase에 등록
1. https://supabase.com/dashboard/project/YOUR_PROJECT_ID/auth/providers 접속
2. **"Google"** 찾아서 클릭
3. **"Google enabled"** 토글 켜기
4. 아까 복사한 값 붙여넣기:
   - **Client ID**: (구글에서 복사한 값)
   - **Client Secret**: (구글에서 복사한 값)
5. **"Save"** 클릭

---

## 2단계: Kakao 로그인 설정 (3분)

### 2-1. Kakao Developers 접속
1. https://developers.kakao.com/ 접속
2. 카카오 계정으로 로그인
3. **"내 애플리케이션"** → **"애플리케이션 추가하기"** 클릭
4. **앱 이름**: `K-Quest` 입력 → 저장

### 2-2. 플랫폼 추가
1. 방금 만든 앱 클릭
2. 왼쪽 **"플랫폼"** 메뉴 클릭
3. **"Web 플랫폼 등록"** 클릭
4. **사이트 도메인**: `https://quest-k.com` 입력 → 저장

### 2-3. Redirect URI 등록
1. 왼쪽 **"카카오 로그인"** 메뉴 클릭
2. **"활성화 설정"** → **ON** 으로 변경
3. 아래로 스크롤하여 **"Redirect URI"** 섹션 찾기
4. **"Redirect URI 등록"** 버튼 클릭
5. 아래 2개 입력 후 저장:
   ```
   https://quest-k.com/auth/callback
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```

### 2-4. 앱 키 복사
1. 왼쪽 **"요약 정보"** 메뉴 클릭
2. **"앱 키"** 섹션에서:
   - **REST API 키**: 이것을 복사해두세요 (Client ID로 사용)
3. 왼쪽 **"보안"** 메뉴 클릭
4. **"Client Secret"** → **"코드 생성"** 버튼 클릭
5. 생성된 코드를 복사해두세요

### 2-5. Supabase에 등록
1. https://supabase.com/dashboard/project/YOUR_PROJECT_ID/auth/providers 접속
2. **"Kakao"** 찾아서 클릭
3. **"Kakao enabled"** 토글 켜기
4. 아까 복사한 값 붙여넣기:
   - **Client ID (REST API Key)**: (카카오에서 복사한 REST API 키)
   - **Client Secret**: (카카오에서 복사한 Client Secret)
5. **"Save"** 클릭

---

## ✅ 완료!
이제 quest-k.com/auth/login 페이지에서 **Google**과 **Kakao** 버튼이 작동합니다!

테스트 방법:
1. 로그인 페이지에서 **"Continue with Google"** 또는 **"카카오 로그인"** 클릭
2. 구글/카카오 계정 선택
3. 자동으로 홈 화면으로 돌아오면 성공!

---

**문제가 생기면:**
- Supabase 대시보드 → **"Logs" → "Auth Logs"**에서 에러 확인
- Redirect URI가 정확히 일치하는지 확인 (끝에 `/` 있으면 안 됨)

**작성일**: 2025-11-23
**작성자**: K-Quest Engineering Team
