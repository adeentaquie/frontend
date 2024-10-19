// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FileUpload from './FileUpload';
import URLChecker from './URLChecker'; // Import the URLChecker component
import './styles/App.css'; // Global styles

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {/* Route for Home Page */}
                    <Route path="/" element={<HomePage />} />

                    {/* Route for File Upload (Encryption & Decryption) */}
                    <Route
                        path="/upload"
                        element={
                            <div className="upload-container">
                                <FileUpload
                                    endpoint="http://localhost:5000/upload"
                                    action="Encrypt"
                                />
                                <FileUpload
                                    endpoint="http://localhost:5000/decrypt"
                                    action="Decrypt"
                                />
                            </div>
                        }
                    />

                    {/* Route for URL Checker */}
                    <Route path="/check-url" element={<URLChecker />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
