import React, { useState } from "react";
import axios from "axios";
import encryptionImage from "./images/encryption-1.jpg"; 
import decryptImage from "./images/decrypt.jpg";
import styles from "./styles/FileUpload.module.css";

const FileUpload = ({ endpoint, action }) => {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState("");
  const [iv, setIv] = useState("");
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [encryptionDetails, setEncryptionDetails] = useState(null);
  const [downloadLink, setDownloadLink] = useState("");
  const [recipientEmail, setRecipientEmail] = useState(""); // Store recipient email
  const [uploadedFilePath, setUploadedFilePath] = useState(""); // Store file path

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleKeyChange = (e) => setKey(e.target.value);
  const handleIvChange = (e) => setIv(e.target.value);
  const handleEmailChange = (e) => setRecipientEmail(e.target.value);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    if (action === "Decrypt" && (!key || !iv)) {
      setMessage("Please provide the key and IV.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    if (action === "Decrypt") {
      formData.append("key", key);
      formData.append("iv", iv);
    }

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);

      if (action === "Encrypt") {
        setEncryptionDetails({
          key: response.data.key,
          iv: response.data.iv,
        });
        setDownloadLink(`http://localhost:5000${response.data.downloadLink}`);
        setUploadedFilePath(response.data.filePath); // Store the file path for email sending
      } else {
        setDownloadLink(`http://localhost:5000${response.data.downloadLink}`);
      }
    } catch (error) {
      console.error("Upload error:", error.message);
      setMessage("Error: " + (error.response?.data || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!recipientEmail || !uploadedFilePath) {
      setMessage("Please provide recipient email and upload a file first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/send-email", {
        recipientEmail,
        filePath: uploadedFilePath, // Use the stored file path here
      });

      setMessage(response.data);
    } catch (error) {
      console.error("Email error:", error.message);
      setMessage("Error: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className={styles.container}>
      <img
        src={action === "Encrypt" ? encryptionImage : decryptImage}
        alt={`${action} Logo`}
        className={styles.logo}
      />
      <h2>{action} File</h2>
      <div className={styles.inputRow}>
        <input type="file" onChange={handleFileChange} />

        {action === "Decrypt" && (
          <>
            <input
              type="text"
              placeholder="Enter Key"
              onChange={handleKeyChange}
              value={key}
              className={styles.inputField}
            />
            <input
              type="text"
              placeholder="Enter IV"
              onChange={handleIvChange}
              value={iv}
              className={styles.inputField}
            />
          </>
        )}

        <button
          onClick={handleUpload}
          disabled={isUploading}
          className={styles.button}
        >
          {isUploading ? "Uploading..." : action}
        </button>
      </div>

      {action === "Encrypt" && (
        <div className={styles.inputRow}>
          <input
            type="email"
            placeholder="Enter Recipient Email"
            onChange={handleEmailChange}
            value={recipientEmail}
            className={styles.inputField}
          />
          <button onClick={handleSendEmail} className={styles.button}>
            Send Encrypted File via Email
          </button>
        </div>
      )}

      <p className={styles.message}>{message}</p>

      {encryptionDetails && (
        <div className={styles.result}>
          <p>
            <strong>Encryption Key:</strong> {encryptionDetails.key}
          </p>
          <p>
            <strong>Initialization Vector (IV):</strong> {encryptionDetails.iv}
          </p>
          <p style={{ color: "red" }}>
            <strong>Note:</strong> Save the key and IV. You will need them for
            decryption!
          </p>
        </div>
      )}

      {downloadLink && (
        <a href={downloadLink} download className={styles.download}>
          Download {action === "Encrypt" ? "Encrypted" : "Decrypted"} File
        </a>
      )}
    </div>
  );
};

export default FileUpload;
