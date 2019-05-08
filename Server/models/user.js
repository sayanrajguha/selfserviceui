const mysql = require('mysql');
const config = require('../config/config');

module.exports.authenticate = (username,password,role) => {
    return new Promise((resolve,reject) => {
        let authStatus = false;
        const connection = mysql.createConnection({
            host     : config.mysql_host,
            port     : config.mysql_port,
            user     : config.mysql_user,
            password : config.mysql_password,
            database : config.mysql_database
        });
        connection.connect(function(err) {
            if (err) {
              console.error('error connecting to sql database: ' + err.stack);
              return reject(err);
            } else {
                console.log('connected to mysql database ||||  id ' + connection.threadId);
                connection.query('SELECT * FROM auth WHERE username=? AND password=? AND role=?',[username,password,role], function (error, results, fields) {
                    if (error) return reject(error);
                    else {
                        console.log((results != null ? results : []).length + ' records found...');
                        
                        if(results && results.length > 0)   authStatus = true;

                        console.log('Attempting to end connection...');
                        connection.end( (connEndErr) => {
                            if(connEndErr) {
                                console.log(connEndErr);
                                connection.destroy();
                                return resolve(authStatus);
                            } else {
                                console.log('Connection terminated successfully');
                                return resolve(authStatus);   
                            }
                        });
                    }
                  });
            }
          });
    });
}