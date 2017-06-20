"use strict";function setParam(e){var t=JSON.parse(e);"1"===t.type?_template(t.option):"2"===t.type?_progressTem(t.option):"3"===t.type?_paymentTem(t.option):"4"===t.type?_passwordTem(t.option):"5"===t.type?_restart(t.option):"6"===t.type&&_pagesTem(t.option)}function _template(e){var t=$("#template").html(),o=Handlebars.compile(t),n=o(e);$("#body").html(n),_css(),_off(),_event()}function _restart(e){var t=$("#restart").html(),o=Handlebars.compile(t),n=o(e);$("#body").html(n),_css(),_off(),_event()}function _passwordTem(e){var t=$("#password").html(),o=Handlebars.compile(t),n=o(e);$("#body").html(n),_css(),_off(),_event()}function _progressTem(e){var t=$("#progress").html(),o=Handlebars.compile(t),n=o(e);$("#body").html(n),_css(),_off(),_event()}function _pagesTem(e){var t=$("#pages").html(),o=Handlebars.compile(t),n=o(e),a=e.pages[1];$("#body").html(n),_css(),_off(),_event();var s=parseInt($("#end").val());$("#begin").bind("propertychange input",function(e){var t=parseInt($("#end").val()),o=parseInt($(e.target).val());o>t||0===o||isNaN(o)||isNaN(t)||t>s||t>a?(0===o&&$(e.target).val(""),$(".pages").css({background:"#98a0b4",border:"1px solid #98a0b4"}),$(".maks").removeClass("none")):($(".pages").css({background:"#F98953",border:"1px solid #F98953"}),$(".maks").addClass("none"))}),$("#end").bind("propertychange input",function(e){var t=parseInt($(e.target).val()),o=parseInt($("#begin").val());o>t||0===t||isNaN(t)||t>a||t>s||isNaN(o)?(0===t&&$(e.target).val(""),$(".pages").css({background:"#98a0b4",border:"1px solid #98a0b4"}),$(".maks").removeClass("none")):($(".pages").css({background:"#F98953",border:"1px solid #F98953"}),$(".maks").addClass("none"))})}function SetProgress(e){if("100"!==e)$("#pro").css("width",e+"%");else{var t={type:"2",option:{isProgress:!0,isScroll:!1,data:{title:"检查更新",text:["下载成功，请点击“立即安装”"],progress:{color:"color:#efa075"},button:[{text:"立即安装","background-color":"ok",type:"update"}]}}};_progressTem(t.option),$(".am-progress-b").css("width","100%")}}function _paymentTem(e){var t=$("#payment").html(),o=Handlebars.compile(t),n=o(e);$("body").html(n),_css(),_off(),_event()}function GetQueryString(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),o=window.location.search.substr(1).match(t);return null!=o?unescape(o[2]):null}function _css(){var e=$(".footer-button").find(".button").length,t=$(".section-p").find("p").length,o=$(".footer-button").find(".button").outerWidth(),n=$(".top").outerWidth();$(".section-p").outerHeight();$(".top").css("margin-left",-(n/2)),$(".top").css("left","50%"),1===e?($("footer").css("margin-left",-((o*e+20)/2)),"Microsoft Internet Explorer"==navigator.appName&&"MSIE7.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")&&($(".footer-button").width(o+10),$("footer").css("margin-left",-((o*e+20)/2)-55))):2===e&&($("footer").css("margin-left",-((o*e+20)/2+5)),"Microsoft Internet Explorer"==navigator.appName&&"MSIE7.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"")&&($(".footer-button").width(2*(o+10)),$("footer").css("margin-left",-(o*e/2)-17))),1===t?($(".section-p").css("margin-top","11px"),$("footer").css("bottom","48px")):2===t?($(".section-p").css("margin-top","4px"),$("footer").css("bottom","48px")):3===t&&($(".section-p").css("margin-top","0px"),$("footer").css("margin-left",-((o*e+20)/2+5)))}function KeyDown(){$(".ok").mousedown()}function _event(){document.onkeydown=function(e){var t=window.event||e,o=t.keyCode||t.which;116==o&&(t.preventDefault?t.preventDefault():(t.keyCode=0,t.returnValue=!1)),$(document).bind("contextmenu",function(e){return!1})},$(".delete").on("mousedown",function(e){try{window.external.Close()}catch(t){}}),$(".found").on("mousedown",function(e){try{window.external.DeskTopIcon()}catch(t){}}),$(".fivePage").on("mousedown",function(e){try{window.external.FivePage()}catch(t){}}),$(".update").on("mousedown",function(e){try{window.external.Update()}catch(t){}}),$(".payment").on("mousedown",function(e){try{window.external.Pay()}catch(t){}}),$(".password").on("mousedown",function(e){var t=$(".password-input").find("input").val();try{var o=window.external.SetPassword(t);"false"===o&&$(".password-input span").removeClass("none")}catch(n){}}),$(".land").on("mousedown",function(e){try{window.external.Login()}catch(t){}}),$(".pages").on("mousedown",function(e){var t=$("#begin").val()+"-"+$("#end").val();try{window.external.SetConvertPage(t)}catch(o){}})}function _off(){$(".delete").off(),$(".found").off(),$(".update").off(),$(".payment").off(),$(".password").off(),$(".land").off()}