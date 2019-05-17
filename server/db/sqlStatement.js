let SQl_STATEMENTS = {
    insert: function(tableName) {
        let sql_statement = 'INSERT INTO ' + tableName + ' SET ?';
        // if (data instanceof Object) {
        //     let keys = Object.keys(data);
        //     let values = Object.values(data); 
    
        //     keys.forEach((v,i) => {
        //         if(i < keys.length -1 ) {
        //             sql_statement = sql_statement + v + ',';
        //         } else {
        //             sql_statement = sql_statement + v + ') ';
        //         }
        //     });
        //     sql_statement+= 'VALUES(';
        //     values.forEach((v,i) => {
        //         if(i < keys.length -1 ) {
        //             sql_statement = sql_statement + v + ',';
        //         } else {
        //             sql_statement = sql_statement + v + ');';
        //         }
        //     });
        // } else {
        //     return '';
        // }
        return sql_statement;
    },
    select: function (tableName, data , type) {
        let sql_statement = '';
        if (type) {
            type = type.toLocaleUpperCase();
        } else {
            type = 'AND'
        }
        if (!data) {
            // 不存在option的时候选择获所有;
            sql_statement = `SELECT * FROM ${tableName}`;
        } else {
            if (data instanceof Object) {
                sql_statement = 'SELECT * FROM ' + tableName + 'WHERE ';
                let entries = Object.entries(data);
                entries.forEach((v,i) => {
                    if(i < entries.length -1 ) {
                        sql_statement = sql_statement + v[0] + ' = ' + v[1] + type + ' ';
                    } else {
                        sql_statement = sql_statement + v[0] + ' = ' + v[1];
                    }
                });
            }
        }
        return sql_statement;
    },
    checkKey: function(tableName , database) {
        return 'SELECT COLUMN_NAME FROM information_schema.COLUMNS where table_name = "' + tableName + '" and table_schema = "' + database + '"'; 
    }
}
module.exports = SQl_STATEMENTS;