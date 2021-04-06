var mysql  = require('mysql');
import config from '../config'


var connection = mysql.createConnection({
    host     : config.DB_HOST,
    user     : config.DB_USER,
    password : config.DB_PASS,
    database : config.DB_NAME
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