
let MYSQL_CONFIG = require('../../db/DBConfig.js');
const mysqlOpreation = require('../../db/opreation.js');

function getAllUser () {
    let sqlOera = new mysqlOpreation(MYSQL_CONFIG);
    // console.log(sqlOera);
    return sqlOera.select('userinfo');
}

module.exports = getAllUser;
