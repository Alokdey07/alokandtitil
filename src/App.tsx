import React from 'react';
import FloatingHearts from './components/FloatingHearts';
import Hero from './components/Hero';
import VideoSection from './components/VideoSection';
import Ending from './components/Ending';
import './index.css';

function App() {
  return (
    <div className="App">
      <FloatingHearts />
      <Hero />
      <VideoSection />
      <Ending />
    </div>
  );
}

export default App;
