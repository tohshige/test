// JavaScript Document

////=================trsp01価格変更==================
$('#trsp01_size_select').change(function() {
 var trsp_size_val = $('#trsp01_size_select').val();

if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trsp_ua1_1804/#cart")){		
    $('.trsp01_price').css({backgroundImage:"url(./img/trsp01_price_s.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trsp_ua3_1804/#cart")){
    $('.trsp01_price').css({backgroundImage:"url(./img/trsp01_price_m.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trsp_ua4_1804/#cart")){
    $('.trsp01_price').css({backgroundImage:"url(./img/trsp01_price_w.jpg)"});
	}
});




////=================trsp02価格変更==================
$('#trsp02_size_select').change(function() {
 var trsp_size_val = $('#trsp02_size_select').val();

if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trsp-m_1806ss/#cart")){		
    $('.trsp02_price').css({backgroundImage:"url(./img/trsp02_price_m.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trsp-w_1806ss/#cart")){
    $('.trsp02_price').css({backgroundImage:"url(./img/trsp02_price_w.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trsp-q_1806ss/#cart")){
    $('.trsp02_price').css({backgroundImage:"url(./img/trsp02_price_q.jpg)"});
	}
});




////=================trcs価格変更==================
$('#trcs_size_select').change(function() {
 var trsp_size_val = $('#trcs_size_select').val();

if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_ss_1806ss/#cart")){		
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_ss.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_mm_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_mm.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_ww_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_ww.jpg)"});
	}
    else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_qq_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_qq.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_sm_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_sm.jpg)"});
	}
    else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_sw_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_sw.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_sq_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_sq.jpg)"});
	}
    else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_mw_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_mw.jpg)"});
	}else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_mq_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_mq.jpg)"});
	}
    else if(( trsp_size_val == "https://item.rakuten.co.jp/shopjapan/trcs_wq_1806ss/#cart")){
    $('.trcs_price').css({backgroundImage:"url(./img/trcs_price_wq.jpg)"});
	}
});