// Shift-JIS

// href 無効
$(function() {
    $('a.disable').click(function() {
        return false;
    })
});
//$("select").attr("disabled", "disabled");

//jquery ajax form.serialize

// $("#allDummy").on('change', function() {
//     //get all form value
//     var $form = $('#allform');
//     var query = $form.serialize();
//     console.log(query);
//     var param = $form.serializeArray();
//     console.log(param);

//     console.log(query); // => "mytext=sa
//     //選択したvalue値を変数に格納
//     var val = $("#cart_122").val();
//     console.log(val);
//     //選択したvalue値をp要素に出力
//     $('#sel').text(val);
//     $('#result1').empty();
//     $('#result').empty();
//     $.ajax({
//         method: 'GET',
//         dataType: 'jsonp',
//         crossDomain: true,
//         url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=321072&itemid=10000051&units=1&device=pc&userid=itempage',
//         success: function(result) {
//             alltext = result; //copy
//             alltext = JSON.stringify(result); //to string
//             $('#result').text(alltext);
//             //       json = JSON.parse(result);//divide
//             json = $.parseJSON(alltext);
//             $('#result1').text(json.dialogTitle + json.resultMessage);
//         }
//     });
// });

/* shopjapan
shop_bid=199614
trce-s
https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=199614&itemid=10000070&units=1&device=pc&userid=itempage
cero
s  10000729
sd 10000730
d  10000731

*/
function addCart(itemid,units) {
    shop_bid='199614'; // shopjapan id

    $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid='+shop_bid+'&itemid='+itemid+'&units='+units+'&device=pc&userid=itempage',
        success: function(result) {
            alltext = JSON.stringify(result); //to string
            $('#result').append(alltext);
            json = $.parseJSON(alltext);
            console.log(json);
            $('#result1').append(json.dialogTitle + json.resultMessage);
        },
        error: function(result){
            alltext = JSON.stringify(result); //to string
            console.log(alltext);
            // return result;
        }
    });
}

function addCartkuroko() {
    $('#result1').empty();
    $('#result').empty();
    $.ajax({
        method: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=321072&itemid=10000051&units=1&device=pc&userid=itempage',
        success: function(result) {
            alltext = result; //copy
            alltext = JSON.stringify(result); //to string
            $('#result1').text(alltext);
            json = $.parseJSON(alltext);
            $('#result1').text(json.dialogTitle + json.resultMessage);
        }
    });
}


// <script>
//全フィールドを走査して表示。
function showValues(on_off) {
    // var goAddCart = goAddCart || false;
    var fields = $(":input").serializeArray();
    // new on_off = on_off;
    // fields.push(['on_off:'+on_off ]);
    // $("#result1").empty();
    $('.ui.sidebar').sidebar('toggle');
    flgArray = new Array();
    jQuery.each(fields, function(i, field) {
        var radioFlg ="";  //mat
        var selectFlg =""; //option
        if (field.value == "数量") {
            return true; // continue の代わりskipする
        }
        // radio 前方一致のときの処理
        if (!field.name.indexOf('radio') && field.value !== "" ) {
            flgArray['radioFlg']='on';
            $("#result1").append(field.name + " ");
            // addCart(itemid,units);
            if(on_off==="on"){
                addCart(field.value,units=1);
            }
        }
        // select option > cart 前方一致のときの処理
        if (!field.name.indexOf('1000') && field.value !== "" ) {
            flgArray['selectFlg']="on";
            $("#result1").append(field.name + " ");
            if(on_off==="on"){
                addCart(field.name,field.value);
            }
        }
        $("#result1").append(field.name + " ");
        $("#result1").append(field.value + " ");
        $("#results_all").append(field.name + " ");
        $("#results_all").append(field.value + " ");
    });
    if (flgArray['radioFlg']==="on" ) {//Each外部に出せない！
        $("select").removeAttr("disabled"); //Select hyouji
        $("#reset_radio").removeClass("disabled");//選び直すボタン 表示
    }
    if(flgArray['radioFlg']==="on" && flgArray['selectFlg']==="on") {
        $("#go_cart").removeClass("disabled");//購入ボタン 表示
    }

}

function reset_radio() {
    // $("radio").attr("checked",false);
    var res = confirm("マットを選び直しますか？");
    if (res == true) {
        // OKなら移動
        $("input[type='radio']").attr("checked", false);
        $("#reset_radio").attr("disabled", false);
        $("select").attr("disabled", false);
        // $("#go_cart").attr("disabled", false);
          $("#go_cart").addClass("disabled");
    } else {
        // キャンセルならダイアログ表示
    }
}
//radio select が変化するたびに ShowValue実行
$(":checkbox, :radio").click(showValues);
$("select").change(showValues);
$("#reset_radio").click(reset_radio);
$("#addCartkuroko").click(addCartkuroko);

// one item add cart
// $("#addCartSJ").click(addCart(itemid,units));
$("#addCartSJ").click(showValues('on'));

// all seek add cart
$("#go_cart").click(showValues('on'));

// showValues();


// </script>
