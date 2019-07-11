var express = require('express');
var router = express.Router();
var passport = require('passport');

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
      +"&email="+req.user.email);
  }
);

router.post('/logPosition/', function(req, res, next) {
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
        facebookid:req.params.facebookid,
        historiquePosition : {
            longitude:req.body.latitude,
            latitude:req.body.longitude,
        }
      });

      newUser.save(function(error, user) {
        console.log("LOG: user", user)
        res.json({result: true, user});
      });
    }

  });
    
});


module.exports = router;
