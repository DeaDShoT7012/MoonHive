import axios from 'axios'
import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom'

function Login() {
    const [email,setEmail] = useState('')
    const [password,setPswd] = useState('')
    const [error,seterror] = useState(false)

    let location = useNavigate()


    const handlesubmit =async (e)=>{
        try{
            e.preventDefault()
        if(email.length===0||password.length===0){
            seterror(true)
        }
        const body ={
            email,
            password
        }
        const result = await axios.post('http://localhost:8000/login',body)
        console.log(result);
        localStorage.setItem("token",result.data.token)
        localStorage.setItem('id',result.data.id)
        localStorage.setItem('name',result.data.name)
        alert(result.data.message)
        location('user')
        }catch(error){
        console.log(error.response.data.message);
        alert(error.response.data.message)
        }
        
    }

  return (
    <div className='overflow-hidden'>
	
	<div class="row">
    <div class="col-6">
         <img src='https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg?size=626&ext=jpg&ga=GA1.1.723237688.1674969810&semt=sph' alt=''/>
    </div>
    <div class="col-5 mt-5">
        <form  onSubmit={(e)=>handlesubmit(e)}  className="border p-5 mt-5 me-5" >
            <div>
                <input  onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email Id" className="form-control" required/>
            </div>
            {error&&email.length<=0?
            <label className='text-danger'>Please enter the email</label>:''}  

            <div className="mt-4">
                <input  onChange={(e)=>setPswd(e.target.value)} type="password" placeholder="Password" className="form-control" required/>
            </div>
            {error&&password.length<=0?
            <label className='text-danger'>Please enter the password</label>:''}

            <div className="mt-4">
                <button  type="submit" className="btn btn-primary">
                    Login &nbsp;
                </button>
                &nbsp;
                <span>
                    New User? Click Here to<Link to={'/signin'}> Register</Link>
                </span>
            </div>           
        </form>
    </div>
</div>
    </div>
  )
}

export default Login