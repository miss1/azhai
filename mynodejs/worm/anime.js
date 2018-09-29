/**
 * Created by yangliling on 2018/6/6.
 * 爬虫，爬取动漫星空网站，动漫资讯模块
 */
var promise = require('promise');
var conf = require('../conf/config');
var animeDao = require('../dao/animeDao');

function feachNews(url) {
    console.log('start fetch anime');
    conf.startFeach(url, function ($) {
        dealAnimeInfo($);
    })
}

//处理列表信息
function dealAnimeInfo($) {
    var list = [];

    $('.contentpaging li').each(function () {
        var url = $(this).find('.tit a').attr('href');
        var strs = url.split('/');

        var infos = {
            title: $(this).find('.tit a').text(),
            href: strs[4]+strs[5],
            imgurl: $(this).find('.img a img').attr('src'),
            txt: $(this).find('.con .txt').text(),
            time: $(this).find('.con .tem .time').text()
        };

        list.push(addAnimeInfo(infos, url));
    });

    Promise.all(list).then(function (data) {
        console.log('end');
        featchDeatil(data);
    });
}

//将列表循环插入数据库（过滤掉重复数据）
function addAnimeInfo(info, url) {
    return new Promise(function (resolve, reject) {

        animeDao.addAnimeAction(info, function (i) {
            var detailUrl = '';           //列表详情页面的地址

            if(i){
                detailUrl = url;
            }
            resolve(detailUrl);
        });
    })
}

//抓取详情
function featchDeatil(urls) {
    urls.forEach(function (val, i) {
        if(val != ''){
            conf.startFeach(val, function ($) {
                var strs = val.split('/');

                var info = {
                    href: strs[4]+strs[5],
                    title: $('.MidL_title h1').text(),
                    time: $('.MidL_title .detail').find('.txt').eq(0).text(),
                    source: $('.MidL_title .detail').find('.txt').eq(1).text(),
                    txt: '',
                    images: '',
                    videos: ''
                };

                var txt = '';
                var images = '';
                var vedios = '';

                $('.MidL_con p').each(function () {
                    if($(this).attr('align')){

                        var img = $(this).find('a img').attr('src');
                        if(img){
                            images += img + ',';
                            txt += '#p/';
                        }else {
                            var _str = $(this).find('script').eq(1).html();
                            vedios += _str.split("'")[1] + ',';
                            txt += '#v/';
                        }

                    }else {
                        txt += $(this).text() + '/';
                    }
                });
                
                info.txt = txt;
                info.images = images;
                info.videos = vedios;

                //将提取到的数据插入到数据库
                animeDao.addAnimeDetailAction(info);
            })
        }
    });

}

module.exports = {
    feachNews: feachNews
};