import React,{useState,useEffect} from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import './User.css'
import Modal from 'react-bootstrap/Modal'
import axios from 'axios';


function User() {
  const [search,setsearch] = useState('')
  const [show, setShow] = useState(false);
  const [show2,setshow2]=useState(false)
  const handleClose = () => setShow(false);
  const handleClose2 = () => setshow2(false);
  const[question,setquestion]=useState('')
  const[allData,setallData]=useState([])
  const handleshow = (e)=>{
    setShow(true)
  }
 const id=localStorage.getItem('id')
 const name=localStorage.getItem('name')
 let display='d-none'


 const fetchdata = async()=>{
  const result = await axios.get('http://localhost:8000/get-questions')
  console.log('result',result.data);
  setallData(result.data.alldata)
 }

 useEffect(() => {
   fetchdata()
 }, []);
 

 //post Question
  const handlepost=async(e)=>{
    try{
    const body={
      id,
      name,
      question
    }
    const result = await axios.post('http://localhost:8000/post-question',body)
    console.log(result);
    window.location.reload()
    }catch(error){
      alert(error.response.data.message)
    }
    
  }

  //edit Question
  const handledit=async(e)=>{
    try{
      e.preventDefault()
      setshow2(true)
      const body={
        id
      }
      const result = await axios.post('http://localhost:8000/edit-question',body)
      console.log('edit',result.data.item.discusion);
      setquestion(result.data.item.discusion)

    }catch(error){
      alert(error.response.data.message)
    }
  }

  //update Question
  const handleUpdate=async(e)=>{
    try{
      const body={
        id,
        question
      }
      const result = await axios.post('http://localhost:8000/update-question',body)
      console.log(result);
      window.location.reload()
    }catch(error){
      alert(error.response.data.message)
    }
  }
 
  

  return (
    <div className='main'>
      <div  className="container px-4 px-lg-5 mt-5 mb-5">
      <h1>Discussions</h1>
        <div className='sorting p-3'>
              <div className='bg-white sort1'>
                  <h3>Showing 1- {allData.length} results</h3>
              </div>
              <div className='sort3'>
                  <InputGroup >  
                  <Form.Control style={{border:'1px solid black'}} onChange={(e)=>setsearch(e.target.value)} placeholder='Search'/>
                  </InputGroup>
              </div>
              <div className='sort2'>
              <button onClick={(e)=>handleshow(e)} className='inc' >Ask Question</button>
              </div>
          </div>
          {
          allData?.filter((item)=>{
            return search.toLowerCase()===''?item:item.discusion.toLowerCase().includes(search)
          })
          .map((item)=>{
            if(item.id===id){
              display='block'
            }else{
              display='d-none'
            }
           return <div className='discusion p-2'>
            <div className='disc-user'>
              <p>{item.name}</p>
            </div>
            <div className='disc-content'>
              <b>{item.discusion}</b>
            </div>
            <div className='disc-answer'>
            <p>1 Answer</p>
            <div><button onClick={(e)=>handledit(e)} className={display}>edit</button></div>
            </div>
          </div>
          })
        }  
      </div>
     

        {/* model of create question */}
      <Modal 
      size="md"
      aria-labelledby="contained-modal-title"
      centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className='view'>
            <label>Ask your Question?</label>
            <div className='mt-2'>
              <input className='input' onChange={(e)=>setquestion(e.target.value)} type='text' />
            </div>
            <div className='mt-4'>
              <button onClick={(e)=>handlepost(e)} className='post'>Post</button>
            </div>
            </div>
        </Modal.Body>
      </Modal>


        {/* model of edit Question */}
      <Modal 
      size="md"
      aria-labelledby="contained-modal-title"
      centered show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className='view'>
            <label>Ask your Question?</label>
            <div className='mt-2'>
              <input className='input' value={question} onChange={(e)=>setquestion(e.target.value)}  type='text' />
            </div>
            <div className='mt-4'>
              <button onClick={(e)=>handleUpdate(e)} className='post'>Update</button>
            </div>
            </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default User