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

router.post('/logPosition/:firstname/:lastname/:email/:userid/:', function(req, res, next) {
  // Here, we want to find every movies that we have in our collection movies on mlab

  userModel.findOne({facebookid : req.params.userid}, function(error, user){

    if(user){

      user.historiquePosition.push({
        latitude: req.body.latitude,
        longitude: req.body.longitude
      })
      user.save()
      res.json({isUserExist: true, user});
      
    }else{
      const newUser = new userModel({
        firstname:req.params.firstname,
        lastname:req.params.lastname,
        email:req.params.email,
        facebookid:req.params.facebookid,
        historiquePosition : {
            longitude:String,
            latitude:String,
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
