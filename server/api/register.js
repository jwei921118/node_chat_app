
var express = require('express');
var router = express.Router();
var userCtrl = require('../sqlctrl/user');
var uilt = require('../commom/uilt');

// let RouterIntercept = require('../intercept/routeIntercept');

router.post('/', function (req,res) {
    console.log(req);
    const body = req.body;
    if (!body.username) {
        res.send({code:1 , message: '参数错误'});
        res.end();
        return;
    }
    userCtrl.getUser()
    .then((data) => {
       const userIsExist = data.some((v) => v.username === body.username);
       if (userIsExist) {
           res.send({code:0,message: '用户已经存在,请前往登录登录', type: '1'});
           res.end();
       } else {
           return body;
       }
    })
    .then((data) => {
        if (data) {
            userCtrl.checkUsertable('userinfo')
            .then((keys) => {
                uilt.map(keys, data);
                userCtrl.insertUser(keys)
                .then((result) => {
                    res.send({code:0, message: '注册成功', type: '2'});
                    res.end();
                });
            });
        }
    });
});

module.exports = router;