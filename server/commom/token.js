'use strict';
const crypto = require('crypto');

/**
 * 创建token
 * @param {*} data 
 * @param {*} timeout 
 */
function createToken(data, timeout) {
    let obj = {
        data: data,
        created: parseInt(Date.now() / 1000),
        exp: parseInt(timeout)
    }
    // payload 信息
    let base64Str = Buffer.from(JSON.stringify(obj) ,'utf8').toString('base64');

    let secret="sup627.com";
    let hash=crypto.createHmac('sha256',secret);
    hash.update(base64Str);
    let signature = hash.digest('base64');

    return  `${base64Str}.${signature}`;
};

/**
 * 解析token
 * @param {*} token 
 */
function decodeToken(token) {
    let decArr = token.split('.');
    if (decArr.length < 2) {
        // 不合法
        return falsel;
    }

    let payload = {};

    try {
        payload = JSON.parse(Buffer.from(decArr[0] , 'base64').toString('utf8'));
    } catch {
        return false;
    }

    let secret="sup627.com";
    let hash=crypto.createHmac('sha256',secret);
    hash.update(decArr[0]);
    let checkSignature = hash.digest('base64');
    return {
        payload: payload,
        signature: decArr[1],
        checkSignature: checkSignature
    }
}

/**
 * 验证token
 * @param {*} token 
 */
function checkToken (token) {
    let resDecode = decodeToken(token);

    if (!resDecode) {
        return false;
    }

    let expState = (parseInt(Date.now / 1000) - parseInt(resDecode.payload.created) > parseInt(resDecode.payload.exp)) ? false : true;

    if (resDecode.signature === resDecode.checkSignature && expState) {
        return resDecode;
    }
    return false;
}

module.exports = { createToken , decodeToken , checkToken };