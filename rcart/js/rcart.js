// Shift-JIS

// href ����
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
//�I������value�l��ϐ��Ɋi�[
    var val = $("#cart_122").val();
    console.log(val);
    //�I������value�l��p�v�f�ɏo��
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
//�S�t�B�[���h�𑖍����ĕ\���B
  function showValues() {
    var fields = $( ":input" ).serializeArray();
    var select_flg="";
    $( "#result1" ).empty();
    $('.ui.sidebar').sidebar('toggle');

    jQuery.each( fields, function( i, field ) {
      if(field.value=="����"){
         return true;  // continue �̑���skip����
      }
      // �O����v�̂Ƃ��̏���
      if(!field.name.indexOf('radio') && field.value !== ""){
        $( "#result1" ).append( field.name + " " );
        $( "#reset_radio" ).removeClass( "disabled");
        $("select").removeAttr("disabled");//�I�ђ����{�^�� ON
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
  var res = confirm("�}�b�g��I�ђ����܂����H");
  if( res == true ) {
     // OK�Ȃ�ړ�
     $("input[type='radio']").attr("checked", false);
     $( "#reset_radio" ).attr( "disabled",false);
     $( "select" ).attr( "disabled" ,false);
  }
  else {
     // �L�����Z���Ȃ�_�C�A���O�\��
  }
}
//radio select ���ω����邽�т� ShowValue���s
  $( ":checkbox, :radio" ).click( showValues );
  $( "select" ).change( showValues );
  $( "#reset_radio" ).click( reset_radio );

  showValues();
// </script>
