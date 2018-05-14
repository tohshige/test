window.addEventListener('load', function() {
  /**
   * 実際にiframeを表示する幅を計算して設定
   * @type pushW {string} pushされた横幅
   * @type pushH {string} pushされた高さ
   * @type targetContents {string} 対象のiframe
   * @type stP {string} splitText
   */
  function iframeWrapWidth(pushW, pushH, targetContents, st) {
    // 挿入する場所の横幅を取得（親要素のpaddingを含めない横幅値）
    var w = window.getComputedStyle(targetContents.parentNode);
        w = w.width.replace('px', '');

    var styleParam = [];
        styleParam['width'] = pushW - (pushW - w) + 'px';

    // 横幅変更後のサイズから比率を計算して、高さを設定
    var h = pushH * Math.ceil(w / pushW);
    styleParam['height'] = h + 'px';

    var newStyle = '';
    for (var param in styleParam) {
      newStyle += param + st + styleParam[param] + ';';
    }

    return newStyle;
  }

  /**
   * iframeコンテンツのリサイズを反映
   * @returns int
   */
  function iframeSizing(e) {
    var splitText = ':';
    var iframeValue = e.data.split(splitText); // sample → targetId:height
    var iframeId = iframeValue[0];
    targetContents = document.getElementById(iframeId); // 対象iframe
    if (targetContents) {
      var height = iframeValue[1]; // 高さ
      var deviceWidth = window.innerWidth;
      // サイズに変更がなければ処理を抜ける
      if (targetContents.clientHeight == height && targetContents.clientWidth == deviceWidth) return false;
      // styleを保持
      var style = targetContents.getAttribute('style').split(';');
      var styleParam = [];
      style.forEach(function(val) {
        if (val == '') return false;
        var tmpVal = val.split(splitText);
        styleParam[tmpVal[0].trim()] = tmpVal[1].trim();
      });
      // styleの再成型
      var newStyle = '';
      // 挿入箇所の値で計算して設定
      newStyle = iframeWrapWidth(deviceWidth, height, targetContents, splitText);
      // iframeパラメータ再設定
      targetContents.setAttribute('style', newStyle);
    }
  }

  /**
   * iframeの読み込み先に最新日時パラメータを付与して、srcを設定
   * @returns int
   */
  function refreshIframe() {
    var $elementsList = document.getElementsByClassName('iframeResizeTarget');
    if ($elementsList.length > 0) {
      for (var i = 0; i < $elementsList.length; i++) {
        var target = $elementsList[i];
        var src = target.getAttribute('data-iframeResize-src');
        target.setAttribute('src', src + '?' + getTime());
      }
    }
  }

  /**
   * 現在日時取得
   * @returns int
   */
  function getTime() {
    var date = new Date();
    return date.getTime();
  }

  window.addEventListener('message', iframeSizing);
  window.addEventListener('load', refreshIframe());
});