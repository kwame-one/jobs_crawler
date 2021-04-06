var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});

export const db = () => {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if(err) {
                reject(err);
            }else {
                resolve(connection);
            }
        })
    })
}