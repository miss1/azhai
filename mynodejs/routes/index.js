/**
 * Created by yangliling on 2018/5/29.
 * 路由，后台admin
 */

var express = require('express');

/* 后台登陆页 */
function login(req, res, next) {
    res.render('login', { title: 'Express', msg: '' });
}

/* 登陆操作 */
function onLogin(req, res, next) {
    console.log(req.body);
    var user = req.body.username;
    var paw = req.body.password;

    if (user === 'admin' && paw === '123456'){
        req.session.admin = 'admin';
        res.redirect('/admin/index');
    }else {
        res.render('login', { title: 'Express', msg: '用户名或密码错误！' });
    }
}

/* 首页 */
function index(req, res, next) {
    res.render('index', { title: 'Express', msg: 'index' });
}

module.exports = {
    login: login,
    onlogin: onLogin,
    index: index
};
