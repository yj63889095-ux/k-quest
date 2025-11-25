@echo off
chcp 65001 >nul
cls
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   Vercel 로그인 및 배포
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo [안내]
echo 1. 브라우저가 자동으로 열립니다
echo 2. Vercel 로그인하세요 (GitHub 추천)
echo 3. 터미널로 돌아와서 Enter 누르세요
echo 4. 자동 배포 시작됩니다
echo.
pause
echo.
echo [1/2] Vercel 로그인 중...
echo.
call npx vercel login
echo.
echo [2/2] 프로젝트 배포 중...
echo.
call npx vercel --prod
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo   배포 완료!
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 위에 표시된 URL을 확인하세요!
echo.
echo 도메인 연결:
echo 1. vercel.com 접속
echo 2. k-quest 프로젝트 선택
echo 3. Settings - Domains
echo 4. quest-k.com 추가
echo.
pause
