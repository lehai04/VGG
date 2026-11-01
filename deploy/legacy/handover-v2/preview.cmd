@echo off
setlocal
pushd "%~dp0..\.."
if /I "%~1"=="stop" goto stop
if /I "%~1"=="logs" goto logs
if /I "%~1"=="status" goto status
if /I "%~1"=="start" goto start
echo Usage: preview.cmd start ^| stop ^| status ^| logs
popd
exit /b 1
:start
docker compose -p sdh-build-preview -f deploy/handover-v2/verify.compose.yaml -f deploy/handover-v2/preview.compose.yaml up -d --build
set preview_result=%ERRORLEVEL%
if %preview_result%==0 echo Open https://localhost:3443/vi after startup finishes. Local test certificate only.
goto end
:stop
docker compose -p sdh-build-preview -f deploy/handover-v2/verify.compose.yaml -f deploy/handover-v2/preview.compose.yaml stop
set preview_result=%ERRORLEVEL%
goto end
:status
docker compose -p sdh-build-preview -f deploy/handover-v2/verify.compose.yaml -f deploy/handover-v2/preview.compose.yaml ps
set preview_result=%ERRORLEVEL%
goto end
:logs
docker compose -p sdh-build-preview -f deploy/handover-v2/verify.compose.yaml -f deploy/handover-v2/preview.compose.yaml logs --tail 60 app
set preview_result=%ERRORLEVEL%
:end
popd
exit /b %preview_result%
