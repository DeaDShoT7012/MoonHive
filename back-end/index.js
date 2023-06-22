const express = require('express')
const cors = require('cors') 
const logic = require('./services/logic')


const server = express()
 
server.use(cors({
    origin:'http://localhost:3000'
}))
server.use(express.json())

server.listen(8000,()=>{    
    console.log('server listen at 8000');
})
 

//register
server.post('/register',(req,res)=>{
    logic.register(req.body.id,req.body.name,req.body.email,req.body.password)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//login
server.post('/login',(req,res)=>{
    logic.login(req.body.email,req.body.password)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//postQuestion
server.post('/post-question',(req,res)=>{
    logic.askQuestion(req.body.id,req.body.question,req.body.name)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//getQuestions
server.get('/get-questions',(req,res)=>{
    logic.getQuestion().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//editQuestion
server.post('/edit-question',(req,res)=>{
    logic.editQuestion(req.body.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//updateQuestion
server.post('/update-question',(req,res)=>{
    logic.updateQueston(req.body.id,req.body.question)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})