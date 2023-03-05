import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import checkAuth from './utils/action/checkAuth';
import Navbar from './components/header';
import Meditation from './pages/meditation/index';
import Login from './components/login';
import OAuthHandler from './pages/oauth';
import './App.css'
import Home from './pages/home';

function App() {
  const auth = useSelector(state=>state.userData.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(()=>{
    if (!auth) {
      setShowLoginModal(true);
    } else {
      setShowLoginModal(false);
    }
  }, [auth])

  useEffect(()=>{
    checkAuth();
  }, [])

  return (
    <Suspense fallback={null}>
      <Router>
        <Routes>
          <Route path="/oauth2/redirect" element={<OAuthHandler/>} />
          <Route path="/meditation" element={<Meditation/>} />
          <Route path="*" element={<Home />}/>
        </Routes>
      </Router>

      <Navbar setShowLoginModal={setShowLoginModal}/>
      { showLoginModal && <Login setShowModal={setShowLoginModal}/> }
    </Suspense>
  );
}

export default App;
