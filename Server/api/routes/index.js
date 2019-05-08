const express = require('express');
const router = express.Router();
const User = require('../../models/user');

/* GET index route. */
router.get('/', (req, res, next) => {
  console.log('index route invoked!...');
  res.status(200).send('App running fine. Default root served...');
}); 

router.post('/login', (req, res, next) => {
    console.log('login route invoked!...');
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;
    console.log('[' + username + '] trying to log in to the system with <' + role + '> security level...');

    User.authenticate(username,password,role)
    .then((authStatus) => {
        if(authStatus) {
            //authentication succesful
            console.log(username + ' : ' + role + ' -> login successful...');            
            return res.status(200).json({
                'username' : username,
                'role' : role
            });
        } else {
            //authentication failed
            console.log(username + ' -> login failed..!');
            return res.status(401).send('Invalid Login Credentials');
        }
    })
    .catch((err) => {
        console.log(err);
        return res.status(500).end(err);
    });

  });

router.get('/logout', function(req,res) {
  console.log('Logout GET route invoked');
  res.status(200).send('Logged out');
});

module.exports = router;
