import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // API 호출
    axios.get('http://localhost:8080/api')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('There was a problem with the API request:', error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}
//
export default App;
