# rcart.js

last : http://rcart.eek.jp/rcart2/pc2.html

2nd : http://rcart.eek.jp/rcart2/pc1.html  
1st : http://rcart.eek.jp/rcart2/

https://github.com/tohshige/test/blob/master/rcart2/index.html#L120,L153

```html
上記の セレクトの　name= 部分はItemIDですが以下のようにアンダースコア'_'付きで区切って指定すると  
インベントリIDとインベントリフラグとして識別するよう追加変更
[itemId]_[inventoryId]_[inventoryFlg]_[itemPrice]  
*事前に合計を求めるため、itemPriceを追加
例　エンジェルフィット ピローカバー  
name=10000475_1206

割引額を計算させる %パーセント で指定                   ↓New
[itemId]_[inventoryId]_[inventoryFlg]_[itemPrice]_[discount%]
割引金額を計算させる ¥円 で指定                                      ↓New
[itemId]_[inventoryId]_[inventoryFlg]_[itemPrice]_[discount%]_[discountPrice]
```

## カラー別でカートに入れる、値段を指定する

```html
<select name="10003534_0_0_1000" >
単価1000円の商品。末尾に_10000を追記
<select name="10000470_2458_2_10000">
インベントリIDがない場合は0を指定。末尾に_10000を追記
<select name="10000470_0_0_10000">
```

## discount

 割引率を指定する \
 割引額を計算させる % で指定
![discount](https://user-images.githubusercontent.com/15937579/36368523-faa172ac-159a-11e8-9647-1c88e663ff72.png)

```html
select name  を ver2から始まる ユニークな文字で指定してください
option value にITEMCode、割引率やらを指定

例 33%引きで1000円の商品
<select name="ver21">
  <option value="10003534_0_0_1000_33">商品名</option>
割引率から元の価格を求め差額を加算します

例 ¥200円引きで1000円の商品
<select name="ver22">
  <option value="10003534_0_0_1000_0_200">商品名</option>
指定金額を加算します
```

```html
checked で初期値をチェックされた状態にする
  <input type="checkbox" name="chk" value="1" checked> 追加

1セレクトボックスあたりに1つcheckboxは必要
       <!-- display:none でチェックボタン非表示 -->
<div style="display: none;">
  <input type="checkbox" name="chk" value="1" checked> 追加
</div>
```

## checkbox

チェックボックスタグは固定タグ　select のあとに以下のタグで
<https://github.com/tohshige/test/blob/master/rcart2/index.html#L143>

```html
<input type="checkbox" name="chk" value="1" >
  name を変えると合計の計算しなくなります。
```

### HTMLでの指定例

![例](https://user-images.githubusercontent.com/15937579/31762250-a0ddc32a-b4f5-11e7-9e5a-ee3a3ae73e8c.png)

#### 例　サイズ違い　商品ID　価格指定

```html
シングルを
        <select  name="10003918_0_0_15960" >
          <input type="checkbox" name="chk" value="1" >
            買い物カゴに追加する
セミダブルを
        <select name="10003919_0_0_17220" >
          <input type="checkbox" name="chk" value="1" >
            買い物カゴに追加する
ダブルを
        <select name="10003920_0_0_18760" >
          <input type="checkbox" name="chk" value="1" >
            買い物カゴに追加する
```

#### 例　色違い 商品ID同じ　インベントリIDが違う

```html
ピンクを
        <select class="ui right big label" name="10003928_8862_2_5800" >
          <input type="checkbox" name="chk" value="1" >
            買い物カゴに追加する

ブラウンを
        <select class="ui right big label" name="10003928_8863_2_5800" >
          <input type="checkbox" name="chk" value="1" >
            買い物カゴに追加する

```

#### インベントリIDが不明の場合

商品ページのHTMLに埋め込まれいている
![image](https://user-images.githubusercontent.com/15937579/31806282-aeba9aa2-b5a1-11e7-9eca-2039a4b5afe7.png)

## 昔のHTMLは非表示にしてるだけなので、必要なければ削除を

これ以降をバッサリ削除でも問題なし
<https://github.com/tohshige/test/blob/master/rcart2/index.html#L273>

## モーダル

https://github.com/tohshige/test/blob/master/rcart2/modal.html#L7
