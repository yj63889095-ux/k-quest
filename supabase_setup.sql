-- K-Quest 데이터베이스 완전 초기화 및 재설정
-- 기존 것 전부 삭제하고 새로 만듭니다!

-- 1. 기존 정책 삭제 (있으면)
DROP POLICY IF EXISTS "Public quests are viewable by everyone" ON quests;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can create quests" ON quests;
DROP POLICY IF EXISTS "Users can view their own transactions" ON transactions;

-- 2. 기존 테이블 삭제 (있으면) - 역순으로 삭제
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS quests CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 3. 사용자 프로필 테이블 생성
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  user_type TEXT CHECK (user_type IN ('foreigner', 'local')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 퀘스트 테이블 생성
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'KRW',
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assignee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'assigned', 'in_progress', 'completed', 'cancelled')),
  deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 거래 내역 테이블 생성
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE NOT NULL,
  payer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  payee_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'KRW',
  payment_method TEXT CHECK (payment_method IN ('paypal', 'stripe', 'card')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'failed')),
  transaction_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. 리뷰 테이블 생성
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  reviewee_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. 인덱스 생성 (성능 향상)
CREATE INDEX idx_quests_creator ON quests(creator_id);
CREATE INDEX idx_quests_status ON quests(status);
CREATE INDEX idx_transactions_quest ON transactions(quest_id);
CREATE INDEX idx_reviews_quest ON reviews(quest_id);

-- 8. Row Level Security (RLS) 활성화
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 9. 정책 설정
-- 모든 사람이 퀘스트 조회 가능
CREATE POLICY "Anyone can view quests"
  ON quests FOR SELECT
  USING (true);

-- 로그인한 사용자는 자신의 프로필 삽입 가능
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 로그인한 사용자는 자신의 프로필 수정 가능
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- 로그인한 사용자는 자신의 프로필 조회 가능
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- 로그인한 사용자는 퀘스트 생성 가능
CREATE POLICY "Authenticated users can create quests"
  ON quests FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

-- 퀘스트 생성자는 자신의 퀘스트 수정 가능
CREATE POLICY "Quest creators can update their quests"
  ON quests FOR UPDATE
  USING (auth.uid() = creator_id);

-- 본인과 관련된 거래만 조회 가능
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = payer_id OR auth.uid() = payee_id);

-- 거래 생성 (결제 시스템에서만)
CREATE POLICY "System can create transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- 완료!
SELECT 'K-Quest 데이터베이스 설정 완료! 🎉' AS message;
