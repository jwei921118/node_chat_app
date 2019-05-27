'use strict';

const tokenCtrl = require('../commom/token');


/**
 * 验证token的中间件
 */
function tokenCheck() {
    return function (req,res,next) {
        let token = req.cookies.token;
        if (token) {
            let flag = tokenCtrl.checkToken(token);
            if (!flag) {
                res.send({code: '1' , message: 'token信息错误'});
                res.end();
            } else {
                req.currentUser = flag.payload.data;
            }
        } else {
            res.send({code: '1' , message: 'token过期'});
            res.end();
        }
        next();
    }
}
module.exports = tokenCheck;