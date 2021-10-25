
const mongoose = require ('mongoose')
const user = require('../models/UsersModel')
const bcrypt=require('bcrypt')
var refreshtokens={}
const saltRounds=10

const Schema = mongoose.Schema
const studentSchema = new Schema ({
nom:{
        type:String,
        required:true
    },
prenom:{
        type:String,
        required:true
    },
datedenaissance:{
        type:String,
        required:true
    },

niveauEtude:{
        type:String,
        required:true
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    },
 /*   feedback:[
{
    type:Schema.Types.ObjectId,
    required:false,
    ref:"feedback"
}
    ],*/
    photo:{
        type:String,
        required:true
}})

module.exports = user.discriminator('student', studentSchema)