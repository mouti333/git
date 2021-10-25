const mongoose = require ('mongoose')

const Schema = mongoose.Schema
const EventsSchema = new Schema ({
nom:{
        type:String,
        required:true
    },
place:{
        type:String,
        required:true
    },
date:{
        type:String,
        required:true
    },
club:[
        {
            type:Schema.Types.ObjectId,
            ref:"club"
        }
    ],
                          
administration:[
                        {
                            type:Schema.Types.ObjectId,
                            ref:"administration"
                        }
    ]        
    



})

module.exports = mongoose.model('events',EventsSchema)