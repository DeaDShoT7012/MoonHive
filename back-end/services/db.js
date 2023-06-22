const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/moonhive')

const User = mongoose.model('User',{
    id:String,
    name:String,
    email:String,
    password:String,
    discusion:[]
})

const Question = mongoose.model('Question',{
    discusion:String,
    id:String,
    name:String
})

module.exports={
    User,
    Question
}