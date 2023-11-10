
import './App.css';
import Post from './Components/CreatePost/Post';
import {BrowserRouter as Router , Routes,Route,Link} from 'react-router-dom'
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './Firebaseconfig';
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))

  const signUserOut=()=>{
   signOut(auth).then(()=>{
    localStorage.clear()
    setIsAuth(false)
    window.location.pathname="/login"
   })
  }

  return (
   <div>
    <Router>
      <div className="navbar">
        <h1 onClick={()=>window.location.pathname="/"}>MyBlog</h1>
        <div className="navtext">
          { !isAuth ? <Link to='/login'>Login</Link> : <Link onClick={signUserOut}>LogOut</Link>}
          <Link to='/createpost'>Post</Link>
        </div>
      </div>
      <hr />
      <Routes>
        <Route path='/' element={ <Home isAuth={isAuth}/>}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/createpost' element={<Post isAuth={isAuth}/>}/>
      </Routes>
    </Router>
   </div>
  );
}

export default App;
