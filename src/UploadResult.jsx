import React from "react";
import styles from "./styles/FileUpload.module.css";

const UploadResult = ({ encryptionDetails, downloadLink, action }) => {
  return (
    <>
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
    </>
  );
};

export default UploadResult;
