import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EyeTracking from './EyeTracking';
import Navbar from './components/header';
import Home from './pages/home/index';
import ThreeCanvas from './canvas/index';

import './App.css'
import Login from './components/login';
import OAuthHandler from './pages/oauth';

function App() {
  return (
    // <Suspense fallback={null}>
    //   <ThreeCanvas />
    <Suspense fallback={null}>
      <Router>
        <Routes>
          <Route path="/oauth2/redirect" element={<OAuthHandler/>} />
          <Route path="*" element={<Home/>} />
        </Routes>
      </Router>

      <Navbar />
      {/* <Login /> */}
    </Suspense>
    // </Suspense>
  );
}

export default App;
