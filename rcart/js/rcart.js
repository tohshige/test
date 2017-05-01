// Shift-JIS

// $(function(){
//   $('#btnBuy').click(function(){
//     var speed = 500;
//     var href= $(this).attr("href");
//     var target = $(href == "#" || href == "" ? 'html' : href);
//     var position = target.offset().top;
//     $("html, body").animate({scrollTop:position}, speed, "swing");
//     return false;
//   });
// });
$("a[href='#btnBuy']").click(function() {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  return false;
});

// href ����
$(function () {
    $('a.disable').click(function () {
        return false;
    })
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
*/
function addCart(itemid, units) {
    var shop_bid = '199614'; // shopjapan id
    // confirm_cart();

    $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        async: false,
     // url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + '&device=pc&userid=itempage',
        url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + '',
        success: function (result) {
            var alltext = JSON.stringify(result); //to string
            // console.log(alltext);
            var json = $.parseJSON(alltext);
            console.log(json);
            var message='itemid:'+itemid+' units:'+units+' '+json.dialogTitle + json.resultMessage;
            console.log(message);
            $('#result1').append(message+'\n');
        },
        error: function (result) {
            alltext = JSON.stringify(result); //to string
            console.log(alltext);
            // return result;
        }
    });
}

function addCart1(itemid,units){
var shop_bid = '199614'; // shopjapan id
var url= 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=' + shop_bid + '&itemid=' + itemid + '&units=' + units + '';

var jqxhr = $.get( url, function() {
        console.log( "success" );
    })
    .done(function() {
        console.log( "second success" );
    })
    .fail(function() {
        console.log( "error" );
    })
    .always(function() {
        console.log( "finished" );
    });
}


//�S�t�B�[���h�𑖍����ĕ\���B
function showValues(on_off) {
    // if (on_off === "on") {
    //     confirm_cart();
    // }

    // var goAddCart = goAddCart || false;
    var fields = $(":input").serializeArray();
    var fieldsform = $("form").serializeArray();
    // new on_off = on_off;
    // fields.push(['on_off:'+on_off ]);
    // $("#result1").empty();
    // $('.ui.sidebar').sidebar('toggle');
    flgArray = new Array();
    var allCount = 0; //selected item count
    $.each(fields, function (i, field) {
        if (fields.length == i && on_off == "on"){alert("finish " +allCount );}
        console.log(i);
        console.log(fields.length);
        var radioFlg = "";  //mat
        var selectFlg = ""; //option
        if (field.value == "����") {
            return true; // continue �̑���skip����
        }
        // radio �O����v�̂Ƃ��̏���
        if (!field.name.indexOf('radio') && field.value !== "") {
            flgArray['radioFlg'] = 'on';
            // $("#result1").append(field.name + " ");
            // addCart(itemid,units);
            if (on_off === "on") {
                allCount++;
                setTimeout(function(){
                    addCart(field.value, units = 1);// order
                },i*100);
            }
        }
        // select option > cart �O����v�̂Ƃ��̏���
        if (!field.name.indexOf('1000') && field.value !== "") {
            flgArray['selectFlg'] = "on";
            // $("#result1").append(field.name + " ");
            if (on_off === "on") {
                allCount++;
                setTimeout(function(){
                    addCart(field.name, field.value);// order
                },1000+i*100);
            }
        }
    });
    if (flgArray['radioFlg'] === "on") {//Each�O���ɏo���Ȃ��I
        $("select").removeAttr("disabled"); //Select hyouji
        $("#reset_radio").removeClass("disabled");//�I�ђ����{�^�� �\��
    }
    if (flgArray['radioFlg'] === "on" || flgArray['selectFlg'] === "on") {
        $("#go_cart").removeClass("disabled");//�w���{�^�� �\��
    }
    if (on_off === "on") {
        confirm_cart("�J�S�m�F�y�[�W�֐i��");
        // setTimeout(function(){
            // location.href ='https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
        // },3000);
    }
    //reset kounyu flg
    on_off = "";

}

function confirm_cart(message) {
    if(!message){message="���I�����ꂽ���i�𔃂��������ɒǉ����܂����H";}
    var res = confirm(message);
    if (res == true) {
        // return true;
    } else {
        return false;
    }
}


function reset_radio() {
    // $("radio").attr("checked",false);
    var res = confirm("�}�b�g��I�ђ����܂����H");
    if (res == true) {
        // OK�Ȃ�ړ�
        $("input[type='radio']").attr("checked", false);
        $("#reset_radio").attr("disabled", false);
        $("select").attr("disabled", false);
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

$("#go_cart").on('click',function(){
    showValues('on');
    // if (false=== confirm_cart('���I�����ꂽ���i���J�S�ɒǉ����܂����B\n�w�����ꂽ���i�J�S���m�F���܂����H')){return;};
    // if (false=== confirm_cart('���I�����ꂽ���i���J�S�ɒǉ����܂����B\n�w�����ꂽ���i�́u�J�S�m�F�v����m�F���������܂��B')){return;};
    alert('���I�����ꂽ���i���J�S�ɒǉ����܂����B\n�w�����ꂽ���i�́u�J�S�m�F�v����m�F���������܂��B');
    //1�b��
    // setTimeout(function(){
    //        location.href ='https://basket.step.rakuten.co.jp/rms/mall/bs/cart/';
    // },8000);
        $("#loader").addClass("active");
    
    setTimeout(function(){
        $("#go_cart_view").removeClass("disabled");
        $("#loader").removeClass("active");
    },8000);
});


// showValues();


// </script>
