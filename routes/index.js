var express = require('express');
var router = express.Router();
var passport = require('passport');
const userModel = require('../models/user');



router.get('/auth/facebook',

  function(req,res,next){
    passport.authenticate(
      'facebook', { scope : 'email',state:JSON.stringify(req.query) })
      (req,res,next);
  }

);


router.get('/auth/facebook/callback',

  passport.authenticate('facebook', { session: false }),


  function(req, res) {
    res.redirect(req.user.redirectUrl
      +"?userId="+req.user.id
      +"&firstName="+req.user.first_name 
      +"&lastName="+req.user.last_name
      +"&email="+req.user.email
      +"&picture="+req.user.picture);
  }
);

router.post('/logPosition', function(req, res, next) {
  // Here, we want to find every movies that we have in our collection movies on mlab

  userModel.findOne({facebookid : req.body.userid}, function(error, user){

    if(user){

      user.historiquePosition.push({
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
      user.save()
      res.json({isUserExist: true, user});
      
    }else{
      const newUser = new userModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        picture : req.body.picture,
        facebookid:req.params.facebookid,
        historiquePosition : {
            longitude:req.body.longitude,
            latitude:req.body.latitude,
        }
      });

      newUser.save(function(error, user) {
        console.log("LOG: user", user)
        res.json({result: true, user});
      });
    }

  });
    
});

router.get('/logPosition', function (req, res) {
  UserModel.findOne({ facebookid: req.query.facebookid }, function (err, user) {
    if (user) {
      res.json({ historiquePosition: user.historiquePosition });
    } else {
      res.json({ historiquePosition: [] });
    }
  })
});


module.exports = router;
