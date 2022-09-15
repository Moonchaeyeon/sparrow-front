import { Suspense, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/header';
import Home from './pages/home/index';
import Login from './components/login';
import OAuthHandler from './pages/oauth';
import './App.css'

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
