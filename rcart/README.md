
# All 
http://mono-96.jp/tmp/test/rcart/


例：画面上部、ラジオボタン例 
https://github.com/tohshige/test/blob/master/rcart/index.html#L141,L161  

例：画面下の商品ドロップダウン 
https://github.com/tohshige/test/blob/master/rcart/index.html#L523,L543  
```
上記の name= 部分はItemIDですが以下のようにアンダースコア'_'付きで区切って指定すると  
インベントリIDとインベントリフラグとして識別するよう追加変更  
itemid_inventoryid_inventoryflg  
エンジェルフィット ピローカバー  
name=10000475_1206
```

## カラー別でカートに入れる  
### new：  
```html
<input type="hidden" name="item_id" value="10000470_2458_2">
```
### old:  
```html
<input type="hidden" name="item_id" value="10000470">
<input type="hidden" name="inventory_id" value="2458">
<input type="hidden" name="inventory_flag" value="2">
```



# test
### ここでJSプログラムを作成 完成後 Allに反映
http://mono-96.jp/tmp/test/rcart/cart_test.html

# idea: auto sync from sakura

- ユーザ（今回の場合デザイナ）はFTPなどを使ってファイルをアップロードする
 - gitを使ってアップロードされたファイルを定期的にバックアップ
- 知ってる人（今回は自分を含めたプログラマ）がgitを使ってもとに戻せるように
 - git push を cron で回してバックアップ
 - バックアップ用のスクリプトを書いて

## on sakura server
sync.sh
```sh
#!/bin/bash
set -e
content_dir="<コンテンツを保存している場所>"

set -x
cd "$content_dir"
git add -A
git commit -m "Commit at $(date "+%Y-%m-%d %T")" || true
git push -f origin master:master
```

## crontabで呼ぶ（毎日夜中の4時に）
```
0 4 * * * /bin/bash /path/to/sync.sh >> /path/to/sync.log 2>&1
```
