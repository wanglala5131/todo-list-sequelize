## TODO-LIST
使用node.js、express、MySQL、與其他相關工具所做的網站


## 環境建置與需求

**1. 執行環境、框架與資料庫**
* node.js v10.15.0 -執行環境
* express v4.17.1 -框架
* express-handlebars v4.0.4 -模板引擎
* MySQL - V8.0.20.0 -資料庫管理系統
* sequelize v 5.21.13 - 物件映射工具
* sequelize-cli v5.5.1
* mysql2 - 2.1.0

**2. 中介軟體**
* express-session v1.17.1
* body-parser v1.19.0
* method-override v3.0.0
* passport v0.4.1
* passport-facebook v3.0.0
* passport-local v1.0.0
* connect-flash v0.1.1
* dotenv v8.2.0



## 安裝與使用
#### 下載專案
    git clone https://github.com/wanglala5131/todo-list-sequelize.git
#### 安裝package
    npm install
#### 新增種子資料
    npx sequelize db:seed:all
#### 使用nodemon啟動伺服器
    npm run dev
#### 或正常啟動
    npm start


## 網站功能
**1. 使用者登入**
* 可利用email、password註冊帳號
* 可利用facebook註冊帳號與登入

**2. 使用者登入後的功能**
* 可新增、刪除、編輯todo