const  adminController = require('../controllers/adminController')
const route = require('express').Router()
const upload = require('../middeleware/upload')

route.post('/addadmin',upload.single("image"),adminController.Createadmin)
route.get('/getAll',adminController.getAlladmin)
route.get('/getOne/:id',adminController.getOneadmin)
route.get('/getAllFEE',adminController.getAllFeedback)
route.get('/getOneFEE/:id',adminController.getOneFeedback)
route.delete('/deleteOne/:id',adminController.deleteOneadmin)
route.put('/updateOne/:id',upload.single("image"),adminController.updateadminById)
module.exports=route



