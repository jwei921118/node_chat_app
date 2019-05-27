const express = require('express');
const router = express.Router();
const RouterIntercept = require('../intercept/routeIntercept');
const userCtrl = require('../sqlctrl/user');
const tokenCtrl = require('../commom/token');

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
        const currentUser = data.filter((v) =>  ( v.username === body.username && v.password === body.password ) )[0];
        if (currentUser) {
            let tokenBase64Str =  tokenCtrl.createToken({username: currentUser.username , id: currentUser.id} , 10000);
            console.log(tokenBase64Str);
            res.cookie('token' , tokenBase64Str);
            res.send({code: 0, message: '登录成功'});
        } else {
            res.send({code: 1 , message: '用户名或密码不正确'});
        }
        res.end();
    })
});

module.exports = router;