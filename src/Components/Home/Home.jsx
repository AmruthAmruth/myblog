import React, { useEffect, useState } from 'react'
import './Home.css'
import {collection, deleteDoc, doc, getDocs} from 'firebase/firestore'
import { auth, db } from '../../Firebaseconfig';

function Home({isAuth}) {

const [postList, setPostList] = useState([])
 
const postCollectionRef = collection(db,"posts");

useEffect(()=>{
  const   getPost = async ()=>{
    const data = await getDocs(postCollectionRef)
    setPostList(data.docs.map((doc)=>({...doc.data(),id:doc.id})));
  }



  getPost()
})

const deletePost= async (id)=>{
  const postDoc =  doc(db,"posts",id)
 await deleteDoc(postDoc)
}

  return (
    <div className='home'>
       {postList.map((obj)=>{
          return(
            
         <div className="post">
        <div className="image">
            <img src={obj.url} alt="" />
        </div>
        <div className="text">
            <h1>{obj.title}</h1>
            <p>{obj.postText}</p>
            <h3>@{obj.author.name}</h3>
       {isAuth && obj.author.id === auth.currentUser.uid && <i  className='delete fa-solid fa-trash' onClick={()=>{deletePost(obj.id)}}></i>}
        </div>
      </div>
  )
})}

      
    </div>
  )
}

export default Home
