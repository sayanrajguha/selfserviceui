const mongoose = require('mongoose');
const config = require('../config/config');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  username : {
    type : String,
    unique : true,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  role : String,
  org : String,
  created_ts : {
    type : Date,
    default : Date.now
  },
  updated_ts : {
    type : Date
  }
});

const Auth = module.exports = mongoose.model('Auth',AuthSchema);

module.exports.createAuth = (newAuth, callback) => {
  newAuth.save(callback);
}

module.exports.updateAuth = (username,newAuth,callback) => {
  Auth.getAuth(username, (err,auth) => {
    if(err) throw err;
    if(!auth) {
      callback(null,false);
    }
    console.log('auth record for username : ' + username + ' found');
    /* Set all the fields of wrapper
    *   equal to all the fields of newWrapper
    */

    auth.save(callback);
  });
}

module.exports.deleteAuth = (username,callback) => {
  Auth.remove({ username : username },callback);
}

module.exports.getAuth = (username, callback) => {
  Citation.findOne({_id : username}, {"password" : 0}, callback);
}

module.exports.authenticate = (username,password,role) => {
  return new Promise((resolve,reject) => {
    Auth.findOne({username : username, password : password, role : role},{"password" : 0}, (err,auth) => {
      if(err) {
        console.log('Error while authenticating...');
        return reject(err);
      } else if(!auth) {
        console.log('Incorrect credentials');
        resolve(false);        
      } else {
        console.log('Authentication matched for user : '+username);
        resolve(auth);
      }
    });
  });
}