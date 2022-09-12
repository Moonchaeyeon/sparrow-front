import { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EyeTracking from './pages/home/EyeTracking';
import Navbar from './components/header';
import Home from './pages/home/index';
import ThreeCanvas from './canvas/index';

import './App.css'
import Login from './components/login';
import OAuthHandler from './pages/oauth';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Suspense fallback={null}>
      <Router>
        <Routes>
          <Route path="/oauth2/redirect" element={<OAuthHandler/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>

      <Navbar setShowLoginModal={setShowLoginModal}/>
      { showLoginModal && <Login setShowModal={setShowLoginModal}/> }
    </Suspense>
  );
}

export default App;
