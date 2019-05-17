let MYSQL_CONFIG = require('../db/DBConfig.js');
const mysqlOpreation = require('../db/opreation.js');

const sqlOera = new mysqlOpreation(MYSQL_CONFIG);

function insertUser (query) {
    return sqlOera.insert('userinfo' , query);
}

function getUser (query = '' ) {
    return sqlOera.select('userinfo' , query);
}

function checkUsertable() {
    return sqlOera.checkKey('userinfo', 'chatu');
}

module.exports = {insertUser,getUser,checkUsertable};



