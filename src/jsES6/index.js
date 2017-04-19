var file_num = 0;
//判断保存文件是在自定路径还是相同路径"file_custom" false 相同路径 "file_custom" true 自定义路径 
var file_custom = false;
//判断滚动条是否首次加载
var scrollbarOK = false;
//存储选择后文件的路径转Base64用于防止重复选择
var filesArr = [];
const regular = /^([^\`\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\！\￥\……\（\）\——]*[\+\~\!\#\$\%\^\&\*\(\)\|\}\{\=\"\'\`\！\?\:\<\>\•\“\”\；\‘\‘\〈\ 〉\￥\……\（\）\——\｛\｝\【\】\\\/\;\：\？\《\》\。\，\、\[\]\,]+.*)$/;
/**
 * 获取文件信息
 * 文件名
 * 文件路径
 * 文件大小
 * 文件密码（客户端提供）
 * 文件页数（客户端提供）
 */
function handleFileSelect(evt) {

	let files,
		op = {},
		output = [],
		_size,
		_path,
		length,
		flieErr,
		fileOK,
		path='',
		name,
		xmlDoc,
		fileName,
		sendSize,
		_type,
		pages,
		_pages,
		password,
		ieVersionSix = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0",
		ieVersionSeven = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0",
		ieVersionEight = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0",
		ieVersionNine = navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0"
	
	if(ieVersionSix || ieVersionSeven || ieVersionEight || ieVersionNine){

		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");

		_path = evt.target.value;

		length = _path.split('\\').length;

		fileName = _path.split('\\')[length-1];

		name = fileName;
		//根据客户端要求传输的路径为不加文件名称的路径
		path = evt.target.value.split(name)[0];
		//文件类型
		_type = (fileName.split('.'))[fileName.split('.').length - 1];

		if(_type !== 'pdf'){

			alert('不支持除pdf文件')

			return;
		}
		//调用客户端返回文件大小
		try
		{
		   window.external.GetFileSize(_path);
		}
		catch(err)
		{
			
		}
		//特殊字符转换
		if(regular.test(name)){

	    	name = Base64.encode(name);

	    }
	    //返回文件总页数和密码
		try
		{	
		   pages = window.external.GetCountPage(_path).split(',')[0];

		   _pages = pages.split('-')[1];

		   password = window.external.GetCountPage(_path).split(',')[1];

		}
		catch(err)
		{
			
		}

		_path = Base64.encode(_path);
		//防止文件重复选择
		flieErr = _preventRepeatChoice(_path);

		if(!flieErr){
			return;
		}
		
		op = {
			fileName:fileName,
			fileSize:'',
			filePath:path,
			fullPath:_path,
			filePassword:password,
			filePages:pages,
			pages:_pages,
			name:name
		}

		output.push(op);

	} else {

		files = evt.target.files?evt.target.files:evt.dataTransfer.files;
		//多文件上传只取一次文件路径
		fileOK = true

		for (let i = 0, f; f = files[i]; i++) {

			_path = '';
			//界面大小单位显示MB
			_size = `${(f.size/1000/1000).toPrecision(3)}MB`;
			//传输给客户端文件大小为kb且不带单位
			sendSize = f.size/1000;
			//文件名
			name = f.name;
			if(fileOK){
				//根据客户端要求传输的路径为不加文件名称的路径
				path = evt.target.value.split(name)[0];

				fileOK = false;
			}
			//文件完整路径（带文件名）
			_path = `${path}${name}`
			//文件类型
			_type = (name.split('.'))[name.split('.').length - 1];

			if(_type !== 'pdf'){

				alert('不支持除pdf文件')

				return;
			}
			//特殊字符转换
			if(regular.test(name)){

		    	name = Base64.encode(name);

		    }
			//返回文件总页数和密码
			try
			{
			   pages = window.external.GetCountPage(_path).split(',')[0];

			   _pages = pages.split('-')[1];

			   password = window.external.GetCountPage(_path).split(',')[1];

			}
			catch(err)
			{
				
			}

			_path = Base64.encode(_path);
			//防止文件重复选择
			flieErr = _preventRepeatChoice(_path);

			if(!flieErr){
				continue;
			}

			op = {
				fileName:f.name,
				fileSize:_size,
				sendSize:sendSize,
				filePath:path,
				fullPath:_path,
				filePassword:password,
				filePages:pages,
				pages:_pages,
				name:name
			}

		  	output.push(op);
		}

		fileOK = true;

	}

	_template(output);

}
/**
 * 防止文件重复选择
 */
function _preventRepeatChoice(path){

	let _length = filesArr.length;

	if(_length === 0){

		filesArr.push(path);

		return true;

	} else {

		for(let i = 0, max = filesArr.length; i < max; i++){

			if(filesArr[i] === path){

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

    let k = 1000,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + sizes[i];
}

/**
 * 获取文件名
 * @param  {[string]} str [文件名]
 * @return {[string]} 过滤后的文件名
 */
function getFileName(str){

 let reg = /[^\\\/]*[\\\/]+/g;

 str = str.replace(reg,'');

 return str;

}

/**
 * 登录信息模版
 * @param  {[string]} option 客户端传人的登录信息json串
 */
function SetUserInfo(option){

	$('.header-land').addClass('none');

	$('.land').removeClass('none');

	let _option = JSON.parse(option);

	let source = $('#land').html();

	let template = Handlebars.compile(source);

	let html = template(_option);

	$('.land').html(html);

	_userOff();

	_userEvent();

}
/**
 * 登录信息事件解绑
 */
 function _userOff(){

 	$('#img').off();

 	$('.personal').off();

 	$('.drops-update').off();

 	$('.drops-logout').off();
 }
/**
 * 个人信息事件绑定
 */
 function _userEvent(){
 	//登录信息下拉框
	$('.land').on('mousedown', (e)=> {

		$('#drops').removeClass('none');

		$(e.target).find('i').addClass('icon-u678');

	})
	//个人中心
	$('.personal').on('mousedown', ()=> {

		try
		{
		   window.external.PersonalCenter();
		}
		catch(err)
		{
			
		}
		
	})
	//升级会员
	$('.drops-update').on('mousedown', ()=>{

		try
		{
		   window.external.UpgradeMember();
		}
		catch(err)
		{
			
		}
		
	})
	//注销用户
	$('.drops-logout').on('mousedown', ()=> {

		try
		{
		   window.external.Logout();
		}
		catch(err)
		{
			
		}

		$('.header-land').removeClass('none');

		$('.land').addClass('none');
		
	})

 }
/**
 * 模版
 * @param  {[string]} data 文件信息数据
 */
function _template(data){

	let $scrollbar  = $('#table');

	let scrollbarData = $scrollbar.data("plugin_tinyscrollbar");

	let source = $('#template').html();

	let template = Handlebars.compile(source);

	let html = template(data);

	let scrollHeight;

	$('.tbody').append(html);
	//拖拽框隐藏
	$('#drag').addClass('none');

	$('#fileuploads').replaceWith('<input id="fileuploads" type="file" name="uploadFile" multiple=""  accept=".pdf">');

	_off();

	_event();

	fileChoice();
	//首次触发滚动条插件
	if(!scrollbarOK){

		$('#table').tinyscrollbar();

		scrollHeight = $('.thumb').height()-35;

		$('.thumb').height(scrollHeight);

		scrollbarOK = true;

	} else {
		//更新滚动条
		scrollbarData.update("relative");

		scrollHeight = $('.thumb').height()-35;

		$('.thumb').height(scrollHeight);
	}

}
/**
 * 自定义目录
 * @param  {[string]} opiton 客户端传入自定义目录路径
 */
function UserCustomDir(opiton){

	let $tr_boll = $('.tr[data-bool=1]');

	let html = $('.top-drop-k').html();

	let _html = $('.top-drop-html').html();

	if(opiton !== ''){

		$('.drop-path').text(opiton)
				   .attr('title',opiton)
				   .removeClass('none')

		$('＃start').attr('data-path',opiton);

		$tr_boll.attr('data-path', opiton);

	}
}
/**
 * ie9 ie8 ie7 客户端传入文件大小
 * @param  {[string]} size 客户端传入文件大小
 */
function GetFileSize(size){

	let Size;

	let sendSize;

	let _size = size.split('&');

	let _length = _size.length;

	let fileSize = _size[_length-1];

	let indexOf = size.lastIndexOf('&');

	let name = size.substring(0, indexOf);

	let _name = getFileName(name);
	//特殊字符转换
	if(regular.test(_name)){

    	_name = Base64.encode(_name);

    }

    _name ="'" + _name + "'";

	if(fileSize === '0'){

		Size = '0B'

	} else {
		//界面大小单位显示MB
		Size = `${(fileSize/1000/1000).toPrecision(3)}MB`;
	}

	sendSize = fileSize/1024;

	$(`.tr[data-name=${_name}]`).find('.fileSize')
		.text(Size)
	.end()
		.attr('data-fileSize', sendSize)
	.end();

}
/**
 * 转换文件进度条
 * @param  {[string]} opiton 客户端传入进度条进度值
 */
function SetConvertProgress(option){

	let _option = JSON.parse(option);

	let num = _option.progress + '%';
	//文件路径转换
	let path = Base64.encode(_option.filepath);

	let _open = $('.open[data-filepath='+'"'+path+'"'+']');

	_open.nextAll('.tr-delete').find('.open-text').addClass('none')

	_open.nextAll('.tr-delete').find('.tr-delete-r').addClass('none')

	_open.find('.success')
		.addClass('none')
	.end()
		.find('.am-progress').removeClass('none')
	.end()
		.find('.am-progress-bar').css('width',num) 
	.end() 

}
/**
 * 转换成功／转换失败样式操作
 */
function _changeCss(path, $state){

	let _name = getFileName(path);

	//特殊字符转换
	if(regular.test(_name)){

    	_name = Base64.encode(_name);

    }

    _name = "'" + _name + "'";

    let _tr = $(`.tr[data-name=${_name}]`);

 	let _trPublic = _tr.find('.tr-public');

 	let _int = $('#start').attr('data-int');
 	//转换成功/转换失败后可删除
 	_tr.find('.tr-delete-r').attr('data-success','true');
 	//转换成功/转换失败后可选择
 	_tr.find('.checkbox').attr('data-success','true');

 	_tr.find('.am-progress')
    	.addClass('none')
    .end()
    	.find('.am-progress-bar').css('width',0)
    .end()
    	.find($state).removeClass('none')
    .end()
    	.find('.open-text').attr('data-success','true')
    					   .removeClass('none')
    					   .attr('data-int',_int)
    .end()
    	.find('.open-folder').attr('data-success','true')
    					   .removeClass('none')
    .end()
    	.find('.tr-delete-r').removeClass('none')
    .end()
    	.find('.range').addClass('range-on')
    	.find('.checkbox').removeClass('checkbox-on')
    	.find('.range').removeClass('Not-allowed')
    .end()

    _tr.attr('data-isOk','0')
 	   .attr('data-path', path);

	_trPublic.css('cursor','pointer')
			 .attr('data-success','true');

}
/**
 * 文件转换成功接口
 * @param  {[string]} opiton 客户端传入文件转换成功路径（后缀为.pdf）
 */
 function ChangeSuccess(path){

 	_changeCss(path, '.success')

 }
 /**
 * 文件转换失败接口
 * @param  {[string]} opiton 客户端传入文件转换失败路径（后缀为.pdf）
 */
 function ChangeFail(path){

 	_changeCss(path, '.err')

 }
/**
 * 文件是否有选择
 */
function fileChoice(){

	let _num;

	let obj = $('.checkbox[data-checkbox="1"]');

	let _obj = $('.checkbox[data-checkbox="0"]');

	let $start = $('#start');
	//判断是否全选
	if(_obj.length === 0 && $('.checkbox').length !== 0){

		$('.top-checkbox').addClass('icon-u772');

	} else {

		$('.top-checkbox').removeClass('icon-u772');

	}
	//判断是否可以转换
	if(obj.length > 0 && file_num === 0){

		$start.addClass('isOk')

		$('.button-maks').addClass('none');

	} else {

		$start.removeClass('isOk')

		$('.button-maks').removeClass('none');
	}

}
/**
 * 转换全部完成
 */
function ChangeAllOver(){

	file_num = 0;

	fileChoice();
	//添加手势
	_gesture();
}
/**
 * 单选
 */
function _inputCheckbox(e){

	let box = $(e.target).attr('data-checkbox');

	let $topCheckbox = $('.top-checkbox');

	if(box === '1'){

		$(e.target).parents('tr').attr('data-bool','0');

		$(e.target).attr('data-checkbox', '0')
				   .removeClass('icon-u772');

		$topCheckbox.removeClass('icon-u772')
					.attr('data-checkbox', '0');

	} else {

		$(e.target).parents('tr').attr('data-bool','1');

		$(e.target).attr('data-checkbox', '1')
				   .addClass('icon-u772');

		if($('.checkbox[data-checkbox="0"]').length === 0){

			$topCheckbox.removeClass('icon-u772')
						.attr('data-checkbox', '1');

		}

	}

}
/**
 * 全选
 */
function _inputCheckboxs(e){

	let box = $(e.target).attr('data-checkbox');

	let $checkbox = $('.checkbox');

	let $tr = $('.tbody').find('tr');

	let $topCheckbox = $('.top-checkbox');

	if(box === '1'){

		$checkbox.removeClass('icon-u772')
				 .attr('data-checkbox', '0');

		$topCheckbox.attr('data-checkbox', '0');

		$tr.attr('data-bool','0');

	} else {

		$checkbox.addClass('icon-u772')
				 .attr('data-checkbox', '1');

		$topCheckbox.attr('data-checkbox', '1');

		$tr.attr('data-bool','1');

	}

}
/**
 * 禁止刷新
 */
document.onkeydown = function (e) {

	let ev = window.event || e;

	let code = ev.keyCode || ev.which;

	if (code == 116) {

		if(ev.preventDefault) {

			ev.preventDefault();

		} else {

		ev.keyCode = 0;

		ev.returnValue = false;

		}
	}
}
/**
 * 禁止操作dom
 */
function _ban(e){

	let $Public = $('.public');

	$('.button-maks').removeClass('none');

	$Public.css('cursor','not-allowed');

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
function _gesture(){

	let $Public = $('.public');

	$Public.css('cursor','pointer');

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
 * 开始转换的样式操作
 */
function _startCss(obj, i){
	//禁止操作样式
	let _public = $(obj[i]).find('.tr-public');

	$(obj[i]).find('.range').addClass('Not-allowed');

	_public.css('cursor','not-allowed')
		   .attr('data-success','false')

	$(obj[i]).find('.tr-delete-r').attr('data-success','false');
	//所以页面
	$(obj[i]).find('.range')
		.removeClass('range-on')
	.end()
		.attr('data-isOk','1')
	.end()
	//单选框
	$(obj[i]).find('.checkbox').addClass('checkbox-on');
	//全选框
	$('.top-checkbox').addClass('checkbox-on');

}
/**
 * 删除文件
 * @param  {[object]} file 
 */
function _delete(file){
	//取消文件后还可以上传该文件
	file.val('')
		.after(file.clone().val(""))
		.remove(); 

	_off();

	_event();

	fileChoice();

}
/**
 * 更新滚动条
 */
function _scrollUpdate(){

	let $scrollbar  = $('#table');

	let scrollbarData = $scrollbar.data("plugin_tinyscrollbar");

	let scrollHeight;
	//更新滚动条
	scrollbarData.update("relative");

	scrollHeight = $('.thumb').height()-35;

	$('.thumb').height(scrollHeight);

}
/**
 * 拖拽框显示
 */
function _drag(){

	let file = $("#fileupload");

	if($('.tr').length === 0){
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
function _event(){
	//关于我们
	$('.aboutUs').on('mousedown', () =>{

		window.open("http://pdf2word.foxitreader.cn")

	})
	//屏蔽鼠标右键
	$(document).bind("contextmenu",(e) =>{   
	        return false;      
	})
	//选择文件事件监听
	$('#fileupload').on('change',(e) =>{

		handleFileSelect(e)

	})
	//选择文件事件监听
	$('#fileuploads').on('change',(e) =>{

		handleFileSelect(e) 

	})
	//转换格式\保存路径下拉框mousedown
	$('.drop-r').on('mousedown', (e) =>{

		let _drop = $(e.target).attr('data-html')?$(e.target).parent():$(e.target);

		let path = $(e.target).attr('data-path')?$(e.target).attr('data-path'):$(e.target).parent().attr('data-path');

		if(file_num === 0){

			$(`.drop-path[data-path=${path}]`).toggleClass('none');

			_drop.toggleClass('act');

			_drop.next().toggleClass('none');

			_drop.find('.drop-i').toggleClass('icon-u107');
			
		}

	})
	//保存路径mousedown
	$('.top-drop-k').on('mousedown', (e) =>{

		let path = $(e.target).attr('data-path');

		if(path === '1'){

			$(e.target).attr('data-path','0');

			try
			{
				window.external.UserCustomDir();
			}
			catch(err)
			{
				
			}

		} else {

			$('.drop-path').addClass('none');

			$(e.target).attr('data-path','1');

		}

	})
	//转换格式mousedown
	$('.foot-drop-k').on('mousedown', (e) =>{

		let html = $(e.target).html();

		let _html = $('.foot-drop-html').html();

		let Int = $(e.target).attr('data-int');

		let _Int = $('.foot-drop-html').attr('data-int');

		$(e.target).html(_html);

		$('.foot-drop-html').html(html);

		$(e.target).attr('data-int',_Int);

		$('.foot-drop-html').attr('data-int',Int);

		$('#start').attr('data-int',Int);

		$(e.target).addClass('none');

	})
	//转换格式\保存路径下拉框hover
	$('.drop-r').hover((e) =>{

		let _drop_r = $(e.target).parents('.drop-r').length>0?$(e.target).parents('.drop-r'):$(e.target);

		_drop_r.addClass('open');

	},(e) =>{

		let _drop_r = $(e.target).parents('.drop-r').length>0?$(e.target).parents('.drop-r'):$(e.target);

		let path = $(e.target).attr('data-path')?$(e.target).attr('data-path'):$(e.target).parent().attr('data-path');

		$(`.drop-path[data-path=${path}]`).removeClass('none');

		_drop_r.removeClass('open')
			   .removeClass('act')
		_drop_r.next().addClass('none')
			   .end()
					.find('.drop-i').removeClass('icon-u107')
			   .end()

	})
	//转换格式\保存路径下拉框hover
	$('.drop-k').hover((e) =>{

		let _drop_k = $(e.target);

		_drop_k.prev().find('.drop-i')
			.addClass('icon-u107')
		.end()
			.addClass('open')
			.addClass('act')
		.end()
			.removeClass('none')
		.end()

		let path = $(e.target).attr('data-hover')?$(e.target).attr('data-hover'):$(e.target).parent().attr('data-hover');

		$(`.drop-path[data-path=${path}]`).addClass('none');

	},(e) =>{

		let path = $(e.target).attr('data-hover')?$(e.target).attr('data-hover'):$(e.target).parent().attr('data-hover');

		$(`.drop-path[data-path=${path}]`).removeClass('none');

		let _drop_k = $(e.target)

		_drop_k.prev().find('.drop-i')
			.removeClass('icon-u107')
		.end()
			.removeClass('open')
			.removeClass('act')
		.end()
			.addClass('none')
		.end()

	})
	//全选
	$('.top-checkbox').on('mousedown', (e) =>{

		if(file_num === 0){

			_inputCheckboxs(e);

			fileChoice();

		}

	})
	//单选
	$('.tbody').on('mousedown', '.checkbox', (e) =>{

		let _success = $(e.target).attr('data-success');

		if(_success === 'true'){

			_inputCheckbox(e);

			fileChoice();

		}

	})
	//单条删除
	$('.tbody').on('mousedown', '.tr-delete-r', (e) =>{

		let _pathArr = $(e.target).attr('data-filepath');

		let _success = $(e.target).attr('data-success');

		if(_success === 'true'){

			$(e.target).parents('tr').remove();
			//删除数组中文件的记录供下次添加文件可以正常添加
			filesArr.splice($.inArray(_pathArr,filesArr),1);

			_drag();

		}

	})
	//全选删除
	$('.foot-delete').on('mousedown', (e) =>{

		let $filepath = $('.tr[data-bool=1]');

		let _pathArr;

		if(file_num === 0){
			
			$filepath.each(function() {

				_pathArr = $(this).find('.tr-delete-r').attr('data-filepath')
				//删除数组中文件的记录供下次添加文件可以正常添加
				filesArr.splice($.inArray(_pathArr,filesArr),1);

			}) 

			$('.tr[data-bool=1]').remove();

			$('.top-checkbox').attr('data-checkbox', '1');

			$('.top-checkbox').removeClass('icon-u772');

			_drag();

		}	

	})
	//立即转换
	$('#start').on('mousedown', (e) =>{

		let obj = $('.tr[data-bool="1"]'),
			fileName,
			fileSize,
			filePath,
			data = {},
			arr = [],
			option,
			password,
			convertRange,
			convertType,
			conversionIsOk

		//判断保存文件是在自定路径还是相同路径"file_custom" false 相同路径 "file_custom" true 自定义路径
		let path = $(e.target).attr('data-path');

		//输出文件格式 convertType = "0" 输出RTF, convertType="1" 输出DOCX 
		convertType = $(e.target).attr('data-int');

		if(obj.length !== 0 && file_num === 0){

			for(let i = 0, max = obj.length; i < max; i++){
				
				_startCss(obj, i)
				//文件上传客户端
				data = {}
				//文件名字
				fileName = obj[i].getAttribute('data-name');
				//文件大小
				fileSize = obj[i].getAttribute('data-fileSize');
				//文件路径
				filePath = obj[i].getAttribute('data-filePath'); 
				//文件密码
				password = obj[i].getAttribute('data-password');
				//文件页数
				convertRange = obj[i].getAttribute('data-pages'); 

				data = {fileName, fileSize, filePath, password, convertRange};

				arr.push(data);

			}
			
			option = {
				changePath:path,
				convertType:convertType,
				files:arr
			}

			option = Base64.encode(JSON.stringify(option));
			
			try
			{
			   conversionIsOk = window.external.StartPDF2WORD(option);
			}
			catch(err)
			{
				
			}
			//是否可以转换，conversionIsOk = "true" 可以转换（执行样式控制）conversionIsOk = "true" 不可以转换
			if(conversionIsOk === "true"){
				//用于判断客户端是否转换完成
				file_num = 1;
				//转换禁止操作dom
				_ban(e);
			}

		}

	})
	//自定义调取客户端打开文件夹
	$('.drop-path').on('mousedown', (e) =>{

		if(file_num === 0){

			try
			{
			   window.external.UserCustomDir();
			}
			catch(err)
			{
				
			}
		}

	})
	//打开文件调用客户端文件
	$('.open-text').on('mousedown', (e) =>{
		//获取文件路径（pdf后缀）
		let path = $(e.target).parents('tr').attr('data-path');

		let success = $(e.target).attr('data-success');

		let _int = $(e.target).attr('data-int');

		//文件格式转换（转换为转换后的后缀）
		if(_int === '0'){

			path = path.replace('.pdf','.rtf');

		} else {

			path = path.replace('.pdf','.docx');

		}

		if(success === 'true'){

			try
			{
			   window.external.OpenFile(path);
			}
			catch(err)
			{
				
			}

		}

	})
	//打开文件夹调用客户端文件夹
	$('.open-folder').on('mousedown', (e) =>{
		//获取文件路径（pdf后缀）
		let path = $(e.target).parents('tr').attr('data-filePath');

		let success = $(e.target).attr('data-success');

		if(success === 'true'){

			try
			{
			   window.external.OpenFileDir(path);
			}
			catch(err)
			{
				
			}

		}

	})
	//最小化
	$('.minimize').on('mousedown', (e) =>{

		try
		{
		   window.external.Min();
		}
		catch(err)
		{
			
		}

	})
	//关闭
	$('.delete').on('mousedown', (e) =>{

		try
		{
		   window.external.Close();
		}
		catch(err)
		{
			
		}

	})
	//创建桌面快捷方式
	$('.shortcut').on('mousedown', () =>{

		try
		{
		   window.external.SetDeskIcon();
		}
		catch(err)
		{
			
		}

	})
	//检查更新
	$('.update').on('mousedown', () =>{

		try
		{
		   window.external.CheckUpdate();
		}
		catch(err)
		{
			
		}
		
	})
	//下拉列表
	$('.miniDown').on('mousedown', () =>{

		$('#drop').removeClass('none');

	})
	//顶部列表点击空白处隐藏
	$(document).bind("mousedown",(e) =>{ 

        let target = $(e.target); 

        if(target.closest(".miniDown").length === 0 ){ 

            $("#drop").addClass('none');

        } 
    })
    //所有页面下拉框点击空白处隐藏
	$(document).bind("mousedown",(e) =>{ 

        let target = $(e.target); 

        if(target.closest(".range").length === 0 ){ 

            $('.all-drop').addClass('none');

            $('.range').attr('data-open','0');

        } 
    })
    //登录信息点击空白处隐藏
	$(document).bind("mousedown",(e) =>{ 

        let target = $(e.target); 

        if(target.closest(".land").length === 0 ){ 

            $("#drops").addClass('none');

			$('.land').find('i').removeClass('icon-u678');

        } 
    })
	//登陆
	$('.no-land').on('mousedown', () =>{

		try
		{
		   window.external.Login();
		}
		catch(err)
		{
			
		}

	})
	//转换页数弹框
	$('.tbody').on('mousedown','.other', (e) =>{

		let _path = $(e.target).attr('data-path') + $(e.target).attr('data-name');

		let _pass = $(e.target).attr('data-password');

		let path = $(e.target).attr('data-filePath')

		try
		{
		   let pages = window.external.ChangeConvertPage(_path, _pass);
		   //转换页数弹框点击取消按钮不改变输入框值
		   if(pages !== ''){

		   		$('.all').html('所有页面')
		   				 .removeClass('none');

		   		$('.range[data-filePath='+'"'+path+'"'+']').html(pages);

		   		$('.other[data-filePath='+'"'+path+'"'+']').parents('tr').attr('data-pages',pages);

		   }

		}
		catch(err)
		{
			
		}

	})
	//所有页面点击
	$('.tbody').on('mousedown','.all', (e) =>{

		let pages = $(e.target).attr('data-pages');

		$(e.target).html('')
				   .addClass('none')

		$(e.target).parents('.all-drop').prevAll('.range').html('所有页面');

		$(e.target).parents('tr').attr('data-pages',pages);

	})
	//"所有页面"移入
	$('.range-on').hover((e) =>{

	},(e) =>{

		$(e.target).attr('data-open','0')

		$(e.target).nextAll('.all-drop').addClass('none');

		$(e.target).find('.row').removeClass('icon-u107');

		$(e.target).removeClass('range-active');

	})
	$('.all-drop').hover((e) =>{

		let $allDrop = $(e.target).parents('.all-drop');

		$allDrop.removeClass('none');

		$allDrop.prevAll('.range').addClass('range-r')

		$allDrop.prevAll('.range').find('.row').addClass('icon-u107');

	},(e) =>{

		let $allDrop = $(e.target).parents('.all-drop').length>0?$(e.target).parents('.all-drop'):$(e.target);

		$allDrop.addClass('none');

		$allDrop.prevAll('.range').removeClass('range-r')

		$allDrop.prevAll('.range').find('.row').removeClass('icon-u107');

	})
	//"所有页面"下拉框
	$('.tbody').on('mousedown','.range-on', (e) =>{

		let $range = $(e.target).attr('data-success')?$(e.target):$(e.target).parent();

		let open = $range.attr('data-open');

		$range.addClass('range-active');

		if(open === '0'){

			$range.nextAll('.all-drop').removeClass('none');

			$range.find('.row').addClass('icon-u107');

			$range.attr('data-open','1');

		} else {

			$range.find('.row').removeClass('icon-u107');

			$range.nextAll('.all-drop').addClass('none');

			$range.attr('data-open','0');

		}

	})

}

/**
 * 事件解除绑定
 */
function _off(){

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

	$('.text').off();

	$('.open-text').off();

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
