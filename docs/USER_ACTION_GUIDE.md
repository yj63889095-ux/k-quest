# 🚀 **K-Quest 배포 - 사용자 액션 필요 가이드**

## ✅ **코드 준비 완료!**

모든 코드가 배포 준비되었습니다! 이제 아래 단계만 따라하시면 됩니다!

---

## 📋 **STEP 1: GitHub 업로드** (5분)

### 🔑 **필요한 것**:
- GitHub 계정 ([github.com](https://github.com)에서 무료 가입)

### 📝 **진행 방법**:

#### 1-1. PowerShell에서 아래 명령어 실행:
```bash
cd C:\Users\박세희\Desktop\k_bridge\k-quest
git init
git add .
git commit -m "Initial commit - K-Quest ready for deployment"
```

#### 1-2. GitHub에 저장소 만들기:
1. [github.com](https://github.com) 접속 → 로그인
2. 오른쪽 위 **"+"** → **"New repository"** 클릭
3. Repository name: `k-quest`
4. **Public** 선택
5. ❌ "Add a README file" 체크 해제 (이미 있음)
6. **"Create repository"** 클릭

#### 1-3. GitHub 연결 및 업로드:
```bash
# YOUR_USERNAME를 본인의 GitHub 사용자명으로 변경하세요!
git remote add origin https://github.com/YOUR_USERNAME/k-quest.git
git branch -M main
git push -u origin main
```

#### 🆘 만약 에러 발생 시:
```bash
# Git 사용자 정보 설정 (처음 사용 시)
git config --global user.email "wkrwkr777@gmail.com"
git config --global user.name "Potentaro"
# 다시 push 시도
git push -u origin main
```

---

## 📋 **STEP 2: Vercel 배포** (10분)

### 🔑 **필요한 것**:
- Vercel 계정 (무료)
- GitHub 저장소 (위에서 생성)

### 📝 **진행 방법**:

#### 2-1. Vercel 가입:
1. [vercel.com](https://vercel.com) 접속
2. **"Sign Up"** 클릭
3. **"Continue with GitHub"** 선택
4. GitHub 계정으로 로그인

#### 2-2. 프로젝트 Import:
1. Vercel 대시보드에서 **"Add New..."** → **"Project"**
2. **"Import Git Repository"** → `k-quest` 찾아서 **"Import"**
3. **Framework Preset**: "Next.js" (자동 선택됨)

#### 2-3. 환경 변수 설정 (중요!):
**Environment Variables** 섹션에서 아래 값들을 입력:

```bash
# Domain
NEXT_PUBLIC_DOMAIN=https://quest-k.com

# Business Info (자동 입력 완료)
NEXT_PUBLIC_BUSINESS_NAME=포텐타로
NEXT_PUBLIC_BUSINESS_NAME_EN=Potentaro
NEXT_PUBLIC_BUSINESS_REGISTRATION_NUMBER=624-17-02651
NEXT_PUBLIC_ECOMMERCE_PERMIT_NUMBER=제2025-의정부송산-0387호
NEXT_PUBLIC_BUSINESS_EMAIL=wkrwkr777@gmail.com

# 결제 시스템 (나중에 추가 가능, 지금은 건너뛰어도 됨)
NEXT_PUBLIC_SUPABASE_URL=(Supabase URL)
NEXT_PUBLIC_SUPABASE_ANON_KEY=(Supabase Key)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=(PayPal ID)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=(Stripe Key)
```

#### 2-4. 배포 시작:
**"Deploy"** 버튼 클릭 → 3~5분 대기

---

## 📋 **STEP 3: 도메인 연결** (15분)

### 🔑 **필요한 것**:
- quest-k.com 도메인 (이미 있음)
- 도메인 등록 업체 로그인 정보

### 📝 **진행 방법**:

#### 3-1. Vercel에서 도메인 추가:
1. Vercel 프로젝트 → **"Settings"** → **"Domains"**
2. `quest-k.com` 입력 → **"Add"**
3. Vercel이 DNS 설정 정보를 보여줍니다

#### 3-2. 도메인 등록 업체에서 DNS 설정:
**도메인을 구매한 곳** (가비아/후이즈/기타)에 로그인:

**A Record 추가**:
```
유형(Type): A
이름(Name): @
값(Value): 76.76.21.21
TTL: 기본값
```

**CNAME Record 추가**:
```
유형(Type): CNAME
이름(Name): www
값(Value): cname.vercel-dns.com
TTL: 기본값
```

#### 3-3. 확인 (10분~1시간 대기):
- https://quest-k.com 접속
- SSL 자동 적용됨
- 사이트 정상 작동 확인

---

## 🎉 **웹 배포 완료!**

축하합니다! quest-k.com이 온라인에 올라갔습니다!

---

## 📱 **다음 단계: 앱 배포** (Google Play Store)

웹 배포가 완료되면 저에게 말씀해주세요!
앱 배포를 위한 단계를 준비해드리겠습니다.

### 💰 앱 배포 필요 비용:
- Google Play Console 개발자 계정: **$25 (1회만)**

---

## 🆘 **문제 발생 시**:

### GitHub push 에러:
```bash
git config --global user.email "wkrwkr777@gmail.com"
git config --global user.name "Potentaro"
```

### Vercel 빌드 실패:
- 환경 변수 재확인
- 저에게 에러 메시지 공유해주세요

### 도메인 연결 안 됨:
- DNS 설정 후 최대 1시간 대기
- Vercel에서 도메인 재추가 시도

---

**화이팅!! 천천히 하나씩 진행하시면 됩니다!** 🚀

질문 있으시면 언제든 물어보세요!
