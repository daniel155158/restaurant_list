# 餐廳清單
此專案提供使用者精選餐廳清單，使用者可以新增及刪除餐廳、查看及編輯餐廳詳細資訊以及透過搜尋關鍵字查詢餐廳。

## 功能說明
* 使用者可以新增及刪除餐廳。
* 使用者可以編輯餐廳資訊。
* 使用者可以點擊餐廳查看詳細資料，例如：地址及連絡電話等等。
* 使用者可以輸入關鍵字(餐廳名稱及類別)查詢餐廳。
* 使用者可以餐廳名稱、類別及地址做排序。

## 如何安裝
1. 打開你的terminal並且clone 此專案至本機電腦
```
git clone https://github.com/daniel155158/restaurant_list.git
```
2. 開啟terminal，進入存放此專案的資料夾
```
cd restaurant_list
```
3. 安裝npm套件
```
npm install
```
4. 使用nodemon
```
nodemon app.js
```
如果terminal出現: 
```
The express is listening on http://localhost:3000
```
表示伺服器順利啟動

現在，你可開啟任一瀏覽器瀏覽器輸入[http://localhost:3000/](http://localhost:3000/) 開始使用此餐廳清單囉！
## 開發工具
* Node.js
* Express
* Express-handlebars 
* MongoDB
* Mongoose
* Method-override
* Dotenv
* Bootstrap
* Font awesome