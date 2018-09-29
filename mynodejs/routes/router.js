/**
 * Created by yangliling on 2018/6/4.
 * 路由集合以及定时执行爬虫任务
 */
exports.setRequestUrl = function (app) {
    var user = require('./users');
    var index = require('./index');
    var infos = require('./infos');

    /* 后台管理 */
    app.use('/admin/login', index.login);
    app.use('/admin/onlogin', index.onlogin);
    app.use('/admin/index', index.index);
    
    /* 客户端 */
    
    /* 用户模块 */
    app.use('/client/users/sendmail', user.sendMail);
    app.use('/client/users/register', user.register);
    app.use('/client/users/captcha', user.captcha);
    app.use('/client/users/login', user.login);
    
    /* 资讯 */
    app.use('/client/anime/list', infos.animelist);
    app.use('/client/anime/detail', infos.animedetail);
};

var schedule = require('node-schedule');
var animeInfos = require('../worm/anime');
exports.catchWebPage = function () {

    //定时每天12:20执行，爬取动漫星空网页
    var rule = new schedule.RecurrenceRule();
    rule.hour = 12;
    rule.minute = 20;
    schedule.scheduleJob(rule, function () {
        animeInfos.feachNews('http://acg.gamersky.com/news/');
    });

    //定时每天17:40执行，爬取动漫星空网页
    var rule2 = new schedule.RecurrenceRule();
    rule2.hour = 16;
    rule2.minute = 23;
    schedule.scheduleJob(rule2, function () {
        animeInfos.feachNews('http://acg.gamersky.com/news/');
    });
};