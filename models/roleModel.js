const mongoose = require ("mongoose");
const schema = mongoose.schema;
const roleSchema = new mongoose.Schema({
nom:{
type:String,
required:true

},

});
module.exports=mongoose.model("role",roleSchema);