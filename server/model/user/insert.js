
let MYSQL_CONFIG = require('../../db/DBConfig.js');
const mysqlOpreation = require('../../db/opreation.js');

function insert (query) {
    let sqlOera = new mysqlOpreation(MYSQL_CONFIG);
    return sqlOera.insert('userinfo' , query);
}

export { insert } ;
