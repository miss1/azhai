/**
 * Created by yangliling on 2018/5/31.
 * 邮件发送
 * 调用sendMail方法
 */
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var config = require('../conf/config');

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: config.email.service,
    auth: {
        user: config.email.user,
        pass: config.email.pass
    }
}));

/**
 * @param recipient 收件人
 * @param subject 发送的主题
 * @param html 发送的html内容
 * @param res 返回给前端的消息
 */
var sendMail = function (recipient, subject, html, res) {

    smtpTransport.sendMail({
        from: config.email.user,
        to: recipient,
        subject: subject,
        html: html
    }, function (error, response) {
        var result;
        if (error){
            console.log(error);
            result = {
                code: 201,
                msg: '验证码发送失败'
            };
        }else {
            result = {
                code: 200,
                msg: '验证码发送成功'
            };
        }
        res.json(result);
    });
};

module.exports = sendMail;