import React from 'react';

function App() {
  console.log('App is rendering!'); // Debug log
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a)',
      color: '#fff',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🎹 AL Studios</h1>
      <p style={{ fontSize: '24px' }}>Your DAW is loading...</p>
    </div>
  );
}

export default App; 