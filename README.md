# unichat-react
unichat react frontend


docker build -t chat-app .

docker run -d  -p 9090:80 --name chat_app_container chat-app 

-v ~/apps/unichat-react/chat-app:/app <- docker volume 설정 부분 에러 발생
