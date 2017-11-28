### test express

Setup log
```
mkdir express
cd express

npm init
# "name": "expressTest" expressだと名前がかぶると怒られる

npm install express --save

npm install express-generator
# カレントフォルダにインストールGlobalに入れろと言われるが無視

# インストールされたか確認
npm ls

# node_modules/.bin/express にコマンドがある
# ↓でpug のプロジェクトフオルダーが作成される
node_modules/.bin/express --view=pug view

# view/package.json が作成される 
cd view
npm install

# サーバー実行
npm start

```
