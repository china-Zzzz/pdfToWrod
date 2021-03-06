/**
 * 获取客户端弹框内容
 */
function setParam(data) {
	//弹框类型（“1” 普通弹框， “2” 进度条弹框，“3” 支付弹框 ）
	//var data = Base64.decode(JSON.stringify(GetQueryString('json')))
	var _data = JSON.parse(data);

	if (_data.type === "1") {

		_template(_data.option);
	} else if (_data.type === "2") {

		_progressTem(_data.option);
	} else if (_data.type === "3") {

		_paymentTem(_data.option);
	} else if (_data.type === '4') {

		_passwordTem(_data.option);
	}else if (_data.type === '5') {

		_restart(_data.option);
	} else if (_data.type === '6') {

		_pagesTem(_data.option);
	}
}
/**
 * 普通模版
 */
function _template(data) {

	var source = $('#template').html();

	var template = Handlebars.compile(source);

	var html = template(data);

	$('#body').html(html);

	_css();

	_off();

	_event();
}
/**
 * 重启模版
 */
function _restart(data) {

	var source = $('#restart').html();

	var template = Handlebars.compile(source);

	var html = template(data);

	$('#body').html(html);

	_css();

	_off();

	_event();
}
/**
 * 密码模版
 */
function _passwordTem(data) {

	var source = $('#password').html();

	var template = Handlebars.compile(source);

	var html = template(data);

	$('#body').html(html);

	_css();

	_off();

	_event();
}
/**
 * 进度条模版
 */
function _progressTem(data) {

	var source = $('#progress').html();

	var template = Handlebars.compile(source);

	var html = template(data);

	$('#body').html(html);

	_css();

	_off();

	_event();
}
/**
 * 页数模版
 */
function _pagesTem(data) {

	var source = $('#pages').html();

	var template = Handlebars.compile(source);

	var html = template(data);

	var pages = data.pages[1];

	$('#body').html(html);

	_css();

	_off();

	_event();

	var initEnd = parseInt($('#end').val());

	//开始页数范围
	$('#begin').bind('propertychange input', function (e) {

		var _endNum = parseInt($('#end').val());

		var _beginNum = parseInt($(e.target).val());

		if (_beginNum > _endNum || _beginNum === 0 || isNaN(_beginNum) || isNaN(_endNum) || _endNum > initEnd || _endNum > pages) {

			if (_beginNum === 0) {

				$(e.target).val('');
			}

			$('.pages').css({
				'background': '#98a0b4',
				'border': '1px solid #98a0b4'
			});

			$('.maks').removeClass('none');
		} else {

			$('.pages').css({
				'background': '#F98953',
				'border': '1px solid #F98953'
			});

			$('.maks').addClass('none');
		}
	});

	//结束页数范围
	$('#end').bind('propertychange input', function (e) {

		var _endNum = parseInt($(e.target).val());

		var _beginNum = parseInt($('#begin').val());

		if (_beginNum > _endNum || _endNum === 0 || isNaN(_endNum) || _endNum > pages || _endNum > initEnd || isNaN(_beginNum)) {

			if (_endNum === 0) {

				$(e.target).val('');
			}

			$('.pages').css({
				'background': '#98a0b4',
				'border': '1px solid #98a0b4'
			});

			$('.maks').removeClass('none');
		} else {

			$('.pages').css({
				'background': '#F98953',
				'border': '1px solid #F98953'
			});

			$('.maks').addClass('none');
		}
	});
}
/**
 * 客户端传送进度条参数
 */
function SetProgress(num) {

	if (num !== '100') {

		$('#pro').css('width', num + "%");
	} else {

		var data = {
			"type": "2",
			"option": {
				"isProgress": true,
				"isScroll": false,
				"data": {
					"title": '检查更新',
					"text": ['下载成功，请点击“立即安装”'],
					"progress": {
						"color": "color:#efa075"
					},
					"button": [{
						"text": "立即安装",
						"background-color": "ok", //按钮颜色
						"type": "update"
					}]
				}
			}
		};

		_progressTem(data.option);

		$('.am-progress-b').css('width', "100%");
	}
}
/**
 * 支付模版
 */
function _paymentTem(data) {

	var source = $('#payment').html();

	var template = Handlebars.compile(source);

	var html = template(data);

	$('body').html(html);

	_css();

	_off();

	_event();
}
/**
 * url获取参数
 */
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);return null;
}
/**
 * css样式定义
 */
function _css() {

	var length = $('.footer-button').find('.button').length;

	var _length = $('.section-p').find('p').length;

	var _width = $('.footer-button').find('.button').outerWidth(true);

	var $width = $('.top').outerWidth();

	var _height = $('.section-p').outerHeight();

	$('.top').css('margin-left', -($width / 2));

	$('.top').css('left', '50%');

	if (length === 1) {

		$('footer').css("margin-left", -(_width/2)-5);

		//ie7
		if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {

			$('.footer-button').width(_width+10);

			$('footer').css("margin-left", -((_width + 20) / 2) - 55);
		}
	} else if (length === 2) {
 
		$('footer').css("margin-left", -((_width * length) / 2) - 5); 

		//ie7
		if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {

			$('.footer-button').width(2*(_width+10));

			$('footer').css("margin-left", -((_width * length) / 2) - 17);
		}
	}

	if (_length === 1) {

		$('.section-p').css('margin-top', '11px');

		$('footer').css('bottom', '48px');
	} else if (_length === 2) {

		$('.section-p').css('margin-top', '4px');

		$('footer').css('bottom', '48px');

	} else if (_length === 3) {

		$('.section-p').css('margin-top', '0px');

	}
}
/**
 * 回车执行确认事件（客户端掉用）
 */
function KeyDown() {

	$('.ok').mousedown();
}
/**
 * 事件绑定
 */
function _event() {

	/**
	  * 禁止刷新屏蔽右键
	  */
	document.onkeydown = function (e) {

		var ev = window.event || e;

		var code = ev.keyCode || ev.which;

		if (code == 116) {

			if (ev.preventDefault) {

				ev.preventDefault();
			} else {

				ev.keyCode = 0;

				ev.returnValue = false;
			}
		}
		//屏蔽鼠标右键
		$(document).bind("contextmenu", function (e) {
			return false;
		});
	};

	//关闭
	$('.delete').on('mousedown', function (e) {

		try {
			window.external.Close();
		} catch (err) {}
	});
	//设置桌面快捷方式
	$('.found').on('mousedown', function (e) {

		try {
			window.external.DeskTopIcon();
		} catch (err) {}
	});
	//只转5页
	$('.fivePage').on('mousedown', function (e) {

		try {
			window.external.FivePage();
		} catch (err) {}
	});
	//立即安装\下载更新\立即更新\重试
	$('.update').on('mousedown', function (e) {

		try {
			window.external.Update();
		} catch (err) {}
	});

	//支付
	$('.payment').on('mousedown', function (e) {

		try {
			window.external.Pay();
		} catch (err) {}
	});

	//密码提交
	$('.password').on('mousedown', function (e) {

		var pass = $('.password-input').find('input').val();

		try {
			var passwordIsOk = window.external.SetPassword(pass);

			if (passwordIsOk === 'false') {

				$('.password-input span').removeClass('none');
			}
		} catch (err) {}
	});

	//登录
	$('.land').on('mousedown', function (e) {

		try {
			window.external.Login();
		} catch (err) {}
	});

	//确定转换页数
	$('.pages').on('mousedown', function (e) {

		var num = $('#begin').val() + '-' + $('#end').val();

		try {
			window.external.SetConvertPage(num);
		} catch (err) {}
	});
}
/**
 * 事件解除绑定
 */
function _off() {

	$('.delete').off();

	$('.found').off();

	$('.update').off();

	$('.payment').off();

	$('.password').off();

	$('.land').off();
}
//setParam()