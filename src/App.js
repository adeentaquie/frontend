// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import FileUpload from './FileUpload'; 
import './styles/App.css'; 

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<HomePage />} />

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
                </Routes>
            </div>
        </Router>
    );
};

export default App;
