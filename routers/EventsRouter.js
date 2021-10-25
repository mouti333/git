const EventsController = require('../controllers/EventsController')
const route = require('express').Router()


route.post('/addEvents', EventsController.CreateEvents)
route.get('/getAllEvents', EventsController.getAllEvents)
route.get('/getOneEvents/:id', EventsController.getOneEvents)
route.delete('/deleteOneEvents/:id', EventsController.deleteOneEvents)
route.put('/updateOneEvents/:id', EventsController.updateEventsById)
module.exports=route