const db=require('./db')
const jwt=require('jsonwebtoken')



const register = (id,name,email,password)=>{
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            return{
                statusCode:404,
                message:'Account Already Exist'
            }
        }else{
            const newUser = new db.User({
                id:id,
                name:name,
                email:email,
                password:password,
            })
            newUser.save()
            return{
                statusCode:200,
                message:'sign up succesfully'
            }
        }
    })
}

const login = (email,password)=>{
    return db.User.findOne({
        email,
        password
    }).then((result)=>{
        if(result){
            const token=jwt.sign({
                email:result.email,
            },'whyareyoulookingatme')
            return{
                statusCode:200,
                message:'logged succesfully',
                name:result.name,
                email:result.email,
                id:result.id,
                token
            }
        }
        else{
            return{
                statusCode:404,
                message:'Invalid Account/Password'
            }
        }
    })
}

const askQuestion = (id,question,name)=>{
    console.log(question);
    return db.Question.find()
    .then((result)=>{
        if(result){
          const newuser = new db.Question({
            id:id,
            discusion:question,
            name:name
          })
          newuser.save()
          return{
            statusCode:200,
            message:'added'
          }
        }else{
            return{
                statusCode:401,
                message:'Please Login'
            }
        }
    })
}

const getQuestion = ()=>{
    return db.Question.find()
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                alldata:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'No Data is available'
            }
        }
    })
}

const editQuestion =(id)=>{
    return db.Question.findOne({
        id
    }).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:'Data updated successfully',
                item:result,
            }
        }else{
            return{
                statusCode:401,
                message:'No data is available'
            }
        }
    })

}

const updateQueston=(id,question)=>{
    return db.Question.findOne({
        id
    }).then((result)=>{
        if(result){
            result.discusion=question
            result.save()
            return{
                statusCode:200,
                message:'Data updated successfully'
            }
        }else{
            return{
                statusCode:401,
                message:'No data is available'
            }
        }
    })
}


module.exports={
    register,
    login,
    askQuestion,
    getQuestion,
    editQuestion,
    updateQueston
}