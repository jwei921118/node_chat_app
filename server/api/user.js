
var express = require('express');
var router = express.Router();
let RouterIntercept = require('../intercept/routeIntercept');
var userCtrl = require('../sqlctrl/user');


// const intercept = new RouterIntercept();
// intercept.getReqTime(router);
router.use(function setHeader(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
router.get('/list' , function(req ,res) {
    userCtrl.getUser()
    .then((data) => {
        res.send(data);
        res.end();
    });
});

module.exports = router;