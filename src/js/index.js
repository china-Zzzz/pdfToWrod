"use strict";

var file_num = 0;
//判断滚动条是否首次加载
var scrollbarOK = false;
//存储选择后文件的路径转Base64用于防止重复选择
var filesArr = [];
var regular = /^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\！\?\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\。\，\、\[\]\,]+.*)$/;
//兼容ie7的“所有页面”层级遮盖问题
var index_num = 10000;
//文件总数对比参数
var _PageCountNum = 0;
/**
 * 获取文件信息
 * 文件名
 * 文件路径
 * 文件大小
 * 文件密码（客户端提供）
 * 文件页数（客户端提供）
 */
function handleFileSelect(evt) {

	var files = void 0,
	    op = {},
	    output = [],
	    _size = void 0,
	    _path = void 0,
	    length = void 0,
	    fileOK = void 0,
	    path = '',
	    name = void 0,
	    xmlDoc = void 0,
	    fileName = void 0,
	    fileOption = void 0,
	    sendSize = void 0,
	    _type = void 0,
	    ieVersionSeven = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0",
	    ieVersionEight = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0",
	    ieVersionNine = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0";

	if (ieVersionSeven || ieVersionEight || ieVersionNine) {

		index_num--;

		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");

		_path = evt.target.value;

		length = _path.split('\\').length;

		fileName = _path.split('\\')[length - 1];

		name = fileName;
		//根据客户端要求传输的路径为不加文件名称的路径
		path = evt.target.value.split(name)[0];
		//文件类型
		_type = fileName.split('.')[fileName.split('.').length - 1];

		//公用部分
		fileOption = _fileIsAdd(_type, _path);
		//无法添加文件禁止继续执行
		if (!fileOption) {
			return;
		}
		//特殊字符转换
		if (regular.test(name)) {

			name = Base64.encode(name);
		}

		//调用客户端返回文件大小
		try {
			window.external.GetFileSize(_path);
		} catch (err) {}

		op = {
			fileName: fileName,
			fileSize: '',
			filePath: path,
			fullPath: fileOption._path,
			filePassword: fileOption.password,
			filePages: fileOption.pages,
			pages: fileOption._pages,
			name: name,
			z_index: "z-index:" + index_num
		};

		output.push(op);

		_template(output);
	} else {

		files = evt.target.files ? evt.target.files : evt.dataTransfer.files;
		//多文件上传只取一次文件路径
		fileOK = true;

		for (var i = 0, f; f = files[i]; i++) {

			_path = '';
			//界面大小单位显示MB
			_size = (f.size / 1000 / 1000).toPrecision(3) + "MB";
			//传输给客户端文件大小为kb且不带单位
			sendSize = f.size / 1000;
			//文件名
			name = f.name;

			if (fileOK) {
				//根据客户端要求传输的路径为不加文件名称的路径
				path = evt.target.value.split(name)[0];

				fileOK = false;
			}
			//文件完整路径（带文件名）
			_path = "" + path + name;
			//文件类型
			_type = name.split('.')[name.split('.').length - 1];
			//公用部分
			fileOption = _fileIsAdd(_type, _path);
			//界面大小单位显示MB
			_size = (f.size / 1000 / 1000).toPrecision(3) + "MB";
			//传输给客户端文件大小为kb且不带单位
			sendSize = f.size / 1000;
			//无法添加文件禁止继续执行
			if (!fileOption) {
				continue;
			}
			//特殊字符转换
			if (regular.test(name)) {

				name = Base64.encode(name);
			}

			op = {
				fileName: f.name,
				fileSize: _size,
				sendSize: sendSize,
				filePath: path,
				fullPath: fileOption._path,
				filePassword: fileOption.password,
				filePages: fileOption.pages,
				pages: fileOption._pages,
				name: name
			};

			output.push(op);

			_template(output);

			output = [];
		}

		fileOK = true;
	}
}
/**
 * 拖拽文件（客户端传人）
 */
function fileDrag(option) {

	//有文件转换无法继续添加
	if (file_num === 1) {
		return;
	}

	var _option = JSON.parse(option);

	var op = {},
	    output = [],
	    _type = void 0,
	    _path = void 0,
	    path = void 0,
	    _name = void 0,
	    _pathNoName = void 0,
	    name = void 0,
	    _size = void 0,
	    size = void 0,
	    sendSize = void 0,
	    fileOption = void 0;

	//多文件上传只取一次文件路径
	var fileOK = true;

	for (var i = 0, max = _option.length; i < max; i++) {
		//ie7所有页面下拉框层级兼容
		index_num--;
		//文件类型
		_type = _option[i].fileType;
		//文件路径
		_path = _option[i].filePath;
		//文件大小
		size = _option[i].fileSize;
		//文件名称
		_name = _option[i].fileName;
		//传输给客户端文件大小为kb且不带单位
		sendSize = size / 1000;
		//界面大小单位显示MB
		_size = (size / 1000 / 1000).toPrecision(3) + "MB";

		if (fileOK) {
			//根据客户端要求传输的路径为不加文件名称的路径
			path = _path.split(_name)[0];

			fileOK = false;
		}
		//公用部分
		fileOption = _fileIsAdd(_type, _path);
		//特殊字符转换
		if (regular.test(_name)) {

			name = Base64.encode(_name);
		} else {

			name = _option[i].fileName;
		}
		//无法添加文件禁止继续执行
		if (!fileOption) {
			continue;
		}

		op = {
			fileName: _name,
			fileSize: _size,
			sendSize: sendSize,
			filePath: path,
			fullPath: fileOption._path,
			filePassword: fileOption.password,
			filePages: fileOption.pages,
			pages: fileOption._pages,
			name: name,
			z_index: "z-index:" + index_num
		};

		output.push(op);

		_template(output);

		output = [];
	}
}
/**
 * 文件是否可以添加(可以添加返回 文件页数范围、文件总页数、文件路径转Base64、文件密码)
 */
function _fileIsAdd(_type, _path) {

	var pages = void 0,
	    _pages = void 0,
	    flieErr = void 0,
	    pagesPassword = void 0,
	    password = void 0,
	    option = void 0,
	    type = void 0;
	//大写转换成小写
	type = _type.toLowerCase();

	if (type !== 'pdf') {
		//type="1"的普通信息框接口
		try {
			window.external.ShowMessage('不支持除pdf文件');
		} catch (err) {}
		return false;
	}
	//返回文件总页数和密码
	try {
		pagesPassword = window.external.GetCountPage(_path);

		//客户端返回pagesPassword = '' 时表示弹框被取消 不添加文件列表
		if (pagesPassword !== '') {

			pages = pagesPassword.split(',')[0];

			_pages = pages.split('-')[1];

			password = pagesPassword.split(',')[1];
		} else {
			//点击密码弹框取消按钮支持从新选择文件
			$("#fileuploads").after($("#fileuploads").clone().val("")).remove();
			$("#fileupload").after($("#fileupload").clone().val("")).remove();
			_off();

			_event();

			return false;
		}
	} catch (err) {}

	_path = Base64.encode(_path);
	//防止文件重复选择
	flieErr = _preventRepeatChoice(_path);

	if (!flieErr) {
		return false;
	}

	option = {
		pages: pages,
		_pages: _pages,
		_path: _path,
		password: password
	};

	return option;
}
/**
 * 防止文件重复选择
 */
function _preventRepeatChoice(path) {

	var _length = filesArr.length;

	if (_length === 0) {

		filesArr.push(path);

		return true;
	} else {

		for (var i = 0, max = filesArr.length; i < max; i++) {

			if (filesArr[i] === path) {

				return false;
			}
		}

		filesArr.push(path);

		return true;
	}
}
/**
 * 文件大小转换
 * @param  {[number]} bytes [文件默认大小 单位为B]
 * @return {[order]} 转换完的单位
 */
function bytesToSize(bytes) {

	if (bytes === 0) return '0 B';

	var k = 1000,
	    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	    i = Math.floor(Math.log(bytes) / Math.log(k));

	return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i];
}

/**
 * 获取文件名
 * @param  {[string]} str [文件名]
 * @return {[string]} 过滤后的文件名
 */
function getFileName(str) {

	var reg = /[^\\\/]*[\\\/]+/g;

	str = str.replace(reg, '');

	return str;
}

/**
 * 登录信息模版
 * @param  {[string]} option 客户端传人的登录信息json串
 */
function SetUserInfo(option) {

	var _option = JSON.parse(option);
	//客户端未登陆不进行渲染
	if (_option.userId !== '') {

		$('.header-land').addClass('none');

		$('.land').removeClass('none');

		var source = $('#land').html();

		var template = Handlebars.compile(source);

		var html = template(_option);

		$('.land').html(html);

		//设置默认头像
		if (_option.headIcon === '') {
			$('.land .img').addClass('icon-u66');
		}

		_userOff();

		_userEvent();
	} else {

		$('.header-land').removeClass('none');

		$('.land').addClass('none');
	}
}
/**
 * 登录信息事件解绑
 */
function _userOff() {

	$('#img').off();

	$('.personal').off();

	$('.drops-update').off();

	$('.drops-logout').off();
}
/**
 * 个人信息事件绑定
 */
function _userEvent() {
	//登录信息下拉框
	$('.land').on('mousedown', function (e) {

		$('#drops').removeClass('none');

		$(e.target).find('i').addClass('icon-u678');
	});
	//个人中心
	$('.personal').on('mousedown', function () {

		try {
			window.external.PersonalCenter();
		} catch (err) {}
	});
	//升级会员
	$('.drops-update').on('mousedown', function () {

		try {
			window.external.UpgradeMember();
		} catch (err) {}
	});
	//注销用户
	$('.drops-logout').on('mousedown', function () {

		try {
			window.external.Logout();
		} catch (err) {}

		$('.header-land').removeClass('none');

		$('.land').addClass('none');
	});
}
/**
 * 模版
 * @param  {[string]} data 文件信息数据
 */
function _template(data) {

	var $scrollbar = $('#table');

	var scrollbarData = $scrollbar.data("plugin_tinyscrollbar");

	var source = $('#template').html();

	var template = Handlebars.compile(source);

	var html = template(data);

	var scrollHeight = void 0;

	$('.tbody').append(html);
	//拖拽框隐藏
	$('#drag').addClass('none');

	$('#fileuploads').replaceWith('<input id="fileuploads" type="file" name="uploadFile" multiple=""  accept=".pdf">');

	_off();

	_event();

	fileChoice();
	//首次触发滚动条插件
	if (!scrollbarOK) {

		$('#table').tinyscrollbar();

		scrollHeight = $('.thumb').height() - 35;

		$('.thumb').height(scrollHeight);

		scrollbarOK = true;
	} else {
		//更新滚动条
		scrollbarData.update("relative");

		scrollHeight = $('.thumb').height() - 35;

		$('.thumb').height(scrollHeight);
	}
}
/**
 * 自定义目录
 * @param  {[string]} opiton 客户端传入自定义目录路径
 */
function UserCustomDir(opiton) {

	var $tr_boll = $('.tr[data-bool=1]');

	var html = $('.top-drop-k').html();

	var _html = $('.top-drop-html').html();
	//兼容ie7 8 去空格
	String.prototype.trim = function () {
		return this.replace(/(^\s*)|(\s*$)/g, "");
	};

	var _path = $('.drop-path').html().trim();

	if (opiton !== '') {

		$('.drop-path').text(opiton).attr('title', opiton).removeClass('none');

		$('#start').attr('data-path', opiton);

		$tr_boll.attr('data-path', opiton);
	} else {
		//自定义路径是否为空，空显示和PDF相同路径
		if (_path === '') {

			$('#start').attr('data-path', "PDFPATH");

			$('.top-drop-html').html("和PDF相同路径");

			$('.top-drop-html').attr('data-path', '0');

			$('.top-drop-k').html("自定义路径");

			$('.top-drop-k').attr('data-path', '1');

			$('.drop-path').addClass('none');
		}
	}
}
/**
 * ie9 ie8 ie7 客户端传入文件大小
 * @param  {[string]} size 客户端传入文件大小
 */
function GetFileSize(size) {

	var Size = void 0;

	var sendSize = void 0;

	var _size = size.split('&');

	var _length = _size.length;

	var fileSize = _size[_length - 1];

	var indexOf = size.lastIndexOf('&');

	var name = size.substring(0, indexOf);

	var _name = getFileName(name);
	//特殊字符转换
	if (regular.test(_name)) {

		_name = Base64.encode(_name);
	}

	_name = "'" + _name + "'";

	if (fileSize === '0') {

		Size = '0B';
	} else {
		//界面大小单位显示MB
		Size = (fileSize / 1000 / 1000).toPrecision(3) + "MB";
	}

	sendSize = fileSize / 1024;

	$(".tr[data-name=" + _name + "]").find('.fileSize').text(Size).end().attr('data-fileSize', sendSize).end();
}
/**
 * 转换文件进度条
 * @param  {[string]} opiton 客户端传入进度条进度值
 */
function SetConvertProgress(option) {

	var _option = JSON.parse(option);;

	var num = _option.progress + '%';

	var fivePage = _option.pagerange;
	//文件路径转换
	var path = Base64.encode(_option.filepath);

	if (fivePage === '1-5') {
		//转换5页
		$('.range[data-filePath=' + '"' + path + '"' + ']').find('span').html(fivePage);
		//显示所有页面
		$('.all[data-filePath=' + '"' + path + '"' + ']').html('所有页面').removeClass('none');
	}

	var _open = $('.open[data-filepath=' + '"' + path + '"' + ']');
	//不使用none（兼容ie7td高度差问题）
	_open.nextAll('.tr-delete').find('.open-text').addClass('visibility');

	_open.nextAll('.tr-delete').find('.tr-delete-r').addClass('visibility');

	_open.nextAll('.tr-delete').find('.open-folder').addClass('visibility');

	_open.find('.state').addClass('none').end().find('.am-progress').removeClass('none').end().find('.am-progress-bar').css('width', num).end();
}
/**
 * 转换成功／转换失败样式操作
 */
function _changeCss(path, _path, $state) {

	var _name = getFileName(path);

	//特殊字符转换
	if (regular.test(_name)) {

		_name = Base64.encode(_name);
	}

	_name = "'" + _name + "'";

	var _tr = $(".tr[data-name=" + _name + "]");

	var _trPublic = _tr.find('.tr-public');

	var _int = $('#start').attr('data-int');
	//转换成功/转换失败后可删除
	_tr.find('.tr-delete-r').attr('data-success', 'true');
	//转换成功/转换失败后可选择
	_tr.find('.checkbox').attr('data-success', 'true');
	//转换成功显示"打开文件","打开文件夹"
	if ($state === ".success") {

		_tr.find('.open-text').attr('data-success', 'true').removeClass('visibility').attr('data-int', _int).end().find('.open-folder').attr('data-success', 'true').removeClass('visibility').end();
	} else {

		_tr.find('.success').addClass('none').end().find('.open-text').addClass('visibility').end().find('.open-folder').addClass('visibility').end();
	}

	_tr.find('.am-progress').addClass('none').end().find('.tr-delete-r').removeClass('visibility').end().find('.range').addClass('range-on').removeClass('Not-allowed').end().find('.checkbox').removeClass('checkbox-on').end().find($state).removeClass('none').end().find('.am-progress-bar').css('width', 0).end();

	_tr.attr('data-isOk', '0').attr('data-path', _path);

	_trPublic.css('cursor', 'pointer').attr('data-success', 'true');
}
/**
 * 文件转换成功接口
 * @param  {[string]} path 客户端传入原始文件路径（后缀为.pdf）_path客户端传入转换后文件路径（后缀为转换后的文件后缀）
 */
function ChangeSuccess(path, _path) {

	_changeCss(path, _path, '.success');
}
/**
* 文件转换失败接口
* @param  {[string]} path 客户端传入原始文件路径（后缀为.pdf)
*/
function ChangeFail(path) {

	_changeCss(path, '', '.err');
}
/**
 * 文件是否有选择
 */
function fileChoice() {

	var _num = void 0;

	var obj = $('.checkbox[data-checkbox="1"]');

	var _obj = $('.checkbox[data-checkbox="0"]');

	var $start = $('#start');
	//判断是否全选
	if (_obj.length === 0 && $('.checkbox').length !== 0) {

		$('.top-checkbox').addClass('icon-u772');
	} else {

		$('.top-checkbox').removeClass('icon-u772');
	}
	//判断是否可以转换
	if (obj.length > 0 && file_num === 0) {

		$start.addClass('isOk');

		$('.button-maks').addClass('none');
	} else {

		$start.removeClass('isOk');

		$('.button-maks').removeClass('none');
	}
}
/**
 * 转换全部完成
 */
function ChangeAllOver() {

	file_num = 0;

	fileChoice();
	//添加手势
	_gesture();
}
/**
 * 单选
 */
function _inputCheckbox(e) {

	var box = $(e.target).attr('data-checkbox');

	var $topCheckbox = $('.top-checkbox');

	if (box === '1') {

		$(e.target).parents('tr').attr('data-bool', '0');

		$(e.target).attr('data-checkbox', '0').removeClass('icon-u772');

		$topCheckbox.removeClass('icon-u772').attr('data-checkbox', '0');
	} else {

		$(e.target).parents('tr').attr('data-bool', '1');

		$(e.target).attr('data-checkbox', '1').addClass('icon-u772');

		if ($('.checkbox[data-checkbox="0"]').length === 0) {

			$topCheckbox.removeClass('icon-u772').attr('data-checkbox', '1');
		}
	}
}
/**
 * 全选
 */
function _inputCheckboxs(e) {

	var box = $(e.target).attr('data-checkbox');

	var $checkbox = $('.checkbox');

	var $tr = $('.tbody').find('tr');

	var $topCheckbox = $('.top-checkbox');

	if (box === '1') {

		$checkbox.removeClass('icon-u772').attr('data-checkbox', '0');

		$topCheckbox.attr('data-checkbox', '0');

		$tr.attr('data-bool', '0');
	} else {

		$checkbox.addClass('icon-u772').attr('data-checkbox', '1');

		$topCheckbox.attr('data-checkbox', '1');

		$tr.attr('data-bool', '1');
	}
}
/**
 * 禁止刷新
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
};
/**
 * 禁止操作dom
 */
function _ban(e) {

	var $Public = $('.public');

	$('.button-maks').removeClass('none');

	$Public.css('cursor', 'not-allowed');

	$('.file-maks').removeClass('none');

	$('.files').addClass('ban-hover');

	$('.drop-r').addClass('ban-hover');

	$('.laber-r').addClass('Not-allowed');

	$('.file-r').addClass('file-not-allowed');

	$('.foot-delete').removeClass('foot-delete-r');

	$(e.target).removeClass('isOk');
}
/**
 * 全部完成添加手势
 */
function _gesture() {

	var $Public = $('.public');

	$Public.css('cursor', 'pointer');

	$('.button-maks').addClass('none');

	$('.file-maks').addClass('none');

	$('.files').removeClass('ban-hover');

	$('.drop-r').removeClass('ban-hover');

	$('.laber-r').removeClass('Not-allowed');

	$('.file-r').removeClass('file-not-allowed');

	$('.foot-delete').addClass('foot-delete-r');

	$('#start').addClass('isOk');

	$('.top-checkbox').removeClass('checkbox-on');
}
/**
 * 开始转换的已经选择转换文件样式禁止操作
 */
function _startCss(obj) {
	//禁止操作样式
	var _public = $(obj).find('.tr-public');

	$(obj).find('.range').addClass('Not-allowed');

	_public.css('cursor', 'not-allowed').attr('data-success', 'false');

	$(obj).find('.tr-delete-r').attr('data-success', 'false');
	//所以页面
	$(obj).find('.range').removeClass('range-on').end().attr('data-isOk', '1').end();
	//单选框
	$(obj).find('.checkbox').addClass('checkbox-on');
	//全选框
	$('.top-checkbox').addClass('checkbox-on');
}
/**
 * 删除文件
 * @param  {[object]} file 
 */
function _delete(file) {
	//取消文件后还可以上传该文件
	file.after(file.clone().val("")).remove();

	_off();

	_event();

	fileChoice();
}
/**
 * 更新滚动条
 */
function _scrollUpdate() {

	var $scrollbar = $('#table');

	var scrollbarData = $scrollbar.data("plugin_tinyscrollbar");

	var scrollHeight = void 0;
	//更新滚动条
	scrollbarData.update("relative");

	scrollHeight = $('.thumb').height() - 35;

	$('.thumb').height(scrollHeight);
}
/**
 * 获取文件上传最大文件页数的总页数
 * @return {[pageNum]} 转换完的单位
 */
function _maxPageCount(num) {

	if (Number(num) > Number(_PageCountNum)) {

		_PageCountNum = num;
	}

	return _PageCountNum;
}
/**
 * 拖拽框显示
 */
function _drag() {

	var file = $("#fileupload");

	if ($('.tr').length === 0) {
		//拖拽框显示
		$('#drag').removeClass('none');
	}

	_delete(file);
	//更新滚动条
	_scrollUpdate();
}
/**
 * 事件绑定
 */
function _event() {

	//屏蔽鼠标右键
	$(document).bind("contextmenu", function (e) {
		return false;
	});
	//选择文件事件监听
	$('#fileupload').on('change', function (e) {

		handleFileSelect(e);
	});
	//选择文件事件监听
	$('#fileuploads').on('change', function (e) {

		handleFileSelect(e);
	});
	//添加点击样式(兼容ie)
	$('#fileuploads').on('mousedown', function (e) {

		$('.icon-u614').addClass('i-active');
	});
	//去除点击样式(兼容ie)
	$('#fileuploads').on('mouseup', function (e) {

		$('.icon-u614').removeClass('i-active');
	});
	//去除点击样式(兼容ie)
	$('#fileuploads').on('mouseout', function (e) {

		$('.icon-u614').removeClass('i-active');
	});
	//转换格式\保存路径下拉框mousedown
	$('.drop-r').on('mousedown', function (e) {

		var _drop = $(e.target).attr('data-html') ? $(e.target).parent() : $(e.target);

		var path = $(e.target).attr('data-path') ? $(e.target).attr('data-path') : $(e.target).parent().attr('data-path');

		if (file_num === 0) {

			$(".drop-path[data-path=" + path + "]").toggleClass('none');

			_drop.toggleClass('act');

			_drop.next().toggleClass('none');

			_drop.find('.drop-i').toggleClass('icon-u107');
		}
	});
	//保存路径mousedown
	$('.top-drop-k').on('mousedown', function (e) {

		var path = $(e.target).attr('data-path');

		var html = $(e.target).html();

		var _html = $('.top-drop-html').html();

		$(e.target).html(_html);

		$('.top-drop-html').html(html);

		if (path === '1') {

			$(e.target).attr('data-path', '0');

			try {
				window.external.UserCustomDir();
			} catch (err) {}
		} else {

			$('.drop-path').addClass('none').html('');

			$('#start').attr('data-path', "PDFPATH");

			$(e.target).attr('data-path', '1');
		}

		$(e.target).addClass('none');
	});
	//转换格式mousedown
	$('.foot-drop-k').on('mousedown', function (e) {

		var html = $(e.target).html();

		var _html = $('.foot-drop-html').html();

		var Int = $(e.target).attr('data-int');

		var _Int = $('.foot-drop-html').attr('data-int');

		$(e.target).html(_html);

		$('.foot-drop-html').html(html);

		$(e.target).attr('data-int', _Int);

		$('.foot-drop-html').attr('data-int', Int);

		$('#start').attr('data-int', Int);

		$(e.target).addClass('none');
	});
	//转换格式\保存路径下拉框hover
	$('.drop-r').hover(function (e) {

		var _drop_r = $(e.target).parents('.drop-r').length > 0 ? $(e.target).parents('.drop-r') : $(e.target);

		_drop_r.addClass('open');
	}, function (e) {

		var _drop_r = $(e.target).parents('.drop-r').length > 0 ? $(e.target).parents('.drop-r') : $(e.target);

		var path = $(e.target).attr('data-path') ? $(e.target).attr('data-path') : $(e.target).parent().attr('data-path');

		$(".drop-path[data-path=" + path + "]").removeClass('none');

		_drop_r.removeClass('open').removeClass('act');
		_drop_r.next().addClass('none').end().find('.drop-i').removeClass('icon-u107').end();
	});
	//转换格式\保存路径下拉框hover
	$('.drop-k').hover(function (e) {

		var _drop_k = $(e.target);

		_drop_k.prev().find('.drop-i').addClass('icon-u107').end().addClass('open').addClass('act').end().removeClass('none').end();

		var path = $(e.target).attr('data-hover') ? $(e.target).attr('data-hover') : $(e.target).parent().attr('data-hover');

		$(".drop-path[data-path=" + path + "]").addClass('none');
	}, function (e) {

		var path = $(e.target).attr('data-hover') ? $(e.target).attr('data-hover') : $(e.target).parent().attr('data-hover');

		$(".drop-path[data-path=" + path + "]").removeClass('none');

		var _drop_k = $(e.target);

		_drop_k.prev().find('.drop-i').removeClass('icon-u107').end().removeClass('open').removeClass('act').end().addClass('none').end();
	});
	//全选
	$('.top-checkbox').on('mousedown', function (e) {

		if (file_num === 0) {

			_inputCheckboxs(e);

			fileChoice();
		}
	});
	//单选
	$('.tbody').on('mousedown', '.checkbox', function (e) {

		var _success = $(e.target).attr('data-success');

		if (_success === 'true') {

			_inputCheckbox(e);

			fileChoice();
		}
	});
	//单条删除
	$('.tbody').on('mousedown', '.tr-delete-r', function (e) {

		var _pathArr = $(e.target).attr('data-filepath');

		var _success = $(e.target).attr('data-success');

		if (_success === 'true') {

			$(e.target).parents('tr').remove();
			//删除数组中文件的记录供下次添加文件可以正常添加
			filesArr.splice($.inArray(_pathArr, filesArr), 1);

			_drag();
		}
	});
	//全选删除
	$('.foot-delete').on('mousedown', function (e) {

		var $filepath = $('.tr[data-bool=1]');

		var _pathArr = void 0;

		if (file_num === 0) {

			$filepath.each(function () {

				_pathArr = $(this).find('.tr-delete-r').attr('data-filepath');
				//删除数组中文件的记录供下次添加文件可以正常添加
				filesArr.splice($.inArray(_pathArr, filesArr), 1);
			});

			$('.tr[data-bool=1]').remove();

			$('.top-checkbox').attr('data-checkbox', '1');

			$('.top-checkbox').removeClass('icon-u772');

			_drag();
		}
	});
	//立即转换
	$('#start').on('mousedown', function (e) {

		var obj = $('.tr[data-bool="1"]'),
		    fileName = void 0,
		    fileSize = void 0,
		    filePath = void 0,
		    data = {},
		    arr = [],
		    option = void 0,
		    password = void 0,
		    convertRange = void 0,
		    convertType = void 0,
		    conversionIsOk = void 0,
		    pageCount = void 0,
		    maxPageCount = void 0;

		//保存文件路径
		var path = $(e.target).attr('data-path');

		//输出文件格式 convertType = "0" 输出RTF, convertType="1" 输出DOCX 
		convertType = $(e.target).attr('data-int');

		//初始化文件总数
		_PageCountNum = 0;

		if (obj.length !== 0 && file_num === 0) {

			for (var i = 0, max = obj.length; i < max; i++) {

				//文件上传客户端
				data = {};
				//文件名字
				fileName = obj[i].getAttribute('data-fileName');
				//文件大小
				fileSize = obj[i].getAttribute('data-fileSize');
				//文件路径
				filePath = obj[i].getAttribute('data-filePath');
				//文件密码
				password = obj[i].getAttribute('data-password');
				//文件页数
				convertRange = obj[i].getAttribute('data-pages');
				//文件总页数
				pageCount = obj[i].getAttribute('data-pageCount');

				data = { fileName: fileName, fileSize: fileSize, filePath: filePath, password: password, convertRange: convertRange, pageCount: pageCount };

				arr.push(data);

				//获取文件上传最大文件页数的总页数
				maxPageCount = _maxPageCount(pageCount);
			}

			option = {
				changePath: path,
				convertType: convertType,
				files: arr
			};

			option = Base64.encode(JSON.stringify(option));

			try {
				conversionIsOk = window.external.StartPDF2WORD(option, maxPageCount);
			} catch (err) {}
			//是否可以转换，conversionIsOk = "true" 可以转换（执行样式控制）conversionIsOk = "false" 不可以转换
			if (conversionIsOk === "true") {
				//用于判断客户端是否转换完成
				file_num = 1;
				//转换禁止操作dom
				_ban(e);
				//开始转换的已经选择转换文件样式禁止操作
				_startCss(obj);
			}
		}
	});
	//自定义调取客户端打开文件夹
	$('.drop-path').on('mousedown', function (e) {

		if (file_num === 0) {

			try {
				var isClickCancel = window.external.UserCustomDir();
			} catch (err) {}
		}
	});
	//打开文件调用客户端文件
	$('.open-text').on('mousedown', function (e) {
		//获取转换后文件路径
		var path = $(e.target).parents('tr').attr('data-path');

		var success = $(e.target).attr('data-success');

		var _int = $(e.target).attr('data-int');

		if (success === 'true') {

			try {
				window.external.OpenFile(path);
			} catch (err) {}
		}
	});
	//打开文件夹调用客户端文件夹
	$('.open-folder').on('mousedown', function (e) {
		//获取文件路径（pdf后缀）
		var $path = $(e.target).parents('tr').attr('data-path');

		var _path = '';

		var path = $path.split('\\');

		path.splice(path.length - 1, 1);

		//拼接完成路径的地址（不带文件名）
		for (var i = 0, max = path.length; i < max; i++) {

			_path += path[i] + "\\";
		}

		var success = $(e.target).attr('data-success');

		if (success === 'true') {

			try {
				window.external.OpenFileDir(_path);
			} catch (err) {}
		}
	});
	//最小化
	$('.minimize').on('mousedown', function (e) {

		try {
			window.external.Min();
		} catch (err) {}
	});
	//关闭
	$('.delete').on('mousedown', function (e) {

		try {
			window.external.Close();
		} catch (err) {}
	});
	//创建桌面快捷方式
	$('.shortcut').on('mousedown', function () {

		try {
			window.external.SetDeskIcon();
		} catch (err) {}
	});
	//检查更新
	$('.update').on('mousedown', function () {

		try {
			window.external.CheckUpdate();
		} catch (err) {}
	});
	//客服
	$('.service .a').on('mousedown', function () {

		try {
			window.external.OpenUrl("http://pdf2word.foxitreader.cn");
		} catch (err) {}
	});
	//关于我们
	$('.aboutUs').on('mousedown', function () {

		try {
			window.external.OpenUrl("http://pdf2word.foxitreader.cn");
		} catch (err) {}
	});
	//在线转换
	$('.open-url').on('mousedown', function () {

		try {
			window.external.OpenUrl("http://pdftoword.foxitreader.cn/index");
		} catch (err) {}
	});
	//下拉列表
	$('.miniDown').on('mousedown', function () {

		$('#drop').removeClass('none');
	});
	//顶部列表点击空白处隐藏
	$(document).bind("mousedown", function (e) {

		var target = $(e.target);

		if (target.closest(".miniDown").length === 0) {

			$("#drop").addClass('none');
		}
	});
	//所有页面下拉框点击空白处隐藏
	$(document).bind("mousedown", function (e) {

		var target = $(e.target);

		if (target.closest(".range").length === 0) {

			$('.all-drop').addClass('none');

			$('.range').attr('data-open', '0');
		}
	});
	//登录信息点击空白处隐藏
	$(document).bind("mousedown", function (e) {

		var target = $(e.target);

		if (target.closest(".land").length === 0) {

			$("#drops").addClass('none');

			$('.land').find('i').removeClass('icon-u678');
		}
	});
	//登陆
	$('.no-land').on('mousedown', function () {

		try {
			window.external.Login();
		} catch (err) {}
	});
	//转换页数弹框
	$('.tbody').on('mousedown', '.other', function (e) {

		var _path = $(e.target).attr('data-path') + $(e.target).attr('data-name');

		var _pass = $(e.target).attr('data-password');

		var path = $(e.target).attr('data-filePath');
		//总页数
		var pageCount = $(e.target).attr('data-pageCount');

		var option = _path + "," + _pass;

		try {
			var pages = window.external.ChangeConvertPage(_path, pageCount);
			//转换页数弹框点击取消按钮不改变输入框值
			if (pages !== '') {

				$('.all[data-filePath=' + '"' + path + '"' + ']').html('所有页面').removeClass('none');

				$('.range[data-filePath=' + '"' + path + '"' + ']').find('span').html(pages);

				$('.other[data-filePath=' + '"' + path + '"' + ']').parents('tr').attr('data-pages', pages);
			}
		} catch (err) {}
	});
	//所有页面点击
	$('.tbody').on('mousedown', '.all', function (e) {

		var pages = $(e.target).attr('data-pages');

		var path = $(e.target).attr('data-filePath');

		$(e.target).html('').addClass('none');

		$('.range[data-filePath=' + '"' + path + '"' + ']').find('span').html('所有页面');

		$(e.target).parents('tr').attr('data-pages', pages);
	});
	//"所有页面"移入
	$('.range-on').hover(function (e) {}, function (e) {

		var $range = $(e.target).attr('data-success') ? $(e.target) : $(e.target).parent();

		$range.attr('data-open', '0');

		$range.nextAll('.all-drop').addClass('none');

		$range.find('.row').removeClass('icon-u107');

		$range.removeClass('range-active');
	});
	$('.all-drop').hover(function (e) {

		var $allDrop = $(e.target).parents('.all-drop');

		$allDrop.removeClass('none');

		$allDrop.prevAll('.range').addClass('range-r');

		$allDrop.prevAll('.range').find('.row').addClass('icon-u107');
	}, function (e) {

		var $allDrop = $(e.target).parents('.all-drop').length > 0 ? $(e.target).parents('.all-drop') : $(e.target);

		$allDrop.addClass('none');

		$allDrop.prevAll('.range').removeClass('range-r');

		$allDrop.prevAll('.range').find('.row').removeClass('icon-u107');
	});
	//"所有页面"下拉框
	$('.tbody').on('mousedown', '.range-on', function (e) {

		var $range = $(e.target).attr('data-success') ? $(e.target) : $(e.target).parent();

		var open = $range.attr('data-open');

		$range.addClass('range-active');

		if (open === '0') {

			$range.nextAll('.all-drop').removeClass('none');

			$range.find('.row').addClass('icon-u107');

			$range.attr('data-open', '1');
		} else {

			$range.find('.row').removeClass('icon-u107');

			$range.nextAll('.all-drop').addClass('none');

			$range.attr('data-open', '0');
		}
	});
}

/**
 * 事件解除绑定
 */
function _off() {

	$(document).off();

	$('#start').off();

	$('.top-checkbox').off();

	$('.foot-delete').off();

	$('.top-drop-k').off();

	$('.drop-path').off();

	$('.drop-r').off();

	$('.foot-drop').off();

	$('.foot-drop-k').off();

	$('.aboutUs').off();

	$('.open-url').off();

	$('.service .a').off();

	$('.text').off();

	$('.open-text').off();

	$('.open-folder').off();

	$('.minimize').off();

	$('.delete').off();

	$('.checkbox').off();

	$('.shortcut').off();

	$('.update').off();

	$('.miniDown').off();

	$('.no-land').off();

	$('.tbody').off();

	$('#fileupload').off();

	$('#fileuploads').off();
}

_event();