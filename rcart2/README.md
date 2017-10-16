
# All 
http://mono-96.jp/tmp/test/rcart2/


https://github.com/tohshige/test/blob/master/rcart2/index.html#L120,L153

```
上記の セレクトの　name= 部分はItemIDですが以下のようにアンダースコア'_'付きで区切って指定すると  
インベントリIDとインベントリフラグとして識別するよう追加変更  
itemid_inventoryid_inventoryflg_itemPrice  
*事前に合計を求めるため、itemPriceを追加
例　エンジェルフィット ピローカバー  
name=10000475_1206
```

## カラー別でカートに入れる、値段を指定する  
### new：  
```html
<select name="10003534_0_0_1000" >
単価1000円の商品。末尾に_10000を追記
<select name="10000470_2458_2_10000">
インベントリIDがない場合は0を指定。末尾に_10000を追記
<select name="10000470_0_0_10000">

```

## チェックボックスタグは固定タグ　select のあとに以下のタグで
https://github.com/tohshige/test/blob/master/rcart2/index.html#L143

```html
<input type="checkbox" name="chk" value="1" >
  name を変えると計算しなくなります。
```


## 昔のHTMLは非表示にしてるだけなので、必要なければ削除を
https://github.com/tohshige/test/blob/master/rcart2/index.html#L273
- これ以降をバッサリ削除でも問題なし

## モーダル
https://github.com/tohshige/test/blob/master/rcart2/modal.html#L7
