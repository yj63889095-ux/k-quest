@echo off
chcp 65001 >nul
echo.
echo ========================================
echo    K-Quest 자동 배포 스크립트
echo ========================================
echo.
echo 잠시만 기다려주세요...
echo.

:: Git 설치 확인
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Git이 설치되어 있지 않습니다!
    echo.
    echo Git을 설치해야 합니다.
    echo 1. https://git-scm.com/download/win 에서 다운로드
    echo 2. 설치 후 이 파일을 다시 실행하세요!
    echo.
    pause
    start https://git-scm.com/download/win
    exit /b 1
)

echo [✓] Git이 설치되어 있습니다!
echo.

:: Git 초기화
if not exist .git (
    echo Git 저장소를 초기화하는 중...
    git init
    echo [✓] 초기화 완료!
)

:: Git 사용자 설정
git config user.email "yj63889095@gmail.com"
git config user.name "Potentaro"
echo [✓] Git 사용자 설정 완료!
echo.

:: 파일 추가
echo 파일을 준비하는 중...
git add .
echo [✓] 파일 준비 완료!
echo.

:: 커밋
echo 변경사항을 저장하는 중...
git commit -m "Initial commit - K-Quest ready for deployment"
echo [✓] 저장 완료!
echo.

:: GitHub 저장소 연결
echo GitHub 저장소에 연결하는 중...
git remote remove origin 2>nul
git remote add origin https://github.com/yj63889095-ux/k-quest.git
git branch -M main
echo [✓] 연결 완료!
echo.

:: GitHub에 업로드
echo.
echo ========================================
echo   GitHub에 업로드를 시작합니다!
echo ========================================
echo.
echo GitHub 로그인 창이 열릴 수 있습니다.
echo 로그인해주세요!
echo.
pause

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   🎉 GitHub 업로드 성공!
    echo ========================================
    echo.
    echo 다음 단계:
    echo 1. Vercel 배포
    echo 2. 도메인 연결
    echo.
    echo 브라우저가 열리면 다음 단계를 진행하세요!
    echo.
    pause
    start https://vercel.com/new
) else (
    echo.
    echo ========================================
    echo   ⚠️ 업로드 실패
    echo ========================================
    echo.
    echo GitHub 로그인이 필요합니다!
    echo 브라우저에서 로그인 후 다시 시도하세요.
    echo.
    pause
)
