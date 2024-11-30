import React, { useState } from 'react';
import styles from './styles/PasswordEncryptDecrypt.module.css';

const PasswordEncryptDecrypt = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [strength, setStrength] = useState('');
    const [result, setResult] = useState(null);
    const [action, setAction] = useState("Encrypt");

    const checkPasswordStrength = (password) => {
        if (password.length >= 8) {
            setStrength('Strong');
        } else if (password.length >= 4) {
            setStrength('Medium');
        } else {
            setStrength('Weak');
        }
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        checkPasswordStrength(pwd);
    };

    const handleFileChange = (e) => {
        const chosenFile = e.target.files[0];
        const allowedTypes = ['image/png', 'image/jpeg', 'text/plain']; // Supported MIME types

        if (chosenFile && !allowedTypes.includes(chosenFile.type)) {
            alert("Unsupported file type. Please upload a text or image file.");
            setFile(null);
            setFileName('');
            return;
        }

        setFile(chosenFile);
        setFileName(chosenFile ? chosenFile.name : '');
    };

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleEncryptDecrypt = async () => {
        const formData = new FormData();
    
        // Action: Encrypt
        if (action === "Encrypt") {
            if (!file || !password || !email) {
                alert("Please select a file, provide a password, and enter an email address for encryption.");
                return;
            }
    
            formData.append('password', password);
            formData.append('email', email);
            formData.append('fileData', file);
            formData.append('filename', file.name);
    
            try {
                const response = await fetch(`http://localhost:5002/encrypt-with-password`, {
                    method: 'POST',
                    body: formData,
                });
    
                if (response.ok) {
                    await response.json(); // No need to store this if not used
                    setResult("File encrypted and email sent successfully.");
                } else {
                    const data = await response.json();
                    setResult(`Encryption failed: ${data.error}`);
                }
            } catch (error) {
                console.error("Encryption error:", error);
                setResult("Encryption failed due to a network error.");
            }
        }
        // Action: Decrypt
        else {
            if (!password) {
                alert("Please provide a password for decryption.");
                return;
            }
    
            formData.append('password', password);
    
            try {
                const response = await fetch(`http://localhost:5002/decrypt-with-password`, {
                    method: 'POST',
                    body: formData,
                });
    
                if (response.ok) {
                    const contentDisposition = response.headers.get('Content-Disposition');
                    const fileName = contentDisposition
                        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
                        : 'decrypted_file';
    
                    const contentType = response.headers.get('Content-Type');
                    const blob = await response.blob();
    
                    const url = URL.createObjectURL(blob);
    
                    // Handle image-specific download
                    if (contentType.startsWith('image/')) {
                        const img = new Image();
                        img.src = url;
                        img.onload = () => {
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = fileName;
                            a.click();
                            URL.revokeObjectURL(url);
                        };
                    }
                    // Handle other file types
                    else {
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = fileName;
                        a.click();
                        URL.revokeObjectURL(url);
                    }
    
                    setResult("File decrypted successfully.");
                } else {
                    const data = await response.json();
                    setResult(`Decryption failed: ${data.error}`);
                }
            } catch (error) {
                console.error("Decryption error:", error);
                setResult("Decryption failed due to a network error.");
            }
        }
    };
    

    return (
        <div className={styles.container}>
            <button
                className={styles.toggleButton}
                onClick={() => setAction(action === "Encrypt" ? "Decrypt" : "Encrypt")}
            >
                Switch to {action === "Encrypt" ? "Decrypt" : "Encrypt"}
            </button>

            <h2>{action} File with Password</h2>

            {action === "Encrypt" && (
                <>
                    <label htmlFor="file-upload" className={styles.customFileUpload}>
                        Choose File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className={styles.hiddenFileInput}
                    />
                    {fileName && <p className={styles.fileName}>{fileName}</p>}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                        className={styles.inputField}
                    />
                </>
            )}
            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={handlePasswordChange}
                className={styles.inputField}
            />
            <p className={styles.passwordStrength}>Password Strength: {strength}</p>
            <button onClick={handleEncryptDecrypt} className={styles.button}>
                {action}
            </button>
            {result && <div className={styles.message}>{result}</div>}
        </div>
    );
};

export default PasswordEncryptDecrypt;
