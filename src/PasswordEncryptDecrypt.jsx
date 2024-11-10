import React, { useState } from 'react';
import styles from './styles/PasswordEncryptDecrypt.module.css';

const PasswordEncryptDecrypt = ({ endpoint }) => {
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
        setFile(chosenFile);
        setFileName(chosenFile ? chosenFile.name : '');
    };

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleEncryptDecrypt = async () => {
        const formData = new FormData();
        formData.append('password', password);
        formData.append('email', email);

        if (action === "Encrypt") {
            if (!file || !email) {
                alert("Please select a file and provide an email address for encryption.");
                return;
            }
            formData.append('fileData', file);
            formData.append('filename', file.name);

            try {
                const response = await fetch(`http://localhost:5002/encrypt-with-password`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                setResult(response.ok ? "File encrypted and email sent successfully." : `Encryption failed: ${data.error}`);
            } catch (error) {
                setResult("Encryption failed due to a network error.");
            }
        } else {
            try {
                const response = await fetch(`http://localhost:5002/decrypt-with-password`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                if (response.ok) {
                    setResult("File decrypted successfully.");
                    const blob = new Blob([data.decryptedData], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = data.filename || 'decrypted_file.txt';
                    a.click();
                    URL.revokeObjectURL(url);
                } else {
                    console.error("Decryption failed:", data.error);
                    setResult(`Decryption failed: ${data.error}`);
                }
            } catch (error) {
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
                    {fileName && <p className={styles.fileName}>{fileName}</p>} {/* Display the selected file name */}
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
            {result && (
                <div className={styles.message}>
                    {result}
                </div>
            )}
        </div>
    );
};

export default PasswordEncryptDecrypt;
