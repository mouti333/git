const mongoose = require('mongoose')
const mongoDB= 'mongodb://localhost/ISITCOM_Event';
mongoose.connect(mongoDB,{useUnifiedTopology: true ,useNewUrlParser: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;