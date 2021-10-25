const mongoose = require ('mongoose')
const user = require('../models/UsersModel')
const bcrypt=require('bcrypt')
const saltRounds=10
var refreshtokens={}

const Schema = mongoose.Schema
const clubSchema = new Schema ({
nom_de_club:{
        type:String,
        required:true
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    },
activite:{
        type:String,
        required:true
    },
/*events:[
        {
            type:Schema.Types.ObjectId,
            ref:"events",
            required:false
        }
 ],*/
 photo:{
    type:String,
    required:true
},

})

module.exports = user.discriminator('club', clubSchema)