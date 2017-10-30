
# All 
this file is euc-jp!
- PC : http://rcart.eek.jp/used1/pc.html
- SP : http://rcart.eek.jp/used1/sp.html


### mixins.pug
```pug
//parts of kago
mixin pad(color,itemcode,padStyle)
  .pad(style=padStyle)
    span.item_name= color
    select.ui.right.big.label(name= itemcode)
      option ����
      option 1
      option 2
    | ��
    label
      .ui.primary.tiny.button.cartAddBtn
        input(type='checkbox', name='chk', value='1')
        |  �㤤ʪ�������ɲä���

mixin specBtn()
  hr
  .supec_btn
    a(class!=attributes.class href='#').arrow_01 > �������ƤϤ�����
    a.modal-sinpin.arrow_01(href='#') > ����Ʊ��/�ò����ʤȤ�

```


### pc.pug
```pug
//================== trsp ==================
- var itemName = 'trsp';
li(id=itemName,style='position: relative;margin:270px 0 440px 18px')
  +itemImg(itemName)
  .col_cart
    img(src='img/trsp_pri.jpg')
    // 1�Ĥ�ʬ 
    +item
      +pad('�����󥰥��', '10003918_0_0_15960','width:438px')
      +pad('���ߥ��֥��', '10003919_0_0_17220','width:438px')
      +pad('�������֥��', '10003920_0_0_18760','width:438px')
      +specBtn()(class='modal-'+ itemName)
    // 1�Ĥ�ʬ��λ 
//================== trsp ==================
```





https://github.com/tohshige/test/blob/master/rcart2/index.html#L120,L153

```
�嵭�� ���쥯�ȤΡ�name= ��ʬ��ItemID�Ǥ����ʲ��Τ褦�˥������������'_'�դ��Ƕ��ڤäƻ��ꤹ��� ?
����٥�ȥ�ID�ȥ���٥�ȥ�ե饰�Ȥ��Ƽ��̤���褦�ɲ��ѹ� ?
itemid_inventoryid_inventoryflg_itemPrice ?
*�����˹�פ���뤿�ᡢitemPrice���ɲ�
�㡡���󥸥���ե��å� �ԥ����С� ?
name=10000475_1206
```

## ���顼�̤ǥ����Ȥ�����롢���ʤ���ꤹ��  
```html
<select name="10003534_0_0_1000" >
ñ��1000�ߤξ��ʡ�������_10000���ɵ�
<select name="10000470_2458_2_10000">
����٥�ȥ�ID���ʤ�����0����ꡣ������_10000���ɵ�
<select name="10000470_0_0_10000">

```
## �����å��ܥå��������ϸ��꥿����select �Τ��Ȥ˰ʲ��Υ�����
https://github.com/tohshige/test/blob/master/rcart2/index.html#L143

```html
<input type="checkbox" name="chk" value="1" >
  name ���Ѥ���ȹ�פη׻����ʤ��ʤ�ޤ���
```


### HTML�Ǥλ�����
![��](https://user-images.githubusercontent.com/15937579/31762250-a0ddc32a-b4f5-11e7-9e5a-ee3a3ae73e8c.png)

#### �㡡�������㤤������ID�����ʻ���
```html
���󥰥��
        <select  name="10003918_0_0_15960" >
          <input type="checkbox" name="chk" value="1" >
            �㤤ʪ�������ɲä���
���ߥ��֥��
        <select name="10003919_0_0_17220" >
          <input type="checkbox" name="chk" value="1" >
            �㤤ʪ�������ɲä���
���֥��
        <select name="10003920_0_0_18760" >
          <input type="checkbox" name="chk" value="1" >
            �㤤ʪ�������ɲä���
```

#### �㡡���㤤 ����IDƱ��������٥�ȥ�ID���㤦
```html
�ԥ󥯤�
        <select class="ui right big label" name="10003928_8862_2_5800" >
          <input type="checkbox" name="chk" value="1" >
            �㤤ʪ�������ɲä���

�֥饦���
        <select class="ui right big label" name="10003928_8863_2_5800" >
          <input type="checkbox" name="chk" value="1" >
            �㤤ʪ�������ɲä���

```
#### ����٥�ȥ�ID�������ξ��
���ʥڡ�����HTML�������ޤ줤�Ƥ���
![image](https://user-images.githubusercontent.com/15937579/31806282-aeba9aa2-b5a1-11e7-9eca-2039a4b5afe7.png)


## �Τ�HTML����ɽ���ˤ��Ƥ�����ʤΤǡ�ɬ�פʤ���к����
https://github.com/tohshige/test/blob/master/rcart2/index.html#L273
- ����ʹߤ�Хå������Ǥ�����ʤ�

## �⡼����
https://github.com/tohshige/test/blob/master/rcart2/modal.html#L7
