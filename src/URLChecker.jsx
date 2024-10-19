// src/components/URLChecker.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/URLChecker.module.css'; // Import CSS module
import urlImage from './images/url-check.jpeg'; // Example image

const URLChecker = () => {
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckUrl = async () => {
        try {
            const response = await axios.post('http://localhost:5001/check-url', { url });

            if (response.data.data) {
                setMessage('✅ URL is safe.');
            } else {
                setMessage('⚠️ URL may be unsafe.');
            }
        } catch (error) {
            console.error('Error checking URL:', error.response?.data || error.message);

            if (error.response?.status === 404) {
                setMessage('❌ Invalid or unknown URL.');
            } else {
                setMessage('⚠️ Failed to check URL. Please try again later.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Check URL Authenticity</h1>
            <img src={urlImage} alt="URL Checker" className={styles.urlImage} />

            <p className={styles.description}>
                Scammers are getting smarter with more convincing fake websites. Use this tool to
                quickly determine if a URL is safe. Just paste the URL below and hit "Check URL"!
            </p>

            <div className={styles.inputRow}>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className={styles.inputField}
                />
                <button onClick={handleCheckUrl} className={styles.checkButton}>
                    Check URL
                </button>
            </div>

            <p className={styles.message}>{message}</p>
        </div>
    );
};

export default URLChecker;
