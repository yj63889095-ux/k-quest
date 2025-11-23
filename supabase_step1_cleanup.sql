-- 1단계: 모든 것 삭제
-- 이것만 먼저 실행하세요!

-- 기존 테이블 전부 삭제 (CASCADE로 관련된 정책도 자동 삭제)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS quests CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- 완료!
SELECT '1단계 완료: 기존 데이터 삭제됨' AS message;
