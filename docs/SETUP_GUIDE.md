# 🎯 포텐타로님이 할 일 (30분 가이드)

**완성된 파일들**:
- ✅ Supabase 클라이언트 (`src/lib/supabase.ts`)
- ✅ 데이터베이스 스키마 (`supabase/schema.sql`)
- ✅ PayPal 결제 API (`src/app/api/create-payment/route.ts`, `src/app/api/capture-payment/route.ts`)
- ✅ 결제 버튼 컴포넌트 (`src/components/PaymentButton.tsx`)
- ✅ 인증 시스템 (로그인/회원가입 페이지)
- ✅ 환경 변수 템플릿 (`env.template.txt`)

---

## 📋 Step 1: Supabase 프로젝트 생성 (5분)

1. [supabase.com](https://supabase.com) 접속
2. GitHub으로 로그인
3. **"New Project"** 클릭
4. 다음 정보 입력:
   - Project name: `k-quest`
   - Database Password: `[아무거나 - 메모하세요!]`
   - Region: `Northeast Asia (Seoul)`
5. **"Create new project"** 클릭 → 2분 대기

---

## 📋 Step 2: Supabase API 키복사 (2분)

1. 왼쪽 메뉴: ⚙️ **Settings** → **API**
2. 다음 복사:
   - `Project URL`: `https://xxxxx.supabase.co`
   - `anon public`: `eyJhbGc...` (긴 문자열)
   - `service_role`: `eyJhbGc...` (긴 문자열)

---

## 📋 Step 3: 데이터베이스 생성 (1분)

1. Supabase 왼쪽 메뉴: 🗄️ **SQL Editor**
2. **"New Query"**  클릭
3. 복사 파일: `k-quest/supabase/schema.sql` 내용 전체 복사
4. 붙여넣기 후 **"RUN"** 클릭
5. ✅ 완료!

---

## 📋 Step 4: 환경 변수 설정 (2분)

1. `k-quest/env.template.txt` 파일 열기
2. 복사해서 `.env.local` 파일로 저장
3. 다음 값들 채우기:
   ```
   NEXT_PUBLIC_SUPABASE_URL=[Step 2에서 복사한 URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon 키]
   SUPABASE_SERVICE_ROLE_KEY=[service_role 키]
   
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=[나중에]
   PAYPAL_SECRET=[나중에]
   PAYPAL_MODE=sandbox
   
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   PLATFORM_FEE_PERCENTAGE=30
   ```

---

## 📋 Step 5: PayPal Business 계정 (10분)

**나중에 시간 날 때 해도 됩니다!**

1. [paypal.com/kr/business](https://www.paypal.com/kr/business)
2. **"시작하기"** → **"비즈니스 계정"**
3. 사업자 정보 입력:
   - 사업자 이름: 포텐타로
   - 사업자 번호: [통신판매업 번호]
4. 본인 인증 (신분증, 통장 사본)
5. 승인까지 1~3일 대기

---

## 📋 Step 6: 로컬 테스트 (1분)

```bash
cd c:\Users\박세희\Desktop\k_bridge\k-quest
npm run dev
```

→ `http://localhost:3001` 에서 테스트!

---

## 📋 Step 7: GitHub 업로드 (5분)

1. GitHub Desktop 실행
2. `k-quest` 폴더 추가
3. **"Publish repository"**
4. ✅ 완료!

---

## 📋 Step 8: Vercel 배포 (3분)

1. [vercel.com](https://vercel.com) → GitHub 로그인
2. **"New Project"** → `k-quest` 선택
3. **Environment Variables** 추가:
   - `.env.local` 의 내용 복사-붙여넣기
4. **"Deploy"** 클릭
5. ✅ 완료! URL 생성됨

---

## 🎉 완료!

**이제 포텐타로님이 할 일**:
1. PayPal 승인 기다리기 (1~3일)
2. PayPal 키 받아서 `.env.local`에 추가
3. Vercel에 환경 변수 업데이트
4. Google Play 등록 ($25)

**나머지는 제가 다 만들어뒀습니다!** 🎉
