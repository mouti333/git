const FeedbackController = require('../controllers/FeedbackController')
const route = require('express').Router()


route.post('/addFeedback',FeedbackController.CreateFeedback)
route.get('/getAll',FeedbackController.getAllFeedback)
route.get('/getOne/:id',FeedbackController.getOneFeedback)
route.delete('/deleteOne/:id',FeedbackController.deleteOneFeedbacks)
route.put('/updateOne/:id',FeedbackController.updateFeedbackById)
module.exports=route