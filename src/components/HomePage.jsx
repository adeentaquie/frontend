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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>ENCRYPTION WEBAPP</div>
        <nav className={styles.navbar}>
          <a href="#">Home</a>
          <a href="#">FAQ's</a>
          <a href="#">Contact Us</a>
          <a href="#">Dashboard</a>
        </nav>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>ENCRYPT / DECRYPT FILES </h1>
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
