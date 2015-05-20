var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var mongoose = req.mongoose;
    var userModel = req.userModel;


//var My = mongoose.model('lists');
 
  //var my = new My();
 //  my.username = '123';
  
 //  my.save(function () {
 //    //res.send(req.body);
 //  });
    //var db = req.db;mymodel
    //var collection = db.get('usercollection');
    userModel.find(function(e,docs){

        res.render('userlist', {
            "userlist" : docs
        });
    //console.log(docs);
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});


/* POST to Add User Service */
router.post('/adduser', function(req, res) {
	
	var userModel = req.userModel;
	var user = new userModel();
    // Set our internal DB variable
    //var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    //var collection = db.get('usercollection');
    user.username = userName;
    user.email = userEmail;
    // Submit to the DB
    user.save(function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
    
    // collection.insert({
    //     "username" : userName,
    //     "email" : userEmail
    // }, function (err, doc) {
    //     if (err) {
    //         // If it failed, return error
    //         res.send("There was a problem adding the information to the database.");
    //     }
    //     else {
    //         // If it worked, set the header so the address bar doesn't still say /adduser
    //         res.location("userlist");
    //         // And forward to success page
    //         res.redirect("userlist");
    //     }
    // });
});

module.exports = router;
