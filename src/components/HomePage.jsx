// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/HomePage.module.css"; // Adjust path if needed
import logo from "../images/logo.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  const handleEncryptRedirect = () => {
    navigate("/upload");
  };

  const handleURLCheckerRedirect = () => {
    navigate("/check-url");
  };

  const handlePasswordBasedEncryptionRedirect = () => {
    navigate("/password-encrypt");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>ENCRYPTION WEBAPP</div>
        <nav className={styles.navbar}>
          {/* Updated to use button elements for accessibility */}
          <button onClick={() => navigate("/")} className={styles.navButton}>Home</button>
          <button onClick={() => navigate("/faqs")} className={styles.navButton}>FAQ's</button>
          <button onClick={() => navigate("/contact")} className={styles.navButton}>Contact Us</button>
          <button onClick={() => navigate("/dashboard")} className={styles.navButton}>Dashboard</button>
        </nav>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>ENCRYPT / DECRYPT FILES</h1>
          <p>
            Experience peace of mind as you navigate the digital landscape,
            knowing that your information is shielded by the strongest layers of
            defense.
          </p>
          <div className={styles.buttonContent}>
            <button
              className={styles.encryptButton}
              onClick={handleEncryptRedirect}
            >
              Encrypt File
            </button>
            <button
              className={styles.URLButton}
              onClick={handleURLCheckerRedirect}
            >
              URL CHECKER
            </button>
            <button
              className={styles.URLButton}
              onClick={handlePasswordBasedEncryptionRedirect}
            >
              Password Based Encryption
            </button>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={logo}
            alt="Encryption-themed visual"
            className={styles.cryptoImage}
          />
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 ENCRYPTION WEBAPP. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
