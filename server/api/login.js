var express = require('express');
var router = express.Router();
let RouterIntercept = require('../intercept/routeIntercept');
var userCtrl = require('../sqlctrl/user');

const intercept = new RouterIntercept();
intercept.getReqTime(router);
router.use(function setHeader(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
router.post('/' , function(req ,res) {
    // console.log(req);
    // res.send('a');
    // res.end();
    console.log(req.cookies);
    const body = req.body;

    userCtrl.getUser()
    .then((data) => {
        const flag = data.some((v) =>  ( v.username === body.username && v.password === body.password ) );
        if (flag) {
            res.cookie('user' , body.username);
            res.send({code: 0, message: '登录成功'});
        } else {
            res.send({code: 1 , message: '用户名或密码不正确'});
        }
        res.end();
    })
});

module.exports = router;