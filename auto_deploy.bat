@echo off
chcp 65001 >nul
title K‑Quest 자동 배포 (한 번 클릭)

:: ---------- 사전 체크 ----------
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Git이 설치되지 않았어요.
    echo https://git-scm.com/download/win 에서 다운로드 후 설치해주세요.
    pause
    exit /b 1
)
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Node.js가 설치되지 않았어요.
    echo https://nodejs.org/ 에서 LTS 버전을 설치해주세요.
    pause
    exit /b 1
)

:: ---------- 현재 폴더 이동 ----------
set "PROJECT_ROOT=%~dp0"
cd /d "%PROJECT_ROOT%"

:: ---------- Git 초기화 ----------
if not exist .git (
    echo [*] Git 저장소 초기화 중...
    git init
) else (
    echo [*] Git 저장소가 이미 존재합니다.
)

:: ---------- 사용자 정보 ----------
git config user.email "yj63889095@gmail.com"
git config user.name  "Potentaro"

:: ---------- 파일 추가 & 커밋 ----------
git add .
git commit -m "Initial commit - K‑Quest ready for deployment" 2>nul
if %errorlevel% neq 0 (
    echo [*] 이미 커밋된 내용이 있습니다.
)

:: ---------- 원격 저장소 연결 ----------
set "REMOTE_URL=https://github.com/yj63889095-ux/k-quest.git"
git remote remove origin >nul 2>nul
git remote add origin %REMOTE_URL%

:: ---------- GitHub 토큰 입력 (한 번만) ----------
if not exist .git\credentials (
    :ask_token
    set /p "GITHUB_PAT=🔑 GitHub Personal Access Token 입력 (repo 권한 필요): "
    if "%GITHUB_PAT%"=="" (
        echo 토큰이 비었습니다. 다시 입력해주세요.
        goto ask_token
    )
    git config credential.helper store
    echo %REMOTE_URL%>temp_cred.txt
    echo username=%GITHUB_PAT%>>temp_cred.txt
    git credential-store --file=.git\credentials store < temp_cred.txt
    del temp_cred.txt
) else (
    echo [*] 기존 GitHub 토큰이 저장되어 있습니다.
)

:: ---------- GitHub에 푸시 ----------
echo [*] GitHub 로 푸시 중...
git push -u origin main
if %errorlevel% neq 0 (
    echo [X] 푸시 실패. 토큰이 잘못됐을 수 있습니다.
    pause
    exit /b 1
)

:: ---------- Vercel CLI 설치 ----------
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo [*] Vercel CLI 설치 중...
    npm i -g vercel
)

:: ---------- Vercel 로그인 ----------
echo.
echo [*] Vercel 로그인 창이 열립니다. 브라우저에서 로그인 후

echo     “Authorize Vercel” 버튼을 클릭해주세요.
vercel login
if %errorlevel% neq 0 (
    echo [X] Vercel 로그인 실패.
    pause
    exit /b 1
)

:: ---------- Vercel 배포 ----------
echo.
echo [*] Vercel에 배포 중... 잠시 기다려 주세요.
vercel --prod
if %errorlevel% neq 0 (
    echo [X] Vercel 배포 실패.
    pause
    exit /b 1
)

:: ---------- 마무리 ----------
echo.
echo ==========================================================
echo   🎉 배포가 모두 완료되었습니다!
echo   - GitHub: https://github.com/yj63889095-ux/k-quest
necho   - Vercel: (배포가 끝난 뒤 자동으로 브라우저가 열립니다)
echo   - 도메인 연결은 Vercel → Settings → Domains 에서 진행하세요.
echo ==========================================================
pause
