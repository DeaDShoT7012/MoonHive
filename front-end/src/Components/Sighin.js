import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import uuid from "react-uuid"


function Sighin() {
    const [id,setId] = useState('') 
    const [email,setEmail] = useState('')
    const [password,setPswd] = useState('')
    const [name,setname] = useState('')
    const [error,seterror] = useState(false)

    let location = useNavigate()

    useEffect(()=>{
      setId(uuid().slice(0,6));
    },[])

    const handleRegister =async(e)=>{
      try{
        e.preventDefault()
        setId(uuid().slice(0,6));
        if(email.length===0||password.length===0||name.length===0){
            seterror(true)
        }
        const body={
          id,
          name,
          password,
          email,
      }
      const result= await axios.post('http://localhost:8000/register',body)
      console.log(result);
      alert(result.data.message)
      location('/')
      }catch (error){
        console.log(error.response.data.message);
        alert(error.response.data.message)
      }
       
    }
  return (
    <div>
        <div class="container mt-2">
    <h2 class="text-center">Register Form</h2>

  <div class="row">
        <div class="col-4">
              
        </div>
            <div class="col-5 mt-5 border p-5">
                <form onSubmit={(e)=>handleRegister(e)}>
                  <div class="form-floating mb-3 ">
                    <input name="user"  onChange={(e)=>setname(e.target.value)} formControlName="user"  type="text" class="form-control" id="floatingInput" placeholder="name@example.com" required/>
                    <label for="floatingInput">User Name</label>
                  </div>
                  {error&&name.length<=0?
                <label className='text-danger'>Please enter the name</label>:""}

                    <div class="form-floating mb-3 ">
                        <input  onChange={(e)=>setEmail(e.target.value)} name="email" formControlName="email"  type="email" class="form-control" id="floatingInput" placeholder="name@example.com" required/>
                        <label for="floatingInput">Email Id</label>
                      </div>
                      {error&&email.length<=0?
                <label className='text-danger'>Please enter the email</label>:""}
                      
                      <div class="form-floating">
                        <input  onChange={(e)=>setPswd(e.target.value)} name="pswd"  formControlName="pswd" type="password" class="form-control" id="floatingPassword" placeholder="Password" required/>
                        <label for="floatingPassword">Password</label>
                      </div> 
                      {error&&password.length<=0?
                <label className='text-danger'>Please enter the password</label>:""}
                
                      <div class="mt-4">
                        <button type="submit" class="btn btn-primary">Register</button>
                        &nbsp;
                        <span>
                            Already a User? Click Here to <Link to={'/'}>login</Link>
                        </span>
                    </div>
                </form>
            </div>  
  </div>
</div>
    </div>
  )
}

export default Sighin