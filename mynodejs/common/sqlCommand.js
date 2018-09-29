/**
 * Created by yangliling on 2018/5/29.
 * mysql语句集合
 */

//user表
var user_status = {
    insertOne:'INSERT INTO user (code, nick, email, password) VALUES(?, ?, ?, ?)',
    deleteOne:'DELETE FROM user WHERE code = ?',
    updateOne:'UPDATE user SET nick= ?,email = ?,password = ? WHERE code = ?',
    searchByNick:'SELECT * FROM user WHERE nick = ?'
};

//anime表
var anime_status = {
    insertOne: 'INSERT IGNORE INTO anime (href, title, imgurl, txt, time) VALUES(?, ?, ?, ?, ?)',
    queryAll: 'SELECT * FROM anime ORDER BY time DESC LIMIT ?,?',
    queryCount: 'SELECT COUNT(*) FROM anime'
};

//animedetail表
var animedetail_status = {
    insertOne: 'INSERT IGNORE INTO animedetail (href, title, time, source, txt, images, videos) VALUES(?, ?, ?, ?, ?, ?, ?)',
    queryDetail: 'SELECT * FROM animedetail WHERE href = ?'
};

module.exports = {
    user: user_status,
    anime: anime_status,
    animedetail: animedetail_status
};