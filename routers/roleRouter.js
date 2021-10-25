const roleController=require('../controllers/roleController');
const route = require ('express').Router()
route.post('/',roleController.Createrole)
module.exports=route