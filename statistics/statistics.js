/**
 * uuid/mac/reader/channel(渠道)/foxit(产品 区分领先版和GA版 FoxitPreview为领先版 FoxitReader为GA版本)
 */
function SetParam(option){

	var _option = option.split('&');

	window.uuid = _option[0];

	window.mac = _option[1];

	window.reader = _option[2];

	window.channel = _option[3];

} 
/**
 * 客户端发送转换量 “转换量_VIP用户/非VIP用户_转换成功/转换失败_版本号_渠道ID”
 */
function  ChangeAmount(option){

	var _option = option.split('&');

	var _vipIsOk = _option[0];

	var _changeIsOk = _option[1];

	var opt_label = "转换量_" + _vipIsOk + _changeIsOk + reader + channel;

	_baidu('clientPdfToWrod', 'change', opt_label);

}
/**
 * 发送百度统计
 * _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
 * 1. '_trackEvent': 固定参数，表明统计类型是时间跟踪。
 * 1. category：要监控的目标的类型名称，通常是同一组目标的名字，比如"视频"、"音乐"、"软件"、"游戏"等等。该项必选。
 * 1. action：用户跟目标交互的行为，如"播放"、"暂停"、"下载"等等。该项必选。
 * 1. opt_label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
 * 1. opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。
 */
function _baidu(category, action, opt_label){

    _hmt.push(['_trackEvent', category, action, opt_label, 1]);

}

