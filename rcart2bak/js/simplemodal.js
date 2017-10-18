/*----------------------------------------
Name: simplemodal.js
Date Created:2011/07/15 [t.sato]
　　 Updated:2011/07/15 [t.sato]
Last Updated:2011/11/08 [9937]
----------------------------------------*/

/* 静的モーダル */

$(function () {

	//プレミアム
	$('.modal-premium').click(function (e) {
		$('#modal-premium').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});


	//ページ内キャンペーン
	$('.modal-cp').click(function (e) {
		$('#modal-cp').modal({
			minHeight:300,
			overlayClose:true
	});
		return false;
	});

	
	//エクセレント
	$('.modal-excellent').click(function (e) {
		$('#modal-excellent').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});
	
	//cero〈セロ〉
	$('.modal-cero').click(function (e) {
		$('#modal-cero').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});
	
	//ネオフィール
	$('.modal-neofeel').click(function (e) {
		$('#modal-neofeel').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});

	//コンフォート
	$('.modal-comfort').click(function (e) {
		$('#modal-comfort').modal({
			minHeight:420,
			overlayClose:true
	});
		return false;
	});

	//エンジェルフィットピロ―
	$('.modal-angel').click(function (e) {
		$('#modal-angel').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});
	
	//リッチフィットピロ―
	$('.modal-richfit').click(function (e) {
		$('#modal-richfit').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});

	//ウォッシャブルフィットピロ―
	$('.modal-washablefit').click(function (e) {
		$('#modal-washablefit').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});

	//敷きパッド
	$('.modal-shiki').click(function (e) {
		$('#modal-shiki').modal({
			overlayClose:true
	});
		return false;
	});

	//ボックスカバー
	$('.modal-standard').click(function (e) {
		$('#modal-standard').modal({
			minHeight:370,
			overlayClose:true
	});
		return false;
	});

	//エアリスリープ
	$('.modal-aero').click(function (e) {
		$('#modal-aero').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});

	//ネックフィットピロ―
	$('.modal-neckfit').click(function (e) {
		$('#modal-neckfit').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});
	
	//cero〈セロ〉ピロ―
	$('.modal-ceropillow').click(function (e) {
		$('#modal-ceropillow').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});
	
	//ネオフィールフィットピロ―
	$('.modal-neofeelpillow').click(function (e) {
		$('#modal-neofeelpillow').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});

	//ウィルフィットピロ―
	$('.modal-wellfitpillow').click(function (e) {
		$('#modal-wellfitpillow').modal({
			minHeight:500,
			overlayClose:true
	});
		return false;
	});

});


/* 動画再生 */
jQuery(function ($) {
	$('a.icon_video, .movieScript a').click(function (e) {
		var src = $(this).attr("href");
		$.modal('<div class="btnClose" style="width:648px;margin:5px auto 0 auto;"><a title="close" class="simplemodal-close" href="#"><img alt="" src="/img/common/btn_close_01.gif"></a></div><iframe src="' + src + '" height="520" width="700" frameborder="0" scrolling="no" style="border:0;overflow:hidden;padding:0;">', {
			closeHTML:"",
			containerCss:{
				backgroundColor:"#fff",
				height:550,
				padding:10,
				width:700
			},
			overlayClose:true
		});
		return false;
	});
	
});









