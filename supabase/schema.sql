-- K-Quest Database Schema
-- 포텐타로님: 이 파일을 Supabase SQL Editor에 복사-붙여넣기하세요!

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('foreigner', 'local')) NOT NULL,
  nickname TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quests Table
CREATE TABLE IF NOT EXISTS quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reward DECIMAL(10, 2) NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT CHECK (status IN ('open', 'in_progress', 'completed', 'cancelled')) DEFAULT 'open',
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  performer_id UUID REFERENCES users(id) ON DELETE SET NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions Table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  platform_fee DECIMAL(10, 2) NOT NULL,
  performer_earning DECIMAL(10, 2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
  paypal_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_quests_status ON quests(status);
CREATE INDEX IF NOT EXISTS idx_quests_requester ON quests(requester_id);
CREATE INDEX IF NOT EXISTS idx_quests_performer ON quests(performer_id);
CREATE INDEX IF NOT EXISTS idx_transactions_quest ON transactions(quest_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read all profiles
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Anyone can view open quests
CREATE POLICY "Anyone can view quests"
  ON quests FOR SELECT
  USING (true);

-- Authenticated users can create quests
CREATE POLICY "Authenticated users can create quests"
  ON quests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

-- Quest owners can update their quests
CREATE POLICY "Quest owners can update"
  ON quests FOR UPDATE
  USING (auth.uid() = requester_id OR auth.uid() = performer_id);

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM quests
      WHERE quests.id = transactions.quest_id
      AND (quests.requester_id = auth.uid() OR quests.performer_id = auth.uid())
    )
  );
