# SHLINK
Simple link shortener built using Vue CLI, Node.js, MongoDB

# Server settings (Linux + nginx + Node.js + MongoDB)
First of all you need to install and configure your Web Server (nginx in my case).

Open server block configuration:
```
sudo nano /etc/nginx/sites-available/example.com
```
**example.com - Your domain name**

Make sure that your server block of your host looks similar:
```
server {
        root /var/www/example.com/public_html/;
        index index.html index.htm index.nginx-debian.html;

        server_name example.com www.example.com;

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
} 
```

**root** - Path to your website directory

**proxy_pass** - Address to your working Node.js app (configuration below)

Open cmd in frontend directory (and backend directory after) and download all node modules:
```
npm install
```
Install MongoDB: 
```
npm install mongodb
```
Create database: 
```
use shlink
```
Create collecion:
```
db.createCollection('links')
```
You can also install pm2:
```
npm install pm2 -g
```
And then run server.js
```
pm2 start server.js
```
**Also don't forget to enable HTTPS protocol for the clipboard work.**
