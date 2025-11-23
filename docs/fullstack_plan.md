# K-Quest 완전한 기능 구현 계획

## 목표

현재 프로토타입을 **실제 운영 가능한 완전한 앱**으로 전환합니다.

## 사용자 승인 필요

> [!IMPORTANT]
> **예상 작업 시간**: 2~3주
> 
> **구현할 기능**:
> 1. 실제 회원가입/로그인
> 2. 퀘스트 등록/관리/매칭
> 3. 실제 결제 및 송금
> 4. 앱스토어 배포 준비
>
> **비용 (초기)**:
> - Supabase: $0 (무료 티어)
> - Stripe: 거래당 2.9% + $0.30
> - Google Play: $25 (1회)
> - **합계**: $25 + 거래 수수료

> [!WARNING]
> **중요 결정**:
> - 실제 결제를 받으려면 **사업자 등록**이 필요할 수 있습니다
> - Stripe는 **본인 인증** 필요 (신분증, 통장)
> - 세금 신고 의무 발생 가능

## 제안된 변경사항

---

### 1. 백엔드 시스템 (Supabase)

#### [NEW] Supabase 프로젝트 생성
- PostgreSQL 데이터베이스 (무료 500MB)
- 실시간 업데이트
- 자동 API 생성

#### [NEW] 데이터베이스 스키마

**`users` 테이블**:
```sql
- id (UUID, PK)
- email (text, unique)
- password_hash (text)
- role (enum: 'foreigner', 'local')
- nickname (text)
- avatar_url (text)
- created_at (timestamp)
```

**`quests` 테이블**:
```sql
- id (UUID, PK)
- title (text)
- description (text)
- reward (decimal)
- location (text)
- category (text)
- status (enum: 'open', 'in_progress', 'completed', 'cancelled')
- requester_id (FK → users)
- performer_id (FK → users, nullable)
- created_at (timestamp)
```

**`transactions` 테이블**:
```sql
- id (UUID, PK)
- quest_id (FK → quests)
- amount (decimal)
- platform_fee (decimal)
- performer_earning (decimal)
- status (enum: 'pending', 'completed', 'failed')
- stripe_payment_id (text)
- created_at (timestamp)
```

#### [MODIFY] 환경 변수 설정
`.env.local` 파일에 추가:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

---

### 2. 인증 시스템

#### [NEW] [lib/supabase.ts](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/lib/supabase.ts)
Supabase 클라이언트 초기화

#### [MODIFY] [lib/store.ts](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/lib/store.ts)
- Mock `login()` → 실제 Supabase Auth 연동
- 세션 관리 추가
- 로그아웃 시 Supabase 세션 종료

#### [NEW] [app/auth/signup/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/auth/signup/page.tsx)
회원가입 페이지
- 이메일/비밀번호 입력
- 역할 선택 (외국인/로컬)
- 이메일 인증

#### [NEW] [app/auth/login/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/auth/login/page.tsx)
로그인 페이지

---

### 3. 퀘스트 관리 시스템

#### [MODIFY] [app/quests/new/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/quests/new/page.tsx)
- Mock → 실제 Supabase INSERT
- 이미지 업로드 (Supabase Storage)
- 유효성 검사

#### [MODIFY] [app/quests/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/quests/page.tsx)
- Mock 데이터 → Supabase에서 실시간 로드
- 필터링/검색 쿼리

#### [MODIFY] [app/quests/[id]/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/quests/[id]/page.tsx)
- 동적 데이터 로드
- "Accept" 버튼 → 실제 퀘스트 수락 API 호출

---

### 4. 결제 시스템 (Stripe)

#### [NEW] Stripe 계정 설정
1. [stripe.com](https://stripe.com) 가입
2. 본인 인증 (신분증, 통장)
3. API 키 발급

#### [NEW] [lib/stripe.ts](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/lib/stripe.ts)
Stripe 클라이언트 초기화

#### [NEW] [app/api/create-payment-intent/route.ts](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/api/create-payment-intent/route.ts)
결제 의도 생성 API
- 퀘스트 금액 계산
- 30% 수수료 적용
- Stripe Payment Intent 생성

#### [NEW] [app/api/webhooks/stripe/route.ts](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/api/webhooks/stripe/route.ts)
Stripe 웹훅 처리
- 결제 성공 시 퀘스트 상태 업데이트
- 수행자에게 수익 적립

#### [NEW] [components/PaymentForm.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/components/PaymentForm.tsx)
Stripe Elements를 사용한 결제 폼

#### [MODIFY] [app/wallet/page.tsx](file:///c:/Users/박세희/Desktop/k_bridge/k-quest/src/app/wallet/page.tsx)
- Mock 거래 내역 → Supabase 실제 데이터
- 출금 요청 기능 (Stripe Payouts)

---

### 5. 앱스토어 배포 준비

#### [NEW] React Native 래퍼 (선택 A)
- Expo 또는 React Native WebView
- 네이티브 앱으로 패키징

#### [ALTERNATIVE] PWA 고도화 (선택 B - 추천)
- Service Worker 추가
- 오프라인 지원
- 푸시 알림 (Firebase)

#### [NEW] Google Play Console 설정
1. 개발자 계정 생성 ($25)
2. 앱 정보 입력
3. APK/AAB 업로드
4. 심사 제출 (보통 1~3일)

---

## 검증 계획

### 1. 백엔드 테스트
- [ ] 회원가입/로그인 정상 작동
- [ ] 퀘스트 CRUD 작동
- [ ] 데이터베이스 관계 무결성

### 2. 결제 테스트
- [ ] Stripe 테스트 모드로 결제 테스트
- [ ] 30% 수수료 정확히 계산
- [ ] 웹훅 정상 수신

### 3. 보안 테스트
- [ ] SQL Injection 방어
- [ ] XSS 방어
- [ ] 인증 토큰 보안

### 4. 성능 테스트
- [ ] 100명 동시 접속 처리
- [ ] 페이지 로딩 3초 이내

---

## 다음 단계

1. **사용자 승인** ← 지금 여기
2. Supabase 프로젝트 생성
3. 데이터베이스 스키마 구축
4. 인증 시스템 구현
5. 퀘스트 CRUD 구현
6. Stripe 연동
7. 테스트
8. 배포

---

**이 계획에 동의하시나요? 시작할까요?**
