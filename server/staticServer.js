var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

function staticRoot (staticPath ,req ,res) {
    console.log(url.parse(req.url));
    var pathObj = url.parse(req.url ,true);

    var filePath = path.join(staticPath, pathObj.pathname);
    // 同步读取
    // var fileContent = fs.readFileSync(filePath , 'binary');
    // res.write(fileContent, 'binary');
    // res.end();

    // 异步读取
    fs.readFile(filePath , 'binary', function(err , fileContent) {
        if (err) {
            console.log('404');
            res.writeHead(404, 'notFound');
            res.end('<h1>404</h1>');
            res.end();
        } else {
            console.log('ok');
            res.writeHead(200 , 'ok');
            res.write(fileContent , 'binary');
            res.end();
        }
    });
}

console.log(path.resolve(__dirname , 'static'));

var server = http.createServer(function(req,res) {
    staticRoot(path.resolve(__dirname , 'static') , req ,res);
});
server.listen(8080);
console.log('http://localhost:8080');