const clubController = require('../controllers/clubController')
const route = require('express').Router()
const upload = require('../middeleware/upload')

route.post('/addclub',upload.single("image"),clubController.Createclub)
route.get('/getAll',clubController.getAllclub)
route.get('/getOne/:id',clubController.getOneclub)
route.delete('/deleteOne/:id',clubController.deleteOneclub)
route.put('/updateOne/:id',upload.single("image"),clubController.updateclubById)
route.post('/authclub',clubController.authenticate)
module.exports=route