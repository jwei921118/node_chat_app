var express = require('express');
var router = express.Router();
let RouterIntercept = require('../intercept/routeIntercept');

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
    console.log(req);
    const param = req.query;
    res.send(param);
    res.end();
});

module.exports = router;