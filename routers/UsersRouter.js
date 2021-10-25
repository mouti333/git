const UserController =require('../controllers/userController')
const route = require('express').Router()
const upload= require('../middeleware/upload')

route.post('/addUser',upload.single("image"),UserController.createUser)

route.get('/getAll',UserController.getAllUsers)
route.get('/getOne/:id',UserController.getOneUser)
route.delete('/deleteOne/:id',UserController.deleteUserById)
route.put('/updateOne/:id',upload.single("image"),UserController.updateUserById)
route.post('/authUser',UserController.authenticate)
route.post('/refreshtoken',UserController.refreshTok)
route.post('/sendemail',UserController.sendemail)
route.post('/logOut',UserController.LogOut)
module.exports=route