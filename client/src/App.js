import { Suspense } from 'react';
import EyeTracking from './EyeTracking';
import ThreeCanvas from './canvas/index';

import './App.css';

function App() {
  return (
    <Suspense fallback={null}>
      <ThreeCanvas />
    </Suspense>
  );
}

export default App;
