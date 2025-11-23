# K-Quest - Production Ready App

프리미엄 한국 퀘스트 중개 플랫폼 (Real Backend + Payment System)

## 🎯 Features

- ✅ **Real Authentication** - Supabase Auth
- ✅ **Database** - PostgreSQL with Row Level Security
- ✅ **Payment System** - PayPal 연동 (30% 수수료 자동 계산)
- ✅ **Multi-language** - 한국어/English
- ✅ **PWA** - 모바일 홈 화면 설치 가능
- ✅ **Responsive** - 모든 기기 완벽 지원

## 📂 Project Structure

```
k-quest/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create-payment/     # PayPal 결제 생성
│   │   │   └── capture-payment/    # PayPal 결제 완료
│   │   ├── auth/
│   │   │   ├── login/             # 로그인 페이지
│   │   │   └── signup/            # 회원가입 페이지
│   │   ├── quests/                # 퀘스트 목록/상세
│   │   └── wallet/                # 지갑/수익 관리
│   ├── components/
│   │   ├── PaymentButton.tsx     # PayPal 결제 버튼
│   │   └── ...
│   └── lib/
│       ├── supabase.ts            # Supabase 클라이언트
│       ├── store.ts               # 전역 상태 (Auth 포함)
│       └── i18n.ts                # 다국어
├── supabase/
│   └── schema.sql                 # 데이터베이스 스키마
├── docs/
│   ├── SETUP_GUIDE.md            # 설정 가이드
│   ├── 30min_guide.md            # 30분 완성 가이드
│   ├── deployment_guide.md        # Vercel 배포 가이드
│   └── marketing_strategy.md     # VIP 마케팅 전략
└── env.template.txt              # 환경 변수 템플릿
```

## ⚙️ Setup (포텐타로님이 할 일)

### 1. Supabase 프로젝트 생성
- [supabase.com](https://supabase.com)에서 프로젝트 생성
- `supabase/schema.sql` 실행

### 2. 환경 변수 설정
```bash
cp env.template.txt .env.local
# .env.local 파일에 Supabase + PayPal 키 입력
```

### 3. 로컬 실행
```bash
npm install
npm run dev
```

### 4. Vercel 배포
- GitHub 업로드
- Vercel 연결
- 환경 변수 추가

## 💰 Payment Flow

1. 사용자가 퀘스트 수락
2. PayPal 결제창 오픈
3. 결제 완료 → 30% 수수료 자동 차감
4. 거래 내역 Supabase에 저장
5. 수행자에게 70% 지급

## 📱 Deployment

- **Web**: Vercel (자동 배포)
- **PWA**: 모바일 홈 화면 설치
- **Google Play**: APK/AAB 빌드 필요 (추후)

## 📄 License

Copyright (c) 2025 Potentaro (Jeong Yeon-ju)
MIT License

## 👨‍💻 Owner

**Potentaro (정연주)** - All Rights Reserved
