import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/data', {
        text: inputText
      });
      setSubmittedData(response.data);
      setIsDisabled(true);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isDisabled}
          placeholder="Enter your text"
        />
        <button type="submit" disabled={isDisabled}>
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h3>Submitted Data:</h3>
          <p>Text: {submittedData.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;