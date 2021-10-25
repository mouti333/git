const mongoose = require ('mongoose')
const user = require('./UsersModel')

const Schema = mongoose.Schema
const adminSchema = new Schema ({

    
})

module.exports = user.discriminator('admin',adminSchema)