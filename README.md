## このページのURL は↓
[ページ](https://tohshige.github.io/test/)

https://tohshige.github.io/test/
<!-- TOC -->

- [このページのURL は↓](#%E3%81%93%E3%81%AE%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AEurl-%E3%81%AF%E2%86%93)

<!-- /TOC -->

**前提条件**  
選手毎に有効イニング数をもとに集計しているので  
入力完了時に計算上 1試合＝9イニング とはならない。  
コールドゲームフラグの必要がないと思われる  

ランキングとの比較をメインに誤差を調査  
- 登板投手の投球回数を確認  
- 登板打者の打数を確認  

| -     | 打者  | 投手  |
|:-------:|:-----:|:-----:|
| ランキング | 調査中   | O   |
| 分析    |  調査中   |     |


打率 = 安打 ÷ 打数

**修正**  
ランキングと分析で誤差があったためランキング側SQLの計算式を修正
> 出塁率 = (安打 + 四球 + 死球) ÷ (打数 + 四球 + 死球 + 犠飛) 
>> 死球が加算されていなかった為追加

> 長打率 = (単打×1＋二塁打×2＋三塁打×3＋本塁打×4)  ÷ 打数
>> 3塁打が単打に置き換わっていたため修正

tests
`from vs code`
