import React from "react";
import styles from "./page.module.scss";

export default function landingPage() {
  return (
    <div className={styles.main}>
      <div className={styles.contentsContainer}>
        <h1>Welcome</h1>
        <h4>Check out one of the following:</h4>
        <ul>
          <li>
            <a href="/subtleCryptoAPI">
              Fingerprinting with the Subtle Crypto API
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
