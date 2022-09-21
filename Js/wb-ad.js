/**
 * 参考@zmqcherish 的脚本
 * 1、删除发现页顶部热搜模块的广告条目
 * 2、删除发现页的轮播广告图(对比了广告和正常的数据，没有区别，所以直接删掉轮播图模块)
 * https://api.weibo.cn/2/search/(finder|container_timeline|container_discover)
 * 配置QX重写：在[rewrite_remote]下填写👇🏻配置
 * https://raw.githubusercontent.com/fmz200/jd_scripts/master/others/weibo/weibo.conf, tag=微博移除发现页广告@fmz200, update-interval=172800, opt-parser=false, enabled=true
 */

const url1 = '/search/finder';
const url2 = '/search/container_timeline';
const url3 = '/search/container_discover';

function modifyMain(url, data) {
    let dataModify = JSON.parse(data);
    // 首次点击发现按钮
    if (url.indexOf(url1) > -1) {
        if (dataModify.channelInfo && dataModify.channelInfo.channels
            && dataModify.channelInfo.channels[0].payload && dataModify.channelInfo.channels[0].payload.items) {
        }
    }

    console.log('没有广告数据🧧🧧');
    return data;
}

function removeHotSearchAds(groups) {
    console.log('移除发现页热搜广告开始💕');
    let newGroups = [];
    for (let group of groups) {
        if (group.item_log && (group.item_log.search_flag || group.item_log.nav)) { // 广告没有search_flag字段，只有group.item_log.adid
            newGroups.push(group);
        }
    }
    console.log('移除发现页热搜广告结束💕💕');
    return newGroups;
}

var body = $response.body;
var url = $request.url;

body = modifyMain(url, body);

$done({body});
