let mysql = require('mysql');
let createConnection = require('./connection.js');
let SQl_STATEMENTS =  require('./sqlStatement.js');

class mysqlOpreation {
    // 变量
    // connection;
    /**
     * 构造函数
     * @param {*} connectionParam 
     */
    constructor(connectionParam) {
        this.connection = createConnection(connectionParam);
        return this;
    }

    /**
     * 
     * @param {*} tableName 数据库表名称
     * @param {*} data 
     */
    insert(tableName,data) {
        let _this = this;
        let connection = this.connection;
        
        return new Promise(function(resolve , reject) {
            let command = SQl_STATEMENTS.insert(tableName);
            connection.query(command, data, (err , results , fields) => {
                if (err) {
                    _this.handlerError(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    /**
     * 
     * @param {*} tableName 表名称
     * @param {*} data 字段
     */
    select(tableName,data) {
        let _this = this;
        let connection = this.connection;
        return new Promise(function(resolve , reject) {
            
            let command = SQl_STATEMENTS.select(tableName,data);
            
            connection.query(command, (err , results , fields) => {
                if (err) {
                    _this.handlerError(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
            
        });
    }

    /**
     *  获取数据库表虽有的值 
     * @param {*} tableName 表名
     * @param {*} database 库名
     */
    checkKey(tableName , database) {
        let _this = this;
        let connection = this.connection;
        return new Promise(function(resolve, reject) {
            let command = SQl_STATEMENTS.checkKey(tableName,database);

            connection.query(command, (err , results , fields) => {
                if (err) {
                    _this.handlerError(err);
                    reject(err);
                } else {
                    let o = {};
                    results.map((v) => {
                        o[v.COLUMN_NAME] = ''; 
                    });
                    
                    resolve(o);
                }
            });
        });
    }

    /**
     * 处理错误
     * @param {*} err 
     */
    handlerError(err) {
        console.log(err);
        new Error(err);
    }


}

module.exports = mysqlOpreation;