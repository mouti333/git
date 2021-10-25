const studentController = require('../controllers/studentController')
const route = require('express').Router()
const upload= require('../middeleware/upload')

route.post('/addstudent',upload.single("image"),studentController.Createstudent)
route.get('/getAll',studentController.getAllstudent)
route.get('/getOne/:id',studentController.getOnestudent)
route.get('/getAllEVE',studentController.getAllEvents )
route.get('/getOneEVE/:id',studentController.getOneEvents)
route.delete('/deleteOne/:id',studentController.deleteOnestudent)
route.post('/authstudent',studentController.authenticate)
route.post('/refreshtoken',studentController.refreshTok)
route.put('/updateOne/:id',upload.single("image"),studentController.updatestudentsById)
module.exports=route