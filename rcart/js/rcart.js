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
  function showValues() {
    var fields = $( ":input" ).serializeArray();
    $( "#results" ).empty();
    jQuery.each( fields, function( i, field ) {
      $( "#results" ).append( field.value + " " );
      $( "#results" ).append( field.name + " " );
    });
  }

  $( ":checkbox, :radio" ).click( showValues );
  $( "select" ).change( showValues );
  showValues();
// </script>
