import { Suspense } from 'react';
import EyeTracking from './EyeTracking';
import Navbar from './components/header';
import ThreeCanvas from './canvas/index';

import './App.css'

function App() {
  return (
    <Suspense fallback={null}>
      <ThreeCanvas />
      <Navbar />
    </Suspense>
  );
}

export default App;
