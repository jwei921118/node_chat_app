class RouterIntercept {
    constructor() {}

    getReqTime(router) {
        router.use(function timeLog(req,res,next) {
            console.log('Time: ' , Date.now() );
            next();
        });
        return router;
    }
}

module.exports = RouterIntercept;