@echo off
chcp 65001 >nul
title Tu Dong Day Code Len GitHub

echo --- KIEM TRA GIT ---
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [LOI] May tinh cua ban chua cai dat Git!
    echo Toi se mo trang tai Git ngay bay gio.
    echo Hay tai ve va cai dat (cu nhan Next lien tuc la duoc).
    timeout /t 3 >nul
    start https://git-scm.com/download/win
    echo.
    echo Sau khi cai dat xong, hay chay lai file nay nhe!
    pause
    exit /b
)

echo.
echo --- TAO REPOSITORY TREN GITHUB ---
echo Neu ban chua tao Repository tren GitHub, toi se mo trang tao ngay bay gio.
echo (Neu da co URL roi thi co the bo qua buoc nay)
choice /M "Ban da co Repository chuc?"
if %errorlevel% equ 2 (
    start https://github.com/new
    echo Hay dat ten cho Repository (vi du: AstronomyParkCamp) va nhan "Create repository".
    echo Sau do copy duong link (vi du: https://github.com/ten-ban/repo.git).
    pause
)

echo.
echo --- BAT DAU QUA TRINH DAY CODE ---
git init

echo Dang them tat ca file...
git add .

echo Dang luu (commit) thay doi...
git commit -m "Initial commit - Auto upload"

git branch -M main

echo.
set /p repo_url="Nhap (Paste) URL cua Repository tai day (chuot phai de paste): "

echo Dang ket noi voi GitHub...
git remote remove origin >nul 2>&1
git remote add origin %repo_url%

echo.
echo --- DANG DAY CODE LEN (PUSH) ---
echo Luu y: Mot cua so dang nhap GitHub co the hien ra. Hay dang nhap de xac thuc.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo [THANH CONG] Code da duoc dua len GitHub!
    echo Bay gio ban hay qua Netlify de lien ket nhe.
) else (
    echo.
    echo [THAT BAI] Co loi xay ra khi day code. Hay kiem tra lai URL hoac mang.
)

pause
