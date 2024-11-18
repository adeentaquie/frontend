import React, { useState } from "react";
import "./styles/CyberDetection.css"; // Updated CSS file

const CyberDetection = () => {
  const [tweet, setTweet] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5003/cyber-detection/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweet }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch');
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="cyber-detection-container">
      <h2>CYBER DETECTION</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="Enter a tweet to analyze"
          required
        />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <p>
          Prediction Result: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
};

export default CyberDetection;
