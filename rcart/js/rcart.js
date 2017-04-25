// Shift-JIS

// href 無効
$(function(){
	$('a.disable').click(function(){
		return false;
	})
});
$( "select" ).attr( "disabled" ,"disabled");

//jquery ajax form.serialize

$("#allDummy").on('change',function() {
//get all form value
var $form = $('#allform');
var query = $form.serialize();
console.log(query);
var param = $form.serializeArray();
console.log(param);

console.log(query);// => "mytext=sa
//選択したvalue値を変数に格納
    var val = $("#cart_122").val();
    console.log(val);
    //選択したvalue値をp要素に出力
    $('#sel').text(val);
  $('#result1').empty();
$('#result').empty();
$.ajax({
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=321072&itemid=10000051&units=1&device=pc&userid=itempage',
		success: function(result) {
    alltext=result ;//copy
       alltext=JSON.stringify(result);//to string
       $('#result').text(alltext);
//       json = JSON.parse(result);//divide
       json = $.parseJSON(alltext);
       $('#result1').text(json.dialogTitle + json.resultMessage);
		}
    });
});


$("#abc").click(function() {
$('#result1').empty();
$('#result').empty();
$.ajax({
    method: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    url: 'https://direct.step.rakuten.co.jp/rms/mall/cartAdd/?shopid=321072&itemid=10000051&units=1&device=pc&userid=itempage',
		success: function(result) {
    alltext=result ;//copy
       alltext=JSON.stringify(result);//to string
       $('#result').text(alltext);
//       json = JSON.parse(result);//divide
       json = $.parseJSON(alltext);
       $('#result1').text(json.dialogTitle + json.resultMessage);
		}
    });
});


// <script>
//全フィールドを走査して表示。
  function showValues() {
    var fields = $( ":input" ).serializeArray();
    var select_flg="";
    $( "#result1" ).empty();
    $('.ui.sidebar').sidebar('toggle');

    jQuery.each( fields, function( i, field ) {
      if(field.value=="数量"){
         return true;  // continue の代わりskipする
      }
      // 前方一致のときの処理
      if(!field.name.indexOf('radio') && field.value !== ""){
        $( "#result1" ).append( field.name + " " );
        $( "#reset_radio" ).removeClass( "disabled");
        $("select").removeAttr("disabled");//選び直すボタン ON
        var select_flg = "on";
      }
      $( "#result1" ).append( field.name + " " );
      $( "#result1" ).append( field.value + " " );
      $( "#results_all" ).append( field.name + " " );
      $( "#results_all" ).append( field.value + " " );
    });
    if (select_flg == "on"){
      // $("select").removeAttr("disabled");
    }else{
      // $("select").attr("disabled", "disabled");
    }

  }
function reset_radio() {
  // $("radio").attr("checked",false);
  var res = confirm("マットを選び直しますか？");
  if( res == true ) {
     // OKなら移動
     $("input[type='radio']").attr("checked", false);
     $( "#reset_radio" ).attr( "disabled",false);
     $( "select" ).attr( "disabled" ,false);
  }
  else {
     // キャンセルならダイアログ表示
  }
}
//radio select が変化するたびに ShowValue実行
  $( ":checkbox, :radio" ).click( showValues );
  $( "select" ).change( showValues );
  $( "#reset_radio" ).click( reset_radio );

  showValues();
// </script>
