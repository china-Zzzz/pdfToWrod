function handleFileSelect(t){var e=void 0,a={},o=[],n=void 0,r=void 0,s=void 0,i=void 0,d="",l=void 0,c=void 0,u=void 0,p=void 0,h=void 0,f=void 0,$="Microsoft Internet Explorer"==navigator.appName&&"MSIE6.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,""),m="Microsoft Internet Explorer"==navigator.appName&&"MSIE7.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,""),g="Microsoft Internet Explorer"==navigator.appName&&"MSIE8.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,""),v="Microsoft Internet Explorer"==navigator.appName&&"MSIE9.0"==navigator.appVersion.split(";")[1].replace(/[ ]/g,"");if($||m||g||v){if(index_num--,c=new ActiveXObject("Microsoft.XMLDOM"),r=t.target.value,s=r.split("\\").length,u=r.split("\\")[s-1],l=u,d=t.target.value.split(l)[0],f=u.split(".")[u.split(".").length-1],p=_fileIsAdd(f,r),!p)return;regular.test(l)&&(l=Base64.encode(l));try{window.external.GetFileSize(r)}catch(C){}a={fileName:u,fileSize:"",filePath:d,fullPath:p._path,filePassword:p.password,filePages:p.pages,pages:p._pages,name:l,z_index:"z-index:"+index_num},o.push(a),_template(o)}else{e=t.target.files?t.target.files:t.dataTransfer.files,i=!0;for(var b,w=0;b=e[w];w++)r="",n=(b.size/1e3/1e3).toPrecision(3)+"MB",h=b.size/1e3,l=b.name,i&&(d=t.target.value.split(l)[0],i=!1),r=""+d+l,f=l.split(".")[l.split(".").length-1],p=_fileIsAdd(f,r),p&&(regular.test(l)&&(l=Base64.encode(l)),a={fileName:b.name,fileSize:n,sendSize:h,filePath:d,fullPath:p._path,filePassword:p.password,filePages:p.pages,pages:p._pages,name:l},o.push(a),_template(o),o=[]);i=!0}}function _fileIsAdd(t,e){var a=void 0,o=void 0,n=void 0,r=void 0,s=void 0,i=void 0;if("pdf"!==t)return alert("不支持除pdf文件"),!1;try{if(r=window.external.GetCountPage(e),""===r)return $("#fileuploads").after($("#fileuploads").clone().val("")).remove(),$("#fileupload").after($("#fileupload").clone().val("")).remove(),_off(),_event(),!1;a=r.split(",")[0],o=a.split("-")[1],s=r.split(",")[1]}catch(d){}return e=Base64.encode(e),(n=_preventRepeatChoice(e))?i={pages:a,_pages:o,_path:e,password:s}:!1}function _preventRepeatChoice(t){var e=filesArr.length;if(0===e)return filesArr.push(t),!0;for(var a=0,o=filesArr.length;o>a;a++)if(filesArr[a]===t)return!1;return filesArr.push(t),!0}function bytesToSize(t){if(0===t)return"0 B";var e=1e3,a=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],o=Math.floor(Math.log(t)/Math.log(e));return(t/Math.pow(e,o)).toPrecision(3)+a[o]}function getFileName(t){var e=/[^\\\/]*[\\\/]+/g;return t=t.replace(e,"")}function SetUserInfo(t){var e=JSON.parse(t);if(""!==e.userId){$(".header-land").addClass("none"),$(".land").removeClass("none");var a=$("#land").html(),o=Handlebars.compile(a),n=o(e);$(".land").html(n),""===e.headIcon&&$(".land img").addClass("icon-u66"),_userOff(),_userEvent()}else $(".header-land").removeClass("none"),$(".land").addClass("none")}function _userOff(){$("#img").off(),$(".personal").off(),$(".drops-update").off(),$(".drops-logout").off()}function _userEvent(){$(".land").on("mousedown",function(t){$("#drops").removeClass("none"),$(t.target).find("i").addClass("icon-u678")}),$(".personal").on("mousedown",function(){try{window.external.PersonalCenter()}catch(t){}}),$(".drops-update").on("mousedown",function(){try{window.external.UpgradeMember()}catch(t){}}),$(".drops-logout").on("mousedown",function(){try{window.external.Logout()}catch(t){}$(".header-land").removeClass("none"),$(".land").addClass("none")})}function _template(t){var e=$("#table"),a=e.data("plugin_tinyscrollbar"),o=$("#template").html(),n=Handlebars.compile(o),r=n(t),s=void 0;$(".tbody").append(r),$("#drag").addClass("none"),$("#fileuploads").replaceWith('<input id="fileuploads" type="file" name="uploadFile" multiple=""  accept=".pdf">'),_off(),_event(),fileChoice(),scrollbarOK?(a.update("relative"),s=$(".thumb").height()-35,$(".thumb").height(s)):($("#table").tinyscrollbar(),s=$(".thumb").height()-35,$(".thumb").height(s),scrollbarOK=!0)}function UserCustomDir(t){var e=$(".tr[data-bool=1]");$(".top-drop-k").html(),$(".top-drop-html").html();String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")};var a=$(".drop-path").html().trim();""!==t?($(".drop-path").text(t).attr("title",t).removeClass("none"),$("#start").attr("data-path",t),e.attr("data-path",t)):""===a&&($("#start").attr("data-path","PDFPATH"),$(".top-drop-html").html("和PDF相同路径"),$(".top-drop-html").attr("data-path","0"),$(".top-drop-k").html("自定义路径"),$(".top-drop-k").attr("data-path","1"),$(".drop-path").addClass("none"))}function GetFileSize(t){var e=void 0,a=void 0,o=t.split("&"),n=o.length,r=o[n-1],s=t.lastIndexOf("&"),i=t.substring(0,s),d=getFileName(i);regular.test(d)&&(d=Base64.encode(d)),d="'"+d+"'",e="0"===r?"0B":(r/1e3/1e3).toPrecision(3)+"MB",a=r/1024,$(".tr[data-name="+d+"]").find(".fileSize").text(e).end().attr("data-fileSize",a).end()}function SetConvertProgress(t){var e=JSON.parse(t),a=e.progress+"%",o=Base64.encode(e.filepath),n=$('.open[data-filepath="'+o+'"]');n.nextAll(".tr-delete").find(".open-text").addClass("none"),n.nextAll(".tr-delete").find(".tr-delete-r").addClass("none"),n.nextAll(".tr-delete").find(".open-folder").addClass("none"),n.find(".success").addClass("none").end().find(".am-progress").removeClass("none").end().find(".am-progress-bar").css("width",a).end()}function _changeCss(t,e,a){var o=getFileName(t);regular.test(o)&&(o=Base64.encode(o)),o="'"+o+"'";var n=$(".tr[data-name="+o+"]"),r=n.find(".tr-public"),s=$("#start").attr("data-int");n.find(".tr-delete-r").attr("data-success","true"),n.find(".checkbox").attr("data-success","true"),".success"===a?n.find(".open-text").attr("data-success","true").removeClass("none").attr("data-int",s).end().find(".open-folder").attr("data-success","true").removeClass("none").end():n.find(".success").addClass("none"),n.find(".am-progress").addClass("none").end().find(".tr-delete-r").removeClass("none").end().find(".range").addClass("range-on").removeClass("Not-allowed").end().find(".checkbox").removeClass("checkbox-on").end().find(a).removeClass("none").end().find(".am-progress-bar").css("width",0).end(),n.attr("data-isOk","0").attr("data-path",e),r.css("cursor","pointer").attr("data-success","true")}function ChangeSuccess(t,e){_changeCss(t,e,".success")}function ChangeFail(t){_changeCss(t,"",".err")}function fileChoice(){var t=$('.checkbox[data-checkbox="1"]'),e=$('.checkbox[data-checkbox="0"]'),a=$("#start");0===e.length&&0!==$(".checkbox").length?$(".top-checkbox").addClass("icon-u772"):$(".top-checkbox").removeClass("icon-u772"),t.length>0&&0===file_num?(a.addClass("isOk"),$(".button-maks").addClass("none")):(a.removeClass("isOk"),$(".button-maks").removeClass("none"))}function ChangeAllOver(){file_num=0,fileChoice(),_gesture()}function _inputCheckbox(t){var e=$(t.target).attr("data-checkbox"),a=$(".top-checkbox");"1"===e?($(t.target).parents("tr").attr("data-bool","0"),$(t.target).attr("data-checkbox","0").removeClass("icon-u772"),a.removeClass("icon-u772").attr("data-checkbox","0")):($(t.target).parents("tr").attr("data-bool","1"),$(t.target).attr("data-checkbox","1").addClass("icon-u772"),0===$('.checkbox[data-checkbox="0"]').length&&a.removeClass("icon-u772").attr("data-checkbox","1"))}function _inputCheckboxs(t){var e=$(t.target).attr("data-checkbox"),a=$(".checkbox"),o=$(".tbody").find("tr"),n=$(".top-checkbox");"1"===e?(a.removeClass("icon-u772").attr("data-checkbox","0"),n.attr("data-checkbox","0"),o.attr("data-bool","0")):(a.addClass("icon-u772").attr("data-checkbox","1"),n.attr("data-checkbox","1"),o.attr("data-bool","1"))}function _ban(t){var e=$(".public");$(".button-maks").removeClass("none"),e.css("cursor","not-allowed"),$(".file-maks").removeClass("none"),$(".files").addClass("ban-hover"),$(".drop-r").addClass("ban-hover"),$(".laber-r").addClass("Not-allowed"),$(".file-r").addClass("file-not-allowed"),$(".foot-delete").removeClass("foot-delete-r"),$(t.target).removeClass("isOk")}function _gesture(){var t=$(".public");t.css("cursor","pointer"),$(".button-maks").addClass("none"),$(".file-maks").addClass("none"),$(".files").removeClass("ban-hover"),$(".drop-r").removeClass("ban-hover"),$(".laber-r").removeClass("Not-allowed"),$(".file-r").removeClass("file-not-allowed"),$(".foot-delete").addClass("foot-delete-r"),$("#start").addClass("isOk"),$(".top-checkbox").removeClass("checkbox-on")}function _startCss(t){var e=$(t).find(".tr-public");$(t).find(".range").addClass("Not-allowed"),e.css("cursor","not-allowed").attr("data-success","false"),$(t).find(".tr-delete-r").attr("data-success","false"),$(t).find(".range").removeClass("range-on").end().attr("data-isOk","1").end(),$(t).find(".checkbox").addClass("checkbox-on"),$(".top-checkbox").addClass("checkbox-on")}function _delete(t){t.after(t.clone().val("")).remove(),_off(),_event(),fileChoice()}function _scrollUpdate(){var t=$("#table"),e=t.data("plugin_tinyscrollbar"),a=void 0;e.update("relative"),a=$(".thumb").height()-35,$(".thumb").height(a)}function _drag(){var t=$("#fileupload");0===$(".tr").length&&$("#drag").removeClass("none"),_delete(t),_scrollUpdate()}function _event(){$(document).bind("contextmenu",function(t){return!1}),$("#fileupload").on("change",function(t){handleFileSelect(t)}),$("#fileuploads").on("change",function(t){handleFileSelect(t)}),$(".drop-r").on("mousedown",function(t){var e=$(t.target).attr("data-html")?$(t.target).parent():$(t.target),a=$(t.target).attr("data-path")?$(t.target).attr("data-path"):$(t.target).parent().attr("data-path");0===file_num&&($(".drop-path[data-path="+a+"]").toggleClass("none"),e.toggleClass("act"),e.next().toggleClass("none"),e.find(".drop-i").toggleClass("icon-u107"))}),$(".top-drop-k").on("mousedown",function(t){var e=$(t.target).attr("data-path"),a=$(t.target).html(),o=$(".top-drop-html").html();if($(t.target).html(o),$(".top-drop-html").html(a),"1"===e){$(t.target).attr("data-path","0");try{window.external.UserCustomDir()}catch(n){}}else $(".drop-path").addClass("none").html(""),$("#start").attr("data-path","PDFPATH"),$(t.target).attr("data-path","1");$(t.target).addClass("none")}),$(".foot-drop-k").on("mousedown",function(t){var e=$(t.target).html(),a=$(".foot-drop-html").html(),o=$(t.target).attr("data-int"),n=$(".foot-drop-html").attr("data-int");$(t.target).html(a),$(".foot-drop-html").html(e),$(t.target).attr("data-int",n),$(".foot-drop-html").attr("data-int",o),$("#start").attr("data-int",o),$(t.target).addClass("none")}),$(".drop-r").hover(function(t){var e=$(t.target).parents(".drop-r").length>0?$(t.target).parents(".drop-r"):$(t.target);e.addClass("open")},function(t){var e=$(t.target).parents(".drop-r").length>0?$(t.target).parents(".drop-r"):$(t.target),a=$(t.target).attr("data-path")?$(t.target).attr("data-path"):$(t.target).parent().attr("data-path");$(".drop-path[data-path="+a+"]").removeClass("none"),e.removeClass("open").removeClass("act"),e.next().addClass("none").end().find(".drop-i").removeClass("icon-u107").end()}),$(".drop-k").hover(function(t){var e=$(t.target);e.prev().find(".drop-i").addClass("icon-u107").end().addClass("open").addClass("act").end().removeClass("none").end();var a=$(t.target).attr("data-hover")?$(t.target).attr("data-hover"):$(t.target).parent().attr("data-hover");$(".drop-path[data-path="+a+"]").addClass("none")},function(t){var e=$(t.target).attr("data-hover")?$(t.target).attr("data-hover"):$(t.target).parent().attr("data-hover");$(".drop-path[data-path="+e+"]").removeClass("none");var a=$(t.target);a.prev().find(".drop-i").removeClass("icon-u107").end().removeClass("open").removeClass("act").end().addClass("none").end()}),$(".top-checkbox").on("mousedown",function(t){0===file_num&&(_inputCheckboxs(t),fileChoice())}),$(".tbody").on("mousedown",".checkbox",function(t){var e=$(t.target).attr("data-success");"true"===e&&(_inputCheckbox(t),fileChoice())}),$(".tbody").on("mousedown",".tr-delete-r",function(t){var e=$(t.target).attr("data-filepath"),a=$(t.target).attr("data-success");"true"===a&&($(t.target).parents("tr").remove(),filesArr.splice($.inArray(e,filesArr),1),_drag())}),$(".foot-delete").on("mousedown",function(t){var e=$(".tr[data-bool=1]"),a=void 0;0===file_num&&(e.each(function(){a=$(this).find(".tr-delete-r").attr("data-filepath"),filesArr.splice($.inArray(a,filesArr),1)}),$(".tr[data-bool=1]").remove(),$(".top-checkbox").attr("data-checkbox","1"),$(".top-checkbox").removeClass("icon-u772"),_drag())}),$("#start").on("mousedown",function(t){var e=$('.tr[data-bool="1"]'),a=void 0,o=void 0,n=void 0,r={},s=[],i=void 0,d=void 0,l=void 0,c=void 0,u=void 0,p=$(t.target).attr("data-path");if(c=$(t.target).attr("data-int"),0!==e.length&&0===file_num){for(var h=0,f=e.length;f>h;h++)r={},a=e[h].getAttribute("data-fileName"),o=e[h].getAttribute("data-fileSize"),n=e[h].getAttribute("data-filePath"),d=e[h].getAttribute("data-password"),l=e[h].getAttribute("data-pages"),r={fileName:a,fileSize:o,filePath:n,password:d,convertRange:l},s.push(r);i={changePath:p,convertType:c,files:s},i=Base64.encode(JSON.stringify(i));try{u=window.external.StartPDF2WORD(i)}catch(m){}"true"===u&&(file_num=1,_ban(t),_startCss(e))}}),$(".drop-path").on("mousedown",function(t){if(0===file_num)try{window.external.UserCustomDir()}catch(e){}}),$(".open-text").on("mousedown",function(t){var e=$(t.target).parents("tr").attr("data-path"),a=$(t.target).attr("data-success");$(t.target).attr("data-int");if("true"===a)try{window.external.OpenFile(e)}catch(o){}}),$(".open-folder").on("mousedown",function(t){var e=$(t.target).parents("tr").attr("data-path"),a="",o=e.split("\\");o.splice(o.length-1,1);for(var n=0,r=o.length;r>n;n++)a+=o[n]+"\\";var s=$(t.target).attr("data-success");if("true"===s)try{window.external.OpenFileDir(a)}catch(i){}}),$(".minimize").on("mousedown",function(t){try{window.external.Min()}catch(e){}}),$(".delete").on("mousedown",function(t){try{window.external.Close()}catch(e){}}),$(".shortcut").on("mousedown",function(){try{window.external.SetDeskIcon()}catch(t){}}),$(".update").on("mousedown",function(){try{window.external.CheckUpdate()}catch(t){}}),$(".service .a").on("mousedown",function(){try{window.external.OpenUrl("http://pdf2word.foxitreader.cn")}catch(t){}}),$(".aboutUs").on("mousedown",function(){try{window.external.OpenUrl("http://pdf2word.foxitreader.cn")}catch(t){}}),$(".open-url").on("mousedown",function(){try{window.external.OpenUrl("http://pdftoword.foxitreader.cn/")}catch(t){}}),$(".miniDown").on("mousedown",function(){$("#drop").removeClass("none")}),$(document).bind("mousedown",function(t){var e=$(t.target);0===e.closest(".miniDown").length&&$("#drop").addClass("none")}),$(document).bind("mousedown",function(t){var e=$(t.target);0===e.closest(".range").length&&($(".all-drop").addClass("none"),$(".range").attr("data-open","0"))}),$(document).bind("mousedown",function(t){var e=$(t.target);0===e.closest(".land").length&&($("#drops").addClass("none"),$(".land").find("i").removeClass("icon-u678"))}),$(".no-land").on("mousedown",function(){try{window.external.Login()}catch(t){}}),$(".tbody").on("mousedown",".other",function(t){var e=$(t.target).attr("data-path")+$(t.target).attr("data-name"),a=($(t.target).attr("data-password"),$(t.target).attr("data-filePath"));try{var o=window.external.ChangeConvertPage(e);""!==o&&($(".all").html("所有页面").removeClass("none"),$('.range[data-filePath="'+a+'"]').html(o),$('.other[data-filePath="'+a+'"]').parents("tr").attr("data-pages",o))}catch(n){}}),$(".tbody").on("mousedown",".all",function(t){var e=$(t.target).attr("data-pages");$(t.target).html("").addClass("none"),$(t.target).parents(".all-drop").prevAll(".range").html("所有页面"),$(t.target).parents("tr").attr("data-pages",e)}),$(".range-on").hover(function(t){},function(t){$(t.target).attr("data-open","0"),$(t.target).nextAll(".all-drop").addClass("none"),$(t.target).find(".row").removeClass("icon-u107"),$(t.target).removeClass("range-active")}),$(".all-drop").hover(function(t){var e=$(t.target).parents(".all-drop");e.removeClass("none"),e.prevAll(".range").addClass("range-r"),e.prevAll(".range").find(".row").addClass("icon-u107")},function(t){var e=$(t.target).parents(".all-drop").length>0?$(t.target).parents(".all-drop"):$(t.target);e.addClass("none"),e.prevAll(".range").removeClass("range-r"),e.prevAll(".range").find(".row").removeClass("icon-u107")}),$(".tbody").on("mousedown",".range-on",function(t){var e=$(t.target).attr("data-success")?$(t.target):$(t.target).parent(),a=e.attr("data-open");e.addClass("range-active"),"0"===a?(e.nextAll(".all-drop").removeClass("none"),e.find(".row").addClass("icon-u107"),e.attr("data-open","1")):(e.find(".row").removeClass("icon-u107"),e.nextAll(".all-drop").addClass("none"),e.attr("data-open","0"))})}function _off(){$(document).off(),$("#start").off(),$(".top-checkbox").off(),$(".foot-delete").off(),$(".top-drop-k").off(),$(".drop-path").off(),$(".drop-r").off(),$(".foot-drop").off(),$(".foot-drop-k").off(),$(".aboutUs").off(),$(".open-url").off(),$(".service .a").off(),$(".text").off(),$(".open-text").off(),$(".open-folder").off(),$(".minimize").off(),$(".delete").off(),$(".checkbox").off(),$(".shortcut").off(),$(".update").off(),$(".miniDown").off(),$(".no-land").off(),$(".tbody").off(),$("#fileupload").off(),$("#fileuploads").off()}!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){"use strict";function e(e,n){function r(){return f.update(),i(),f}function s(){C.css(S,f.thumbPosition),m.css(S,-f.contentPosition),g.css(k,f.trackSize),v.css(k,f.trackSize),C.css(k,f.thumbSize)}function i(){b&&($[0].ontouchstart=function(t){1===t.touches.length&&(t.stopPropagation(),c(t.touches[0]))}),C.bind("mousedown",function(t){t.stopPropagation(),c(t)}),v.bind("mousedown",function(t){c(t,!0)}),t(window).resize(function(){f.update("relative")}),f.options.wheel&&window.addEventListener?e[0].addEventListener(w,u,!1):f.options.wheel&&(e[0].onmousewheel=u)}function d(){return f.contentPosition>0}function l(){return f.contentPosition<=f.contentSize-f.viewportSize-5}function c(e,o){f.hasContentToSroll&&(t("body").addClass("noSelect"),_=o?C.offset()[S]:x?e.pageX:e.pageY,b&&(document.ontouchmove=function(t){(f.options.touchLock||d()&&l())&&t.preventDefault(),t.touches[0][a+"Touch"]=1,p(t.touches[0])},document.ontouchend=h),t(document).bind("mousemove",p),t(document).bind("mouseup",h),C.bind("mouseup",h),v.bind("mouseup",h),p(e))}function u(a){if(f.hasContentToSroll){var o=a||window.event,n=-(o.deltaY||o.detail||-1/3*o.wheelDelta)/40,r=1===o.deltaMode?f.options.wheelSpeed:1;f.contentPosition-=n*r*f.options.wheelSpeed,f.contentPosition=Math.min(f.contentSize-f.viewportSize,Math.max(0,f.contentPosition)),f.thumbPosition=f.contentPosition/f.trackRatio,e.trigger("move"),C.css(S,f.thumbPosition),m.css(S,-f.contentPosition),(f.options.wheelLock||d()&&l())&&(o=t.event.fix(o),o.preventDefault())}a.stopPropagation()}function p(t){if(f.hasContentToSroll){var o=x?t.pageX:t.pageY,n=t[a+"Touch"]?_-o:o-_,r=Math.min(f.trackSize-f.thumbSize,Math.max(0,f.thumbPosition+n));f.contentPosition=r*f.trackRatio,e.trigger("move"),C.css(S,r),m.css(S,-f.contentPosition)}}function h(){f.thumbPosition=parseInt(C.css(S),10)||0,t("body").removeClass("noSelect"),t(document).unbind("mousemove",p),t(document).unbind("mouseup",h),C.unbind("mouseup",h),v.unbind("mouseup",h),document.ontouchmove=document.ontouchend=null}this.options=t.extend({},o,n),this._defaults=o,this._name=a;var f=this,$=e.find(".viewport"),m=e.find(".overview"),g=e.find(".scrollbar"),v=g.find(".track"),C=g.find(".thumb"),b="ontouchstart"in document.documentElement,w="onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll",x="x"===this.options.axis,k=x?"width":"height",S=x?"left":"top",_=0;return this.contentPosition=0,this.viewportSize=0,this.contentSize=0,this.contentRatio=0,this.trackSize=0,this.trackRatio=0,this.thumbSize=0,this.thumbPosition=0,this.hasContentToSroll=!1,this.update=function(t){var e=k.charAt(0).toUpperCase()+k.slice(1).toLowerCase();switch(this.viewportSize=$[0]["offset"+e],this.contentSize=m[0]["scroll"+e],this.contentRatio=this.viewportSize/this.contentSize,this.trackSize=this.options.trackSize||this.viewportSize,this.thumbSize=Math.min(this.trackSize,Math.max(this.options.thumbSizeMin,this.options.thumbSize||this.trackSize*this.contentRatio)),this.trackRatio=(this.contentSize-this.viewportSize)/(this.trackSize-this.thumbSize),this.hasContentToSroll=this.contentRatio<1,g.toggleClass("disable",!this.hasContentToSroll),t){case"bottom":this.contentPosition=Math.max(this.contentSize-this.viewportSize,0);break;case"relative":this.contentPosition=Math.min(Math.max(this.contentSize-this.viewportSize,0),Math.max(0,this.contentPosition));break;default:this.contentPosition=parseInt(t,10)||0}return this.thumbPosition=this.contentPosition/this.trackRatio,s(),f},r()}var a="tinyscrollbar",o={axis:"y",wheel:!0,wheelSpeed:40,wheelLock:!0,touchLock:!0,trackSize:!1,thumbSize:!1,thumbSizeMin:20};t.fn[a]=function(o){return this.each(function(){t.data(this,"plugin_"+a)||t.data(this,"plugin_"+a,new e(t(this),o))})}});var file_num=0,scrollbarOK=!1,filesArr=[],regular=/^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\！\?\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\。\，\、\[\]\,]+.*)$/,index_num=1e4;document.onkeydown=function(t){var e=window.event||t,a=e.keyCode||e.which;116==a&&(e.preventDefault?e.preventDefault():(e.keyCode=0,e.returnValue=!1))},_event();