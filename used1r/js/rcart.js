/* jshint indent:false, undef: true, unused: true, esversion: 6, jquery: false ,  globalstrict: false */
/* globals $:false */

// Shift-JIS
// 'use strict'

// originalPrice = 「割引後の金額」÷「割引率」×１００
// 1000円の物を40%引きで購入したら、支払う金額は600円ですが、ここで割引前(1000円)の金額を出すには
// (600 / (100 - 40)) * 100
// 16200 / (1 - 0.33)
$('html, body').animate({ scrollTop: $('#target').scrollTop() }, 2000)

// SmoothScroll
$("a[href='#btnBuy']").click(function () {
  $('html, body').animate({
    scrollTop: $(document).height()
  }, 'slow')
  return false
})

$("[id$='go_cart']").click(function () {
  // $("html,body").animate({
  //   // scrollTop: $('#go_cart_view').offset().top
  // });

  // dimmer semantic ui
  $('#footerFloatingMenu').dimmer('show')
  return false
})

// set all selectbox default value セレクトボックスを決め打ちにする
// $('select').val(1) // value = 1
// $('select').val(0) // value = 0

// $("#pageTop").click(function() {
//   $("html, body").animate({ scrollTop: $(document).height() }, "slow");
//   return false;
// });

$(function () {
  var topBtn = $('#pageTop')
  topBtn.hide()
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn()
    } else {
      topBtn.fadeOut()
    }
  })
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 1000)
    return false
  })
})

// href 無効
$(function () {
  $('a.disable').click(function () {
    return false
  })
})
// $("select").attr("disabled", "disabled");

/* shopjapan
shop_bid=199614
trce-s
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000070&units=1&device=pc&userid=itempage
cero
s  10000729
sd 10000730
d  10000731

cero pillow 10002534
wellfit 10002532

アイボリー：TRSPSMSI
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1&inventory_id=2458&inventory_flag=2

ピンク：TRSPSMSP
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1&inventory_id=2459&inventory_flag=2

ブルー:TRSPSMSB
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1&inventory_id=2460&inventory_flag=2

inventry_id なしだと Error
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1

エンジェルフィット ピローカバー
10000475
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000475&units=1&inventory_id=1206
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000475&units=1&inventory_id=1207
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000475&units=1&inventory_id=1208

*/
function addCart (itemid, units) {
  var shopId = '199614' // shopjapan id
  var resArray = itemid.split('_')
  var inventoryid = ''
  var inventoryflg = ''
  if (resArray[1]) {
    itemid = resArray[0]
    inventoryid = resArray[1]
    if (resArray[2]) {
      inventoryflg = resArray[2]
    }
    if (resArray[3]) {
      var price = resArray[3]
      console.log(price)
    }
  }
  // confirmCart();

  $.ajax({
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    async: false,
    //   url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + '',
    url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shopId + '&itemid=' + itemid + '&units=' + units + '&inventory_id=' + inventoryid + '&inventory_flg=' + inventoryflg + '',
    success: function (result) {
      var alltext = JSON.stringify(result) // to string
      // console.log(alltext);
      var json = $.parseJSON(alltext)
      console.log(json)
      var message = 'itemid:' + itemid + ' units:' + units + ' ' + json.dialogTitle + json.resultMessage
      console.log(message)
      $('#result1').append(message + '\n')
    },
    error: function (result) {
      var alltext = JSON.stringify(result) // to string
      console.log(alltext)
      // return result;
    }
  })
}

// function addCart1 (itemid, units) {
//   var shop_bid = '199614' // shopjapan id
//   var url = 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + ''

//   var jqxhr = $.get(url, function () {
//     console.log('success')
//   })
//     .done(function () {
//       console.log('second success')
//     })
//     .fail(function () {
//       console.log('error')
//     })
//     .always(function () {
//       console.log('finished')
//     })
// }

// 全フィールドを走査して表示。
function showValues (onOff) {
  // if (onOff === "on") {
  //     confirmCart();
  // }

  // var goAddCart = goAddCart || false;
  var fields = $(':input').serializeArray()
  console.log(fields)
  var fieldsform = $('form').serializeArray()
  console.log(fieldsform)
  // flgArray = new Array();
  var flgArray = []   // array
  var allCount = 0    // selected item count
  var priceAll = 0    // 合計金額
  var discountAll = 0 // 割引率 から割引額を求める
  $.each(fields, function (i, field) {
    if (fields.length === i && onOff === 'on') {
      window.alert('finish ' + allCount)
    }
    console.log(i)
    console.log(fields.length)
    // var radioFlg = '' // mat
    // var selectFlg = '' // option
    if (field.value === '数量') {
      return true // continue の代わりskipする
    }
    // radio 前方一致のときの処理
    if (!field.name.indexOf('radio') && field.value !== '') {
      flgArray.radioFlg = 'on'
      // $("#result1").append(field.name + " ");
      // addCart(itemid,units);
      if (onOff === 'on') {
        allCount++
        setTimeout(function () {
          var units = 1
          addCart(field.value, units) // order
        }, i * 100)
      }
    }
    var chkBox = fields[i + 1] // すぐ隣のcheckbox がチェックされているか
    // select option > cart 前方一致のときの処理
    var resArray = ''
    var price = 0
    var discount = 0 // % percent
    var originalPrice = 0 // for TEIKA
    var discountPrice = 0 // originalPrice - price
    if (!field.name.indexOf('1000') && field.value !== '') {
      flgArray.selectFlg = 'on'
      resArray = field.name.split('_')
      price = Number(resArray[3])
      // checked
      if (chkBox) {
        if (chkBox.name === 'chk') {
          console.log(chkBox.name)
          priceAll += price * Number(field.value) // unit number
          if (resArray[4]) { // discount 割引率が指定されていたら
            // 33% など割引額、元値を計算して差額を加算 in discount and price : out discountPrice
            discount = resArray[4]
            originalPrice = price / (1 - (discount / 100))
            discountPrice = originalPrice - price
            discountPrice = discountPrice * Number(field.value)
            // 切り上げ
            discountPrice = Math.ceil(discountPrice)
            // 切り捨て
            // discountPrice = Math.floor(discountPrice)
            discountAll += discountPrice
            console.log('discountAll ' + discountAll)
          }
          if (onOff === 'on') {
            allCount++
            setTimeout(function () {
              addCart(field.name, field.value) // order
            }, 1000 + i * 100)
          }
        }
      }
      console.log(priceAll)
      priceCal(priceAll) // 残高の計算、要素の書き換え
      priceCalDiscount(discountAll) // 残高の計算、要素の書き換え
    } // calc select

    // ver2 select option > cart 前方一致のときの処理
    if (!field.name.indexOf('ver2') && field.value !== '0') {
      flgArray.selectFlg = 'on'
      resArray = field.value.split('_')
      price = Number(resArray[3])
      // checked
      // chkBox.name = 'chk' // checkBox なしでも有効にする
      if (chkBox) {
        if (chkBox.name === 'chk') {
          console.log(chkBox.name)
      //  priceAll += price * Number(field.value) // unit number
          priceAll += price * 1 // unit number
          if (resArray[4]) { // discount 割引率が指定されていたら
            // 33% など割引額、元値を計算して差額を加算 in discount and price : out discountPrice
            var itemid = resArray[0]
            discount = resArray[4]
            originalPrice = price / (1 - (discount / 100))
            discountPrice = originalPrice - price
        //  discountPrice = discountPrice * Number(field.value)
            discountPrice = discountPrice * 1
            // 切り上げ
            discountPrice = Math.ceil(discountPrice)
            // 切り捨て
            // discountPrice = Math.floor(discountPrice)
            discountAll += discountPrice
            console.log('discountAll ' + discountAll)
          }
          if (onOff === 'on') {
            allCount++
            setTimeout(function () {
              addCart(itemid, 1) // order
            }, 1000 + i * 100)
          }
        }
      }
      console.log(priceAll)
      priceCal(priceAll) // 残高の計算、要素の書き換え
      priceCalDiscount(discountAll) // 残高の計算、要素の書き換え
    } // calc select
  }) // each({})
  if (flgArray.radioFlg === 'on') { // Each外部に出せない！
    $('select').removeAttr('disabled') // Select hyouji
    $('#reset_radio').removeClass('disabled') // 選び直すボタン 表示
    $('#bottomCart').removeClass('displayNone') // 選び直すボタン 表示
  }
  if (flgArray.radioFlg === 'on' || flgArray.selectFlg === 'on') {
    // $("#go_cart").removeClass("disabled");//購入ボタン 表示
    $("[id$='go_cart']").removeClass('disabled') // 購入ボタン 表示
  }
  if (onOff === 'on') {
    // return confirmCart("カゴ確認ページへ進む");
    return true
    // if(!confirmCart("カゴ確認ページへ進む")){
    //     return;
    // }
    // setTimeout(function(){
    //  location.href ='https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
    // },3000);
  }
  // reset kounyu flg
  onOff = ''
}

function priceCal (priceAll) {
  $('#priceAll').text(priceAll)
  var priceTarget = $('#priceTarget').text()
  var priceRemain = priceTarget - priceAll
  if (priceRemain > 0) {
    $('#priceRemain').text(priceRemain)
    $('#couponGet').addClass('displayNone') // 目標OFF
    $('#coupon').removeClass('displayNone') // クーボンボタンON
  } else {
    $('#couponGet').removeClass('displayNone') // 目標ON
    $('#coupon').addClass('displayNone') // クーボンボタンOFF
  }

  $('#priceAll , #discountAll').fadeOut(500, function () {
    $(this).fadeIn(500)
  })

  $('#footerFloatingMenu').fadeIn()
} // priceCal()

function priceCalDiscount (discountAll) {
  $('#discountAll').text(discountAll)
  // var priceTarget = $('#priceTarget').text()
  // var priceRemain = priceTarget - priceAll
  // if (priceRemain > 0) {
  //   $('#priceRemain').text(priceRemain)
  //   $('#couponGet').addClass('displayNone') // 目標OFF
  //   $('#coupon').removeClass('displayNone') // クーボンボタンON
  // } else {
  //   $('#couponGet').removeClass('displayNone') // 目標ON
  //   $('#coupon').addClass('displayNone') // クーボンボタンOFF
  // }

  $('#discountAll').fadeOut(500, function () {
    $(this).fadeIn(500)
  })

  $('#footerFloatingMenu').fadeIn()
} // priceCal()

function confirmCart (message) {
  if (!message) {
    message = 'ご選択された商品を買い物かごに追加しますか？'
  }
  var res = window.confirm(message)
  if (res === true) {
    return true
  } else {
    return false
  }
}
$('#confirm_cart').click(confirmCart) // not use

function resetRadio () {
  // $("radio").attr("checked",false);
  var res = window.confirm('マットを選び直しますか？')
  if (res === true) {
    // OKなら移動
    $("input[type='radio']").attr('checked', false)
    $('#reset_radio').attr('disabled', false)
    $('select').attr('disabled', true)
    // $("#go_cart").attr("disabled", false);
    $('#go_cart').addClass('disabled')
    window.location.reload()
  } else {
    // キャンセルならダイアログ表示
    return false
  }
}
// radio select が変化するたびに ShowValue実行
$(':checkbox, :radio').click(showValues)
$('select').change(showValues)
$('#reset_radio').click(resetRadio)
// $("#addCartkuroko").click(addCartkuroko);

// one item add cart
// $("#addCartSJ").click(addCart(itemid,units));

// $("#addCartSJ").click(showValues('on'));
// all seek add cart
// $("#go_cart").click(showValues('on'));

// $("#go_cart").on('click',function(){
$("[id$='go_cart']").on('click', function () {
  // if(!confirmCart("ご選択された商品を買い物かごに追加しますか？")){
  //     return;
  // }
  // showValues('on');
  if (!showValues('on')) {
    return
  }
  // alert('ご選択された商品を買い物かごに追加いたします。\n購入された商品は「カゴの中身を確認する」ボタンから確認いただけます。');
  setInterval(function () {
    $('.ui.text.loader').fadeOut(900, function () {
      $(this).fadeIn(600)
    })
  }, 1000)
  // 1秒後
  // setTimeout(function(){
  //        location.href ='https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
  // },8000);
  $('#loader').addClass('active')

  setTimeout(function () {
    $('#go_cart_view').removeClass('disabled')
    $('#loader').removeClass('active')
    // window.open("https://basket.step.rakuten.co.jp/rms/mall/bs/cart/"); //popup blockで動作しない。
    window.location.href = 'https://basket.step.rakuten.co.jp/rms/mall/bs/cart/'
  }, 6000)
})

// showValues();

// </script>
