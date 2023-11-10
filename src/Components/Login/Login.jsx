import React from 'react'
import './Login.css'
import {auth , provider} from '../../Firebaseconfig'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login({setIsAuth}) {
  let navigate = useNavigate()
  const signInWithGoogle=()=>{
    signInWithPopup(auth,provider).then((result)=>{
      localStorage.setItem("isAuth",true) 
       setIsAuth(true)
       navigate("/")
    })
  }
  return (
    <div className='logpage'>
        <div className="logbox">
      <p>Sign In With Google To Continue</p>
      <button onClick={signInWithGoogle}>Sign In With Google</button>
      </div>
    </div>
  )
}

export default Login
