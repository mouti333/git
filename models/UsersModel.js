const mongoose = require ('mongoose') //orm (object relation maping) permet d'avoir une relation entre la base de donnees et notre code

const Schema = mongoose.Schema
const bcrypt=require('bcrypt')
var refreshtokens={}
const saltRounds=10

const userSchema = new Schema ({
email:{
    type:String,
    required:true,
    unique:true,
    validate:
    function ValidateEmail(mail) 
{
if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
{
return (true)
console.log('You have entered a valid email address!!')
}
console.log("You have entered an invalid email address!")
return (false)
}
},

mdp:{
    type:String,
    required:true,
    unique:true,
    validate :function CheckPassword(passw) 
{ 
if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(passw)) 
{ 
console.log('valid password!!')
return true;
}
else
{ 
console.log('Wrong...try again!')
return false;
}
}
},
photo:{
    type:String,
    required:false
} 
})
userSchema.pre('save',function(next){
  this.mdp= bcrypt.hashSync(this.mdp,saltRounds);
  next();
})


module.exports = mongoose.model('users',userSchema)