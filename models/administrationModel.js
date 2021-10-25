const mongoose = require ('mongoose')
const user = require('../models/UsersModel')

const Schema = mongoose.Schema
const administrationSchema = new Schema ({
nom:{
        type:String,
        required:true
    },
prenom:{
        type:String,
        required:true
    },
statut:{
        type:String,
        required:true
    },
/*events:[
        {
            type:Schema.Types.ObjectId,
            ref:"events"
        }
            ],*/

  photo:{
        type:String,
        required:true
}

})

module.exports = user.discriminator('administration',administrationSchema)