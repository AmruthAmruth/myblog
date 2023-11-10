import React, { useEffect, useState } from 'react'
import './Post.css'
import {addDoc, collection} from 'firebase/firestore'
import { auth, db, storage } from '../../Firebaseconfig'
import { useNavigate } from 'react-router-dom'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL 
} from "firebase/storage";

function Post({isAuth}) {

  const [title, setTitle] = useState("")
  const [postText, setPostText] = useState("")
  const [imageUpload, setImageUpload] = useState([]);
  const [percent, setPercent] = useState("")
  const postCollectionRef = collection(db,"posts");


  
const navigate = useNavigate()


  const uploadFile =() => {
     
   
if(!imageUpload){
  alert("Plzz Chooss an Image")
}
const storageRef = ref(storage,`/products/${imageUpload.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageUpload);

    uploadTask.on(
      "state_changed",
      (snapshot)=>{
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // update progress
      setPercent(percent);
      },
      (err) => console.log(err),
      () =>{
        getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
          console.log(url);
          addDoc(postCollectionRef,{
            url,
            title,
            postText,
            author:{name: auth.currentUser.displayName, id:auth.currentUser.uid}
          })
    
        })
      }
    )


   
navigate("/")
      
  }


useEffect(()=>{
if(!isAuth){
  navigate("/login")
}
},[])


   return (
    <div className='Cpost'>
      <div className="postbox">
        <p>Create A Post</p>
        <div className="row">
        <label htmlFor="">Title</label> <br />
        <input type="text" onChange={(e)=>setTitle(e.target.value)} /> <br />
        </div>
        <div className="row">
        <label htmlFor="" >Post Massage</label> <br />
        <textarea onChange={(e)=>setPostText(e.target.value)} ></textarea> <br />
        </div> 
        <div className="row">
        <label class="custom-file-upload">
    <input type="file" onChange={(e) => {
    setImageUpload(e.target.files[0]);
   
  }}/>
    Add Image
</label> <br />
{/* <img src={image ? image.url : ""} alt="" /> */}
        </div>
        <button onClick={uploadFile}>Submit</button>
      </div>
    </div>
  )
}

export default Post
