/**
 * Created by yangliling on 2018/6/7.
 */
var db = require('../common/basicConnection');
var $sqlCommands = require('../common/sqlCommand');
var config = require('../conf/config');

/**
 * 添加一条动漫资讯
 */
function addOneAnime(info, callback) {
    db.queryArgs($sqlCommands.anime.insertOne, [info.href, info.title, info.imgurl, info.txt, info.time], function (err, result) {
        if (!err){
            if(result.affectedRows){
                callback(1);
            }else {
                //console.log(err);
                callback(0);
            }
        }else {
            callback(0);
            console.log(err);
        }
    })
}

/**
 * 添加一条动漫资讯详情
 */
function addOneAnimeDetail(info) {
    var params = [
        info.href,
        info.title,
        info.time,
        info.source,
        info.txt,
        info.images,
        info.videos
    ];

    db.queryArgs($sqlCommands.animedetail.insertOne, params, function (err, result) {
        if(err){
            console.log(err);
        }
    })
}

/**
 * 查询动漫资讯列表
 */
function queryAnimeList(req, res, next) {
    var param = config.getParams(req);
    
    var pageNo = +param.pageNo;
    var pageSize = +param.pageSize;
    
    var s = (pageNo - 1) * pageSize;
    
    db.queryArgs($sqlCommands.anime.queryAll, [s, pageSize], function (err, result) {
        var info;
        if(!err){

            db.query($sqlCommands.anime.queryCount, function (err, count) {
                if(!err){

                    var c = JSON.stringify(count[0]);
                    c = JSON.parse(c)['COUNT(*)'];

                    console.log(c);

                    var resultInfo = {
                        pageSize: pageSize,
                        pageCount: Math.ceil(c/pageSize),
                        toatleCount: c,
                        list: result
                    };
                    info = {
                        code: 200,
                        msg: 'success',
                        result: resultInfo
                    };
                }else {
                    info = count;
                    console.log(err);
                }
                db.doReturn(res, info);
            });
        }else {
            info = result;
            console.log(err.sqlMessage);
            db.doReturn(res, info);
        }
        
    })
}

/**
 * 查询动漫资讯详情
 */
function queryAnimeDetail(req, res, next) {
    var param = config.getParams(req);
    var urlId = param.urlId;
    
    console.log(urlId);
    db.queryArgs($sqlCommands.animedetail.queryDetail, [urlId], function (err, result) {
        var info;
        if(!err){
            console.log(result);
            info = {
                code: 200,
                msg: 'success',
                result: result
            };
        }else {
            console.log(err);
            info = result;
        }
        db.doReturn(res, info);
    })
}

module.exports = {
    addAnimeAction: addOneAnime,
    addAnimeDetailAction: addOneAnimeDetail,
    queryAnimeList: queryAnimeList,
    queryAnimeDetail: queryAnimeDetail
};
