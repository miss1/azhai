/**
 * Created by yangliling on 2018/5/29.
 * 路由接口处理，前端，用户模块
 */

var express = require('express');
var userDao = require('../dao/userDao');
var mail = require('../common/mail');
var config = require('../conf/config');

/* 给邮箱发送邮件，验证邮箱 */
function sendMail(req, res, next) {
    var param = config.getParams(req);
    
    var recipient = param.email;
    var captcha = getRenderNum();
    req.session.mailcap = captcha;
    mail(recipient, 'buddhistyouths 验证邮件', 'hi~，这是你的验证码：'+captcha, res);
}

/* 添加一个用户，注册 */
function register(req, res, next) {
    var param = config.getParams(req);
    
    var cap =  param.captcha;
    var captcha = req.session.mailcap;

    var tsts = testCaptcha(cap, captcha);

    if (tsts.bol){
        userDao.addUserActions(req, res, next);
    }else {
        var result = {
            code: 201,
            msg: tsts.msg
        };
        res.json(result);
    }
}

/* 获取验证码（登陆时） */
function captcha(req, res, next) {
    var captcha = getRenderNum();
    req.session.captcha = captcha;
    var result = {
        code: 200,
        msg: 'successful',
        result: captcha
    };
    res.json(result);
}

/* 登陆 */
function login(req, res, next) {
    var param = config.getParams(req);
    
    var cap =  param.captcha;
    var captcha = req.session.captcha;

    var tsts = testCaptcha(cap, captcha);

    if (tsts.bol){
        userDao.searchUserAction(req, res, next);
    }else {
        var result = {
            code: 201,
            msg: tsts.msg
        };
        res.json(result);
    }
}

/* 修改邮箱 */

/* 修改密码 */

/* 随机生成四位数 */
function getRenderNum() {
    var num = '';
    for (var i = 0; i < 4; i++){
        num += Math.floor(Math.random()*10);
    }
    return num;
}

/* 验证码验证 */
function testCaptcha(cap1, cap2) {
    var msg = '';
    if (cap2 == undefined || cap2 == null){
        msg = '验证码已失效';
        return {bol: false, msg: msg};
    }

    if (cap1 != cap2){
        msg = '验证码错误';
        return {bol: false, msg: msg};
    }

    return {bol: true, msg: ''};
}

module.exports = {
    sendMail: sendMail,
    register: register,
    captcha: captcha,
    login: login
};
