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
// $('select').val(0);//1�Ԗ�


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


// href ����
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


�A�C�{���[�FTRSPSMSI	 
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1&inventory_id=2458&inventory_flag=2

�s���N�FTRSPSMSP	 
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1&inventory_id=2459&inventory_flag=2

�u���[�FTRSPSMSB	 
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1&inventory_id=2460&inventory_flag=2

inventry_id �Ȃ����� Error
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000470&units=1

�G���W�F���t�B�b�g �s���[�J�o�[
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


//�S�t�B�[���h�𑖍����ĕ\���B
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
  var priceAll = 0; //���v���z
  $.each(fields, function (i, field) {
    if (fields.length == i && on_off == "on") {
      alert("finish " + allCount);
    }
    console.log(i);
    console.log(fields.length);
    var radioFlg = ""; //mat
    var selectFlg = ""; //option
    if (field.value == "����") {
      return true; // continue �̑���skip����
    }
    // radio �O����v�̂Ƃ��̏���
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
    var chkBox = fields[i + 1]; //�����ׂ�checkbox ���`�F�b�N����Ă��邩
    // select option > cart �O����v�̂Ƃ��̏���
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
      priceCal(priceAll); // �c���̌v�Z�A�v�f�̏�������
    }
  });
  if (flgArray.radioFlg === "on") { //Each�O���ɏo���Ȃ��I
    $("select").removeAttr("disabled"); //Select hyouji
    $("#reset_radio").removeClass("disabled"); //�I�ђ����{�^�� �\��
    $("#bottomCart").removeClass("displayNone"); //�I�ђ����{�^�� �\��
  }
  if (flgArray.radioFlg === "on" || flgArray.selectFlg === "on") {
    // $("#go_cart").removeClass("disabled");//�w���{�^�� �\��
    $("[id$='go_cart']").removeClass("disabled"); //�w���{�^�� �\��
  }
  if (on_off === "on") {
    // return confirm_cart("�J�S�m�F�y�[�W�֐i��");
    return true;
    // if(!confirm_cart("�J�S�m�F�y�[�W�֐i��")){
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
    $("#couponGet").addClass("displayNone"); //�ڕWOFF
    $("#coupon").removeClass("displayNone"); //�N�[�{���{�^��ON
  } else {
    $("#couponGet").removeClass("displayNone"); //�ڕWON
    $("#coupon").addClass("displayNone"); //�N�[�{���{�^��OFF
  }

  $('#priceAll').fadeOut(500, function () {
    $(this).fadeIn(500);
  });

  $('#footerFloatingMenu').fadeIn();

}

function confirm_cart(message) {
  if (!message) {
    message = "���I�����ꂽ���i�𔃂��������ɒǉ����܂����H";
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
  var res = confirm("�}�b�g��I�ђ����܂����H");
  if (res == true) {
    // OK�Ȃ�ړ�
    $("input[type='radio']").attr("checked", false);
    $("#reset_radio").attr("disabled", false);
    $("select").attr("disabled", true);
    // $("#go_cart").attr("disabled", false);
    $("#go_cart").addClass("disabled");
    location.reload();

  } else {
    // �L�����Z���Ȃ�_�C�A���O�\��
  }
}
//radio select ���ω����邽�т� ShowValue���s
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
  // if(!confirm_cart("���I�����ꂽ���i�𔃂��������ɒǉ����܂����H")){
  //     return;
  // }
  // showValues('on');
  if (!showValues('on')) {
    return;
  }
  // alert('���I�����ꂽ���i�𔃂��������ɒǉ��������܂��B\n�w�����ꂽ���i�́u�J�S�̒��g���m�F����v�{�^������m�F���������܂��B');
  setInterval(function () {
    $('.ui.text.loader').fadeOut(900, function () {
      $(this).fadeIn(600);
    });
  }, 1000);
  //1�b��
  // setTimeout(function(){
  //        location.href ='https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
  // },8000);
  $("#loader").addClass("active");

  setTimeout(function () {
    $("#go_cart_view").removeClass("disabled");
    $("#loader").removeClass("active");
    // window.open("https://basket.step.rakuten.co.jp/rms/mall/bs/cart/"); //popup block�œ��삵�Ȃ��B
    location.href = 'https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
  }, 6000);
});


// showValues();


// </script>