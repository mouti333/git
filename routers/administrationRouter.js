const administrationController = require('../controllers/administrationController')
const route = require('express').Router()
const upload = require('../middeleware/upload')

route.post('/addadministration',upload.single("image"),administrationController.Createadministration)
route.get('/getAll',administrationController.getAlladministration)
route.get('/getOne/:id',administrationController.getOneadministration)
route.delete('/deleteOne/:id',administrationController.deleteOneadministration)
route.put('/updateOne/:id',upload.single("image"),administrationController.updateadministrationsById)
route.post('/authadms',administrationController.authenticate)
module.exports=route