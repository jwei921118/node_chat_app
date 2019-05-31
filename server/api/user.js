
const express = require('express');
const router = express.Router();
let RouterIntercept = require('../intercept/routeIntercept');
const userCtrl = require('../sqlctrl/user');
let tokenCheck = require('../intercept/tokenCheck');
let util = require('../commom/uilt');

// const intercept = new RouterIntercept();
// intercept.getReqTime(router);

let resData = {
    username: '',
    telphone: '',
    email: '',
    sex: '',
    id: ''
};

router.use(function setHeader(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
router.use(tokenCheck());
router.get('/list' , function(req ,res) {
    let tokenStr = req.cookies.token;
    console.log(tokenStr);
    let userInfo = req.currentUser;
    console.log(userInfo);
    userCtrl.getUser()
    .then((data) => {
        util.mapObject(resData , data);
        res.send(resData);
        res.end();
    });
});

module.exports = router;