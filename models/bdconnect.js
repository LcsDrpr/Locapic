var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true
  }
  mongoose.connect('mongodb+srv://capsuletest:azerty@cluster0-iutb9.mongodb.net/locapicapp?retryWrites=true&w=majority', 
    options,     
    function(err) {
     console.log(err);
    }
);

