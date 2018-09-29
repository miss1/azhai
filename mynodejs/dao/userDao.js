/**
 * Created by yangliling on 2018/5/29.
 */
var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');
var config = require('../conf/config');

/**
 * 添加一个用户
 */
function addUserAction(req, res, next) {
    // 获取前台页面传过来的参数
    var param = config.getParams(req);

    var code = new Date().getTime();

    code +=param.email.split('@')[0];

    //执行query
    db.queryArgs($sqlCommands.user.insertOne, [code, param.nick, param.email, param.password],function (err, result) {
        if (!err){
            result = {
                code: 200,
                msg: '注册成功'
            };
        }
        // 以json形式，把操作结果返回给前台页面
        db.doReturn(res, result);
    })
}

/**
 * 搜索用户，登陆用
 */
function searchUserAction(req, res, next) {
    // 获取前台页面传过来的参数
    var param = config.getParams(req);

    var nickname = param.nick;
    var password = param.password;
    
    var info = '';

    db.queryArgs($sqlCommands.user.searchByNick, [nickname],function (err, result) {
        if (!err){
            if (result.length == 0){
                info = {
                    code: 201,
                    msg: '用户不存在'
                };
            }else {
                if (password === result[0].password){
                    req.session.usercode = result[0].code;
                    info = {
                        code: 200,
                        msg: '登陆成功',
                        result: {
                            code: result[0].code,
                            nick: result[0].nick,
                            email: result[0].email
                        }
                    }
                }else {
                    info = {
                        code: 201,
                        msg: '密码错误'
                    };
                }
            }
        }else {
            info = result;
        }
        db.doReturn(res, info);
    })
}

module.exports = {
    addUserActions: addUserAction,
    searchUserAction: searchUserAction
};