const express = require('express')
var cors=require('cors')
var app = express()
app.use(cors())
var swaggerUi=require('swagger-ui-express')
var swaggerDocument=require('./config/swagger.json')
const db = require('./config/Database.js')
const bodyParser= require ('body-parser')
const UsersRouter = require('./routers/UsersRouter')
const FeedbackRouter =require('./routers/FeedbackRouter')
const EventsRouter = require('./routers/EventsRouter')
const studentRouter = require('./routers/studentRouter')
const clubRouter = require('./routers/clubRouter')
const administrationRouter = require('./routers/administrationRouter')
const adminRouter = require('./routers/adminRouter')
const roleRouter = require('./routers/roleRouter')

//bodyParser = {json: {limit: '50mb', extended: true},urlencoded: {limit: '50mb', extended: true}};
var app = express()
app.use(cors())
app.get('/sendFile/:photo',function(req,res){
    res.sendFile(__dirname+'/uploads/'+req.params.photo)
})
app.set("secretKey","anis")
app.use(bodyParser.urlencoded({ limit:'50mb',extended: true}))
 
// parse application/json
app.use(bodyParser.json({limit: '50mb', extended: true}))


app.use('/users',UsersRouter)
app.use('/Feedback',FeedbackRouter)
app.use('/Events',EventsRouter)
app.use('/student',studentRouter)
app.use('/club',clubRouter)
app.use('/administration',administrationRouter)
app.use('/admin',adminRouter)
app.use('/role',roleRouter)

app.get('/',function(req,res){
res.send('hello world')
})

app.listen(7000,function(){
    console.log('running with 7000')


})
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument))