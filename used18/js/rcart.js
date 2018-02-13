// Shift-JIS
// 'use strict'

// SmoothScroll
$("a[href='#btnBuy']").click(function () {
    $("html, body").animate({
      scrollTop: $(document).height()
    }, "slow");
    return false;
});

$("[id$='go_cart']").click(function () {
  $("html,body").animate({
    scrollTop: $('#go_cart_view').offset().top
  });
  // dimmer semantic ui
  $('#footerFloatingMenu').dimmer('show');
  return false;
});

// set all selectbox default value
$("select").val(1); // 2banme
// $('select').val(0);//1番目


// $("#pageTop").click(function() {
//   $("html, body").animate({ scrollTop: $(document).height() }, "slow");
//   return false;
// });

$(function () {
  var topBtn = $('#pageTop');
  topBtn.hide();
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
});


// href 無効
$(function () {
  $('a.disable').click(function () {
    return false;
  });
});
//$("select").attr("disabled", "disabled");

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

ブルー：TRSPSMSB	 
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1&inventory_id=2460&inventory_flag=2

inventry_id なしだと Error
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1

エンジェルフィット ピローカバー
10000475
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000475&units=1&inventory_id=1206
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000475&units=1&inventory_id=1207
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000475&units=1&inventory_id=1208


*/
function addCart(itemid, units) {
  var shop_bid = '199614'; // shopjapan id
  var resArray = itemid.split("_");
  var inventoryid = "";
  var inventoryflg = "";
  if (resArray[1]) {
    itemid = resArray[0];
    inventoryid = resArray[1];
    if (resArray[2]) {
      inventoryflg = resArray[2];
    }
    if (resArray[3]) {
      price = resArray[3];
      console.log(price);
    }
  }
  // confirm_cart();

  $.ajax({
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    async: false,
    //   url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + '',
    url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + '&inventory_id=' + inventoryid + '&inventory_flg=' + inventoryflg + '',
    success: function (result) {
      var alltext = JSON.stringify(result); //to string
      // console.log(alltext);
      var json = $.parseJSON(alltext);
      console.log(json);
      var message = 'itemid:' + itemid + ' units:' + units + ' ' + json.dialogTitle + json.resultMessage;
      console.log(message);
      $('#result1').append(message + '\n');
    },
    error: function (result) {
      alltext = JSON.stringify(result); //to string
      console.log(alltext);
      // return result;
    }
  });
}

function addCart1(itemid, units) {
  var shop_bid = '199614'; // shopjapan id
  var url = 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + '';

  var jqxhr = $.get(url, function () {
      console.log("success");
    })
    .done(function () {
      console.log("second success");
    })
    .fail(function () {
      console.log("error");
    })
    .always(function () {
      console.log("finished");
    });
}


//全フィールドを走査して表示。
function showValues(on_off) {
  // if (on_off === "on") {
  //     confirm_cart();
  // }

  // var goAddCart = goAddCart || false;
  var fields = $(":input").serializeArray();
  console.log(fields);
  var fieldsform = $("form").serializeArray();
  console.log(fieldsform);
  // new on_off = on_off;
  // fields.push(['on_off:'+on_off ]);
  // $("#result1").empty();
  // $('.ui.sidebar').sidebar('toggle');
  // flgArray = new Array();
  flgArray = []; //array 
  var allCount = 0; //selected item count
  var priceAll = 0; //合計金額
  $.each(fields, function (i, field) {
    if (fields.length == i && on_off == "on") {
      alert("finish " + allCount);
    }
    console.log(i);
    console.log(fields.length);
    var radioFlg = ""; //mat
    var selectFlg = ""; //option
    if (field.value == "数量") {
      return true; // continue の代わりskipする
    }
    // radio 前方一致のときの処理
    if (!field.name.indexOf('radio') && field.value !== "") {
      flgArray.radioFlg = 'on';
      // $("#result1").append(field.name + " ");
      // addCart(itemid,units);
      if (on_off === "on") {
        allCount++;
        setTimeout(function () {
          addCart(field.value, units = 1); // order
        }, i * 100);
      }
    }
    var chkBox = fields[i + 1]; //すぐ隣のcheckbox がチェックされているか
    // select option > cart 前方一致のときの処理
    if (!field.name.indexOf('1000') && field.value !== "") {
      flgArray.selectFlg = "on";
      var resArray = field.name.split("_");
      var price = Number(resArray[3]);
      // checked 
      if (chkBox) {
        if (chkBox.name == 'chk') {
          console.log(chkBox.name);
          priceAll += price * Number(field.value);
          if (on_off === "on") {
            allCount++;
            setTimeout(function () {
              addCart(field.name, field.value); // order
            }, 1000 + i * 100);
          }
        }
      }
      console.log(priceAll);
      priceCal(priceAll); // 残高の計算、要素の書き換え
    }
  });
  if (flgArray.radioFlg === "on") { //Each外部に出せない！
    $("select").removeAttr("disabled"); //Select hyouji
    $("#reset_radio").removeClass("disabled"); //選び直すボタン 表示
    $("#bottomCart").removeClass("displayNone"); //選び直すボタン 表示
  }
  if (flgArray.radioFlg === "on" || flgArray.selectFlg === "on") {
    // $("#go_cart").removeClass("disabled");//購入ボタン 表示
    $("[id$='go_cart']").removeClass("disabled"); //購入ボタン 表示
  }
  if (on_off === "on") {
    // return confirm_cart("カゴ確認ページへ進む");
    return true;
    // if(!confirm_cart("カゴ確認ページへ進む")){
    //     return;
    // }
    // setTimeout(function(){
    //  location.href ='https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
    // },3000);
  }
  //reset kounyu flg
  on_off = "";

}

function priceCal(priceAll) {
  $("#priceAll").text(priceAll);
  var priceTarget = $("#priceTarget").text();
  var priceRemain = priceTarget - priceAll;
  if (priceRemain > 0) {
    $("#priceRemain").text(priceRemain);
    $("#couponGet").addClass("displayNone"); //目標OFF
    $("#coupon").removeClass("displayNone"); //クーボンボタンON
  } else {
    $("#couponGet").removeClass("displayNone"); //目標ON
    $("#coupon").addClass("displayNone"); //クーボンボタンOFF
  }

  $('#priceAll').fadeOut(500, function () {
    $(this).fadeIn(500);
  });

  $('#footerFloatingMenu').fadeIn();

}

function confirm_cart(message) {
  if (!message) {
    message = "ご選択された商品を買い物かごに追加しますか？";
  }
  var res = confirm(message);
  if (res == true) {
    return true;
  } else {
    return false;
    // return ;
  }
}


function reset_radio() {
  // $("radio").attr("checked",false);
  var res = confirm("マットを選び直しますか？");
  if (res == true) {
    // OKなら移動
    $("input[type='radio']").attr("checked", false);
    $("#reset_radio").attr("disabled", false);
    $("select").attr("disabled", true);
    // $("#go_cart").attr("disabled", false);
    $("#go_cart").addClass("disabled");
    location.reload();

  } else {
    // キャンセルならダイアログ表示
  }
}
//radio select が変化するたびに ShowValue実行
$(":checkbox, :radio").click(showValues);
$("select").change(showValues);
$("#reset_radio").click(reset_radio);
// $("#addCartkuroko").click(addCartkuroko);

// one item add cart
// $("#addCartSJ").click(addCart(itemid,units));

// $("#addCartSJ").click(showValues('on'));
// all seek add cart
// $("#go_cart").click(showValues('on'));

// $("#go_cart").on('click',function(){
$("[id$='go_cart']").on('click', function () {
  // if(!confirm_cart("ご選択された商品を買い物かごに追加しますか？")){
  //     return;
  // }
  // showValues('on');
  if (!showValues('on')) {
    return;
  }
  // alert('ご選択された商品を買い物かごに追加いたします。\n購入された商品は「カゴの中身を確認する」ボタンから確認いただけます。');
  setInterval(function () {
    $('.ui.text.loader').fadeOut(900, function () {
      $(this).fadeIn(600);
    });
  }, 1000);
  //1秒後
  // setTimeout(function(){
  //        location.href ='https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
  // },8000);
  $("#loader").addClass("active");

  setTimeout(function () {
    $("#go_cart_view").removeClass("disabled");
    $("#loader").removeClass("active");
    // window.open("https://basket.step.rakuten.co.jp/rms/mall/bs/cart/"); //popup blockで動作しない。
    location.href = 'https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
  }, 6000);
});


// showValues();


// </script>