/**
 * Created by yangliling on 2018/5/31.
 * 一些基本配置
 */
//发送邮件基本配置
var email = {
    service: 'QQ',
    user: '630487944@qq.com',
    pass: 'egmikgaxexzobfeb'
};

//爬虫
var cheerio = require('cheerio');
var requset = require('request');
function startFeach(url, callback) {
    requset({url:url,headers:{'User-Agent':'request'}}, function (error, response, body) {
        if(!error && response.statusCode == 200){
            var $ = cheerio.load(body);
            callback($);
        }else {
            console.log(error);
            console.log(response.statusCode);
            console.log(body);
        }
    })
}

//获取请求参数
function getParams(req) {
    var param;

    if(Object.keys(req.query).length){
        param = req.query;        //get
    }else {
        param = req.body;         //post
    }
    
    return param;
}

module.exports = {
    email: email,
    startFeach: startFeach,
    getParams: getParams
};