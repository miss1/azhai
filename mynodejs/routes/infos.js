/**
 * Created by yangliling on 2018/6/11.
 * 动漫资讯接口
 */
var express = require('express');
var animeDao = require('../dao/animeDao');

/* 查询动漫资讯列表 */
function getAnimeList(req, res, next) {

    animeDao.queryAnimeList(req, res, next);
    
}

/* 查询动漫资讯详情 */
function getAnimeDetail(req, res, next) {
    
    animeDao.queryAnimeDetail(req, res, next)
    
}

module.exports = {
    animelist: getAnimeList,
    animedetail: getAnimeDetail
};