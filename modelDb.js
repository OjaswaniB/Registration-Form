const mongoose = require('mongoose');

const regData = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password1: {
        type:String,
        required:true
    },
    password2 : {
        type:String,
        required:true
    }
})

const Entry = mongoose.model('Entry', regData)

module.exports = Entry