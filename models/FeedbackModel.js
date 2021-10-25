const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const FeedbackSchema = new Schema ({
feedback:{
    type:String,
    required:true

},
student:[
    {  
        type:Schema.Types.ObjectId,
        ref:"student" 
    }
        ]

})

module.exports = mongoose.model('Feedback', FeedbackSchema)