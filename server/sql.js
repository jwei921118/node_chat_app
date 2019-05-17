let mysql = require('mysql');
const SQL_CONFIG = require('./mysqlConfig');
const connectionParam = {...SQL_CONFIG, database: 't1'};
const UserSQL = {
    insert: 'INSERT INTO userinfo(usename,id) VALUES(?,?)',
    queryAll: 'SELECT * FROM userinfo',
    getUserById: 'SELECT * FROM userinfo WHERE id = ? '
}
console.log(connectionParam);
let connection = mysql.createConnection(connectionParam);
connection.connect();

// connection.query(UserSQL.insert, ['tom',4], function (error, results, fields) {
//     if (error) {
//         throw error;
//     }
//     console.log(results);
//     console.log('The solution is: ', results[0].solution);
//     connection.release();
//   });
  connection.query(UserSQL.queryAll, function (error, results, fields) {
    if (error) {
        throw error;
    }
    console.log(results);
    console.log('The solution is: ', results[0].solution);
    connection.end()
  });


//   var UserSQL = {  
//     insert:'INSERT INTO User(uid,userName) VALUES(?,?)', 
//     queryAll:'SELECT * FROM User',  
//     getUserById:'SELECT * FROM User WHERE uid = ? ',
//   };
// module.exports = UserSQL;