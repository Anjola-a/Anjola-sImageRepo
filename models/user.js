const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type: String,
        required: true, 
        unique: true
    }
});

UserSchema.plugin(passportLocalMongoose); //adds user name and pasword to schema and makes sure username is unique

module.exports = mongoose.model('User', UserSchema);