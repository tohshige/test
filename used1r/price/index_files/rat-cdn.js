var RAL = RAL || {};
RAL.callQueue = RAL.callQueue || [];

var RAT = RAT || {};

(function () {
  "use strict";
  // local JSON polyfill
  var JSON = window.JSON;
  if (!JSON) {
    JSON = {};
    // jshint ignore:start
    JSON.parse=function(a,f){function g(a,b){var d=void 0,e,c=a[b];if(c&&"object"===typeof c)for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&(e=g(c,d),void 0!==e?c[d]=e:delete c[d]);return f.call(a,b,c)}var b;b=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;a=String(a);b.lastIndex=0;b.test(a)&&(a=a.replace(b,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));return/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
    "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))?(b=eval("("+a+")"),"function"===typeof f?g({"":b},""):b):null};
    // jshint ignore:end
  }

  var $ = (typeof window.jQuery === 'function') ? jQuery : undefined;

  // Utilities
  function trim(str) {
    return (str && str.replace(/^\s+|\s+$/g, ''));
  }
  function isType(o, type) {
    return (Object.prototype.toString.call(o) === '[object '+type+']');
  }
  function addListener(target, eventName, handler) {
    if (target.addEventListener) {
      target.addEventListener(eventName, handler, false);
    } else if (target.attachEvent) {
      target.attachEvent('on' + eventName, handler);
    }
  }
  function toInt(str) {
    var val = window.parseInt(str, 10);
    return (isNaN(val) ? undefined : val);
  }
  function toFloat(str) {
    var val = window.parseFloat(str);
    return (isNaN(val) ? undefined : val);
  }
  function toArray(str, convert) {
    var elements = [];
    if (str) {
      // Remove optional enclosing brackets
      elements = str.replace(/^\[|]$/g, '').split(',');
      for (var i = 0; i < elements.length; ++i) {
        elements[i] = trim(elements[i]);
        if (convert) {
          elements[i] = convert(elements[i]);
        }
      }
    }
    return elements;
  }
  function toIntArray(str) {
    return toArray(str, toInt);
  }
  function toFloatArray(str) {
    return toArray(str, toFloat);
  }
  function revertSingleQuoting(str) {
    return str.replace(/(\\?')|(")|(&apos;)|(&quot;)/g, function(match, singleQ, doubleQ, singleQHtml, doubleQHtml) {
      if (singleQ === "'") { return '"'; }
      if (singleQ === "\\'" || singleQHtml) { return "'"; }
      if (doubleQ || doubleQHtml) { return '\\"'; }
    });
  }
  function toJson(str) {
    var source;
    if (!isType(str, 'String')) {
      source = '';
    } else if (/^{?"/.test(str)) {
      source = str;
    } else { // Assume single quoting
      source = revertSingleQuoting(str);
    }
    source = source.replace(/^{?/, '{').replace(/}?$/, '}'); // complement brackets if missing
    try {
      return JSON.parse(source);
    } catch (e) {
      return {};
    }
  }
  function toJsonArray(str) {
    var source;
    if (!isType(str, 'String')) {
      source = '';
    } else if (/^\[{"/.test(str)) {
      source = str;
    } else { // Assume single quoting
      source = revertSingleQuoting(str);
    }
    source = source.replace(/^\[?/, '[').replace(/]?$/, ']'); // complement brackets if missing
    try {
      return JSON.parse(source);
    } catch (e) {
      return [];
    }
  }

  function parseEventConfig(attr) {
    var config = {};
    if (isType(attr, 'String')) {
      if (attr.charAt(0) === '{') {
        config = toJson(attr);
      } else {
        var events = attr.split(',');
        for (var i = 0, ln = events.length; i < ln; i++) {
          config[events[i]] = [];
        }
      }
    }
    return config;
  }

  // Generated from ratGeneric.idl, don't change these 2 lines
  var parameterDefinitions = {"ratCustomParameters":["cp","JSON"],"ratTestTargeting":["abtest_target","JSON"],"ratShopUrlList":["shopurllist","STRING_ARRAY"],"ratAdobeSiteSection":["assc","STRING"],"ratResultLayout":["reslayout","STRING"],"ratShopId":["shopid","STRING"],"ratItemCount":["ni","INT_ARRAY"],"ratOrderId":["order_id","STRING"],"ratCartState":["cart","INT"],"ratAccountId":["acc","INT"],"ratAffiliateId":["afid","INT"],"ratContentLanguage":["cntln","STRING"],"ratRequestResult":["reqc","STRING"],"ratCampaignCode":["cc","STRING"],"ratCheckout":["chkout","INT"],"ratCheckpoints":["chkpt","INT"],"ratGoalId":["gol","STRING"],"ratPageName":["pgn","STRING"],"ratSiteSection":["ssc","STRING"],"ratServiceType":["service","STRING"],"ratPageType":["pgt","STRING"],"ratPrice":["price","DOUBLE_ARRAY"],"ratCurrencyCode":["cycode","STRING"],"ratSearchQuery":["sq","STRING"],"ratExcludeQuery":["esq","STRING"],"ratOrAnd":["oa","STRING"],"ratServiceId":["aid","INT"],"ratItemTag":["itag","STRING_ARRAY"],"ratItemId":["itemid","STRING_ARRAY"],"ratRanCode":["rancode","STRING"],"ratGenre":["genre","STRING"],"ratItemGenre":["igenre","STRING_ARRAY"],"ratItemVariation":["variation","JSON_ARRAY"],"ratAbTest":["abtest","STRING"],"ratShopUrl":["shopurl","STRING"],"ratTag":["tag","STRING_ARRAY"],"ratProductCode":["prdctcd","STRING_ARRAY"],"ratRmsItemNumber":["ino","STRING_ARRAY"],"ratBooksGenre":["bgenre","STRING_ARRAY"],"ratPageLayout":["pgl","STRING"],"ratWidowbirdPattern":["wb_pattern","STRING"],"ratSphinxPattern":["sphinx_pattern","STRING"],"ratPhoenixPattern":["phoenix_pattern","STRING"],"ratShopGenre":["sgenre","STRING"],"ratRetryType":["srt","STRING"],"ratAdultFlag":["aflg","INT"],"ratCvEvent":["cv","JSON"],"ratCouponId":["couponid","STRING_ARRAY"],"ratOrderList":["order_list","STRING_ARRAY"],"ratTotalPrice":["total_price","DOUBLE_ARRAY"],"ratItemCountOrder":["ni_order","INT_ARRAY"],"ratIdfaCookie":["cka","STRING"]};
  var customParameterDefinitions = {"ratClickTarget":["clktgt","STRING"],"ratNotificationCount":["notification","INT"],"ratItemStockNumber":["istocknum","STRING_ARRAY"],"ratItemPoint":["ipoint","INT_ARRAY"],"ratItemReviewNumber":["irevnum","INT_ARRAY"],"ratItemSoldOutStatus":["soldout","INT_ARRAY"],"ratNumberOfImages":["nimg","INT"],"ratStoryAbTest":["storyab","STRING"],"ratStoryATestTerm":["aterm","STRING"],"ratStoryAbTestTerm":["abterm","STRING"],"ratEventDiscriminator":["edisc","INT"],"ratCouponKey":["couponkey","STRING"],"ratTotalResults":["totalresults","INT"],"ratResultsPageNumber":["rpgn","INT"],"ratSort":["sort","INT"],"ratHits":["hits","INT"],"ratToolbarId":["tbid","STRING"],"ratUserOs":["os","STRING"],"ratToolbarVersion":["tbver","STRING"],"ratFilterItemAvailable":["fa","INT"],"ratFilterFreeShipping":["fs","INT"],"ratRecMpt":["mpt","INT"],"ratRecMpn":["mpn","STRING"],"ratRecMpd":["mpd","INT"],"ratRecMpl":["mpl","STRING"],"ratRecMpe":["mpe","STRING"]};

  // Support previous non standard input tag naming
  var inputMapping = {
    alternative : ["ratItemTest", "ratIGenre", "ratITag", "ratShopItem", "ratOa", "ratItemPrice", "ratAFlg", "ratProductCd", "ratItemManageNo", "ratCustomField"],
    normalized : ["ratAbTest", "ratItemGenre", "ratItemTag", "ratItemId", "ratOrAnd", "ratPrice", "ratAdultFlag", "ratProductCode", "ratRmsItemNumber", "ratCustomParameters"]
  };
  var customInputMapping = {
      alternative : ["ratStoryABTerm", "ratStoryATerm", "ratAvailableFilter", "ratFreeShippingFilter", "ratIPoint", "ratIRevNum", "ratStockNum", "ratPageNum", "ratSoldOut", "ratStoryItemTest", "ratTotalresult", "ratTotalResult"],
      normalized : ["ratStoryAbTestTerm", "ratStoryATestTerm", "ratFilterItemAvailable", "ratFilterFreeShipping", "ratItemPoint", "ratItemReviewNumber", "ratItemStockNumber", "ratResultsPageNumber", "ratItemSoldOutStatus", "ratStoryAbTest", "ratTotalResults", "ratTotalResults"]
  };
  for (var i = 0; i < inputMapping.alternative.length; ++i) {
    if (!parameterDefinitions[inputMapping.alternative[i]]) {
      parameterDefinitions[inputMapping.alternative[i]] = parameterDefinitions[inputMapping.normalized[i]];
    }
  }
  for (i = 0; i < customInputMapping.alternative.length; ++i) {
    if (!customParameterDefinitions[customInputMapping.alternative[i]]) {
      customParameterDefinitions[customInputMapping.alternative[i]] = customParameterDefinitions[customInputMapping.normalized[i]];
    }
  }

  var SHORT_ID = 0, TYPE = 1;
  var typeConversion = {
    'INT' : toInt,
    'DOUBLE' : toFloat,
    'BOOLEAN_ARRAY' : toArray,
    'STRING_ARRAY' : toArray,
    'INT_ARRAY' : toIntArray,
    'DOUBLE_ARRAY' : toFloatArray,
    'JSON' : toJson,
    'JSON_ARRAY' : toJsonArray
  };

  function addByDefinition(key, value, parameterContainer, definitions) {
    if (definitions[key]) {
      var paramDef = definitions[key];
      var shortId = paramDef[SHORT_ID];
      var conversionFunction = typeConversion[ paramDef[TYPE] ];
      parameterContainer[shortId] = conversionFunction ? conversionFunction(value) : value;
      return true;
    }
    return false;
  }

  // Load core library
  var scriptEl = document.createElement('script');
  scriptEl.type = 'text/javascript';
  scriptEl.async = 'async';
  scriptEl.defer = 'defer';
  scriptEl.src = '//r.r10s.jp/com/rat/js/ral-1.0.21.js';
  var targetEl = document.getElementsByTagName('script')[0];
  targetEl.parentNode.insertBefore(scriptEl, targetEl);

  var customCookies = null;
  if (document.getElementById('ratCookie')) {
    customCookies = toJson(document.getElementById('ratCookie').value);
    RAL.callQueue.push(['setCookieNames', customCookies]);
  } else if (/\.thegrommet\.com$/.test(document.domain)) {
    customCookies = {"cks":"_mall_uuid","ckp":"grm"};
    RAL.callQueue.push(['setCookieNames', customCookies]);
  }

  var extCookies = {}, parameters = {}, customParameters = {}, hasCustomParameters = false;

  function parseInputTags() {
    var ratInput = [];
    var inputList = document.getElementsByName('rat');
    for (var i = 0; i < inputList.length; ++i) {
      ratInput.push(inputList[i]);
    }
    inputList = document.getElementById('ratForm') || [];
    for (i = 0; i < inputList.length; ++i) {
      ratInput.push(inputList[i]);
    }
    if (ratInput.length) {
      hasCustomParameters = false;
      for (i = 0; i < ratInput.length; ++i) {
        var paramId = trim(ratInput[i].id);
        var paramValue = trim(ratInput[i].value || ratInput[i].getAttribute('value'));
        if (!addByDefinition(paramId, paramValue, parameters, parameterDefinitions)) {
            hasCustomParameters = addByDefinition(paramId, paramValue, customParameters, customParameterDefinitions) || hasCustomParameters;
        }
      }
      if (parameters.cp !== undefined) {
        for (var key in parameters.cp) {
          customParameters[key] = parameters.cp[key];
        }
        delete parameters.cp;
        hasCustomParameters = true;
      }
    }
  }

  function trackPageview() {
    // Insert hook first so we don't overwrite anything
    if (isType(RAT.pvHook, 'Object')) {
      RAL.callQueue.push(['setParameters', RAT.pvHook]);
      RAT.pvHook = {};
    }

    // Computed parameters
    if (!parameters.pgn || !parameters.ssc) {
      var pathMatch = (document.location.href || '').match(/https?:\/\/[^\/$#?]+(\/[^$#?]+)?/);
      if (pathMatch) {
        if (!parameters.pgn) parameters.pgn = pathMatch[1] || 'top';
        if (!parameters.ssc) parameters.ssc = (pathMatch[1] && pathMatch[1].split('/')[1]) ? '/' + pathMatch[1].split('/')[1] : 'top';
      }
    }
    switch (parameters.acc) {
      case 6:
      case 447:
      case 1113:
      case 1112:
      case 1140:
      RAL.callQueue.push(['addReceiver', 'rat.rakuten.com']);
      break;
    }

    RAL.callQueue.push(['setParameters', parameters]);
    RAL.callQueue.push(['setParameters', extCookies]);
    if (hasCustomParameters) {
      RAL.callQueue.push(['setCustomParameters', customParameters]);
    }
    if ($) {
      var $ratElements = $('[data-ratId]');
      var pvCompids = [];
      $ratElements.each(function() {
        var $element = $(this);
        if (/\bpv\b/.test($element.attr('data-ratEvent'))) {
          pvCompids.push($element.attr('data-ratId'));
        }
      });
      if (pvCompids.length) {
        RAL.callQueue.push(['appendParameters',  {'compid' : pvCompids}]);
      }
    }

    RAL.callQueue.push(['setEvent', 'pv']);
  }

  RAT.addCustomEvent = function(evtData) {
    if (!isType(evtData, 'Object')) {
      return;
    }
    if (evtData.includeInput) {
      RAL.callQueue.push(["setParameters", parameters]);
    }
    RAL.callQueue.push(["setAccountId", evtData.accountId || parameters.acc]);
    RAL.callQueue.push(["setServiceId", evtData.serviceId || parameters.aid]);
    RAL.callQueue.push(["setPageType", parameters.pgt]);
    RAL.callQueue.push(["setPageName", parameters.pgn]);
    if (isType(evtData.pData, 'Object')) {
      var p = evtData.pData;
      if (p && isType(p.compid, 'Array') && !p.comptop && $) {
        p.comptop = [];
        for (var i = 0, len = p.compid.length; i < len; i++) {
          var $comp = $('[data-ratId='+p.compid+']');
          if ($comp.length > 0) {
            p.comptop.push($comp.offset().top);
          }
        }
      }
      RAL.callQueue.push(["setParameters", evtData.pData]);
    }
    if (isType(evtData.apData, 'Object')) {
      RAL.callQueue.push(["appendParameters", evtData.apData]);
    }
    if (isType(evtData.cpData, 'Object')) {
      var cp = evtData.cpData;
      for (var prop in cp) {
        if (cp.hasOwnProperty(prop)) {
          RAL.callQueue.push(["setCustomParameters", cp]);
          break;
        }
      }
    }
    if (isType(evtData.cvData, 'Object')) {
      RAL.callQueue.push(["setParameters", {'cv':evtData.cvData}]);
    }
    if (isType(evtData.options, 'Array')) {
      RAL.callQueue.push(['setOptions', evtData.options]);
    }
    RAL.callQueue.push(['setParameters', extCookies]);
    RAL.callQueue.push(["setEvent", evtData.eventType || "async"]);
  };

  // Deprecated, keep support for now
  RAT.callCustomRequest = function(id, data, accountId, serviceId) {
    var acc = accountId;
    var aid = serviceId;

    RAL.callQueue.push(['setAccountId', acc]);
    RAL.callQueue.push(['setServiceId', aid]);
    if (id) {
      RAL.callQueue.push(['setCustomParameters', {'id' : id}]);
    }
    if (data) {
      RAL.callQueue.push(['setCustomParameters', data]);
    }
    RAL.callQueue.push(['setEvent', 'async']);
  };
  RAT.callCostomRequest = RAT.callCustomRequest;

  function initPageview() {
    // Exclude gold iframes
    if (parameters.acc === 1 && parameters.aid === 5 && window !== window.parent) {
      return;
    }

    // Handle tracking for external domains
    if (/\.rakuten\.co\.jp$/.test(document.domain) || (customCookies !== null)) {
      trackPageview();
    } else {
      var receiveFlag = false;

      var addEvent = function(node, type, handler) {
        if (node.addEventListener) {
          node.addEventListener(type, handler, false);
        } else {
          node.attachEvent("on" + type, handler);
        }
      };
      var removeEvent = function(node, type, handler) {
          if (node.removeEventListener) {
            node.removeEventListener(type, handler, false);
          } else {
            node.detachEvent("on" + type, handler);
          }
      };

      var createIframe = function() {
        var parentHost = encodeURIComponent(location.protocol + '//' + location.hostname);
        var src = "//www.rakuten.co.jp/com/rat/plugin/external/ral-iframe-rakuten.co.jp.html?o-id=" + parentHost;
        var iframe = document.createElement('iframe');
        iframe.setAttribute('src', src);
        iframe.style.display = 'none';
        iframe.style.visibility = 'hidden';
        document.body.appendChild(iframe);
      };

      var checkStorage = function(key) {
        var hit = false;
        if (window.sessionStorage) {
          var value = sessionStorage.getItem(key);
          if (value) {
            try {
              extCookies = JSON.parse(value).data || {};
              hit = true;
            } catch (e) {}
          }
        }
        return hit;
      };
      var writeStorage = function(key, message) {
        if (window.sessionStorage) {
          try {
            sessionStorage.setItem(key, message);
            return true;
          } catch (e) {}
        }
        return false;
      };

      var getMessage = function(event) {
        if (/www\.rakuten\.co\.jp$/.test(event.origin)) {
          var message = event.data, response;
          if (typeof message === 'string') {
            try {
              response = JSON.parse(message) || {};
            } catch (e) { return; }
            if (response.type === 'ratCk') {
              extCookies = response.data || {};
              if (extCookies.cks && !extCookies.ckr) {
                extCookies.ckr = extCookies.cks;
              }
              trackPageview();
              clearTimeout(receiveFlag);
              writeStorage('ratCk', message);
              removeEvent(window, 'message', getMessage);
            }
          }
        }
      };

      if (checkStorage('ratCk')) {
        trackPageview();
      } else {
        addEvent(window, 'message', getMessage);
        createIframe();
        receiveFlag = setTimeout(function() {
          removeEvent(window, 'message', getMessage);
          trackPageview();
        }, 3000);
      }
    }
  }

  // Data attributes driven events
  if ($) {
    $(function() {
      var $win = $(window), $doc = $(document);
      /*
      jQuery.appear
      http://code.google.com/p/jquery-appear/
      Copyright (c) 2009 Michael Hixson
      Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
      */
      // jshint ignore:start
      (function(a){a.fn.appear=function(e,c){var d=a.extend({data:void 0,one:!0,ratio:0},c);return this.each(function(){var b=a(this);b.appeared=!1;if(e){var g=a(window),f=function(){if(b.is(":visible")){var a=g.scrollLeft(),e=a+g.width(),c=g.scrollTop(),f=c+g.height(),h=b.offset(),l=h.left,m=l+b.width(),h=h.top,n=h+b.height(),k=!isNaN(d.ratio)&&0<d.ratio&&1>=d.ratio?d.ratio:0,k=Math.max(1,k*b.width()*b.height()),a=Math.max(0,Math.min(e,m)-Math.max(a,l)),c=Math.max(0,Math.min(f,n)-Math.max(c,h));a*c>=k?
      b.appeared||b.trigger("appear",d.data):b.appeared=!1}else b.appeared=!1},c=function(){b.appeared=!0;if(d.one){g.unbind("scroll",f);var c=a.inArray(f,a.fn.appear.checks);0<=c&&a.fn.appear.checks.splice(c,1)}e.apply(this,arguments)};if(d.one)b.one("appear",d.data,c);else b.bind("appear",d.data,c);g.scroll(f);a.fn.appear.checks.push(f);f()}else b.trigger("appear",d.data)})};a.extend(a.fn.appear,{checks:[],timeout:null,checkAll:function(){var e=a.fn.appear.checks.length;if(0<e)for(;e--;)a.fn.appear.checks[e]()},
      run:function(){a.fn.appear.timeout&&clearTimeout(a.fn.appear.timeout);a.fn.appear.timeout=setTimeout(a.fn.appear.checkAll,20)}});a.each("append prepend after before attr removeAttr addClass removeClass toggleClass remove css show hide".split(" "),function(e,c){var d=a.fn[c];d&&(a.fn[c]=function(){var b=d.apply(this,arguments);a.fn.appear.run();return b})})})($);
      // jshint ignore:end

      function setTapClickListener(jqueryElem, handler) {
        var activeElement;
        var preventGhostClick = false;
        jqueryElem.bind('touchstart', function() {
          activeElement = this;
        });
        jqueryElem.bind('touchmove touchcancel', function() {
          activeElement = undefined;
        });
        jqueryElem.bind('touchend', function(event) {
          if (activeElement === this) {
            preventGhostClick = true;
            window.setTimeout(function() { preventGhostClick = false; }, 500);
            handler.call(this, event);
          } else {
            activeElement = undefined;
          }
        });
        jqueryElem.bind('click', function(event) {
          if (!preventGhostClick) {
            handler.call(this, event);
          }
        });
      }

      function getDelta(params) {
        var delta = {}, hasDelta = false;
        if (params) {
          if (params === 'all') {
            delta = parameters;
            hasDelta = true;
          } else {
            var list = params.split(',');
            for (var i = 0; i < list.length; i++) {
              var param = document.getElementById(trim(list[i]));
              if (param) {
                hasDelta = hasDelta || addByDefinition(trim(param.id), trim(param.value), delta, parameterDefinitions);
              }
            }
          }
        }
        return hasDelta ? delta : null;
      }

      RAT.bindAppear = function($elem, acc, aid) {
        var $ratAppear = $elem.filter(function() {
          return parseEventConfig($(this).attr('data-ratEvent')).appear !== undefined;
        });
        $ratAppear.appear(function () {
          var $this = $(this);
          var config = parseEventConfig($(this).attr('data-ratEvent')).appear;
          RAL.callQueue.push(['setParameters', getDelta($this.attr('data-ratParam'))]);
          RAL.callQueue.push(['setAccountId', acc || parameters.acc]);
          RAL.callQueue.push(['setServiceId', aid || parameters.aid]);
          RAL.callQueue.push(['setPageType', parameters.pgt]);
          RAL.callQueue.push(['setParameters', {'pgl': parameters.pgl}]);
          RAL.callQueue.push(['appendParameters',  {'compid' : $this.attr('data-ratId'), 'comptop' : $this.offset().top}]);
          RAL.callQueue.push(['setCustomParameters',  {'docheight' : $doc.height(), 'winheight' : $win.height()}]);
          if ($.inArray('cv', config) !== -1) {
            RAL.callQueue.push(['setParameters', {'cv':toJson($this.attr('data-ratCvEvent'))}]);
          }
          RAL.callQueue.push(['setEvent', 'appear']);
        });
      };

      RAT.bindClick = function($elem, acc, aid) {
        var $ratClick = $elem.filter(function() {
          return parseEventConfig($(this).attr('data-ratEvent')).click !== undefined;
        });
        setTapClickListener($ratClick, function () {
          var $this = $(this);
          var config = parseEventConfig($(this).attr('data-ratEvent')).click;
          RAL.callQueue.push(['setParameters', getDelta($this.attr('data-ratParam'))]);
          RAL.callQueue.push(['setAccountId', acc || parameters.acc]);
          RAL.callQueue.push(['setServiceId', aid || parameters.aid]);
          RAL.callQueue.push(['setPageType', parameters.pgt]);
          RAL.callQueue.push(['setParameters', {'pgl': parameters.pgl}]);
          RAL.callQueue.push(['appendParameters',  {'compid' : $this.attr('data-ratId'), 'comptop' : $this.offset().top}]);
          RAL.callQueue.push(['setCustomParameters',  {'docheight' : $doc.height(), 'winheight' : $win.height()}]);
          if ($.inArray('cv', config) !== -1) {
            RAL.callQueue.push(['setParameters', {'cv':toJson($this.attr('data-ratCvEvent'))}]);
          }
          RAL.callQueue.push(['setEvent', 'click']);
        });
      };

      RAT.bind = function($elem, acc, aid) {
        RAT.bindAppear($elem, acc, aid);
        RAT.bindClick($elem, acc, aid);
      };

      var $ratElements = $('[data-ratId]');
      var $ratUnit = $ratElements.filter(function() {
        return /\bitem\b/.test($(this).attr('data-ratUnit'));
      });
      if ($ratUnit.length === 0) {
        var itemDivTag = document.getElementById('ratItemDiv');
        var itemIdsTag = document.getElementById('ratItemId');
        if (itemDivTag && itemIdsTag) {
          $ratUnit = $(itemDivTag.value);
          var itemIds = toArray(itemIdsTag.value);
          $ratUnit.each(function(){
            $(this).attr('data-ratId', itemIds[$ratUnit.index(this)]);
          });
        }
      }
      $ratUnit.appear(function () {
        var $this = $(this);
        RAL.callQueue.push(['setAccountId', parameters.acc]);
        RAL.callQueue.push(['setServiceId', parameters.aid]);
        RAL.callQueue.push(['setPageType', parameters.pgt]);
        RAL.callQueue.push(['setParameters', {'pgl': parameters.pgl}]);
        RAL.callQueue.push(['setGenre', parameters.genre]);
        RAL.callQueue.push(['setSearchQuery', parameters.sq]);
        RAL.callQueue.push(['setParameters', {'oa': parameters.oa}]);
        RAL.callQueue.push(['appendParameters',  {'sresv' : $this.attr('data-ratId')}]);
        RAL.callQueue.push(['setEvent', 'scroll']);
      });

      RAT.bind($ratElements);

      addListener(document, 'RAT_BIND', function(event) {
        if (isType(event.data, 'String')) {
          RAT.bind($(event.data));
        }
      });
    });
  }

  //grab all the rat input tags & parse them
  parseInputTags();

  // Single page app PV tracking
  var singlePageFlag = document.getElementById('ratSinglePageApplicationLoad');
  if (singlePageFlag && singlePageFlag.value === 'true') {
    addListener(document, 'SINGLE_PAGE_APPLICATION_LOAD', function() {
      //clean up the global parameter objects before re-grabbing the input tags
      parameters = {};
      customParameters = {};
      parseInputTags();
      initPageview();
    });
  } else {
    initPageview();
  }

})();
