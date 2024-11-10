import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FileUpload from "./FileUpload";
import URLChecker from "./URLChecker";
import PasswordEncryptDecrypt from "./PasswordEncryptDecrypt";
import "./styles/App.css";

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
          <Route path="/check-url" element={<URLChecker />} />
          <Route
            path="/password-encrypt"
            element={
              <PasswordEncryptDecrypt
                action="Encrypt"
                endpoint="http://localhost:5002/encrypt-with-password"
              />
            }
          />
          <Route
            path="/password-decrypt"
            element={
              <PasswordEncryptDecrypt
                action="Decrypt"
                endpoint="http://localhost:5002/decrypt-with-password"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
