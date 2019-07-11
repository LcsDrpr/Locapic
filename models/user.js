const mongoose = require('mongoose');

// var positionSchema = mongoose.Schema({
//     longitude:String,
//     latitude:String,
// })


const userSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    facebookid:String,
    historiquePosition : {
        longitude:String,
        latitude:String,
    }
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;