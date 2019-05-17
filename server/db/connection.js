let mysql = require('mysql');
function createConnection (connectionParam) {
    let connection =  mysql.createConnection(connectionParam , (err) => {
        if (err) {
             // console.error('error connecting: ' + err.stack);
             new Error('error connecting: ' + err.stack);
        }
    });
    connection.connect();
    return connection;
}
module.exports = createConnection;