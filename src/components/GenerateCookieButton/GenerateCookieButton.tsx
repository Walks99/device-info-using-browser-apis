import React from "react";
import styles from "./GenerateCookieButton.styles.module.scss";

interface ButtonComponentProps {
  onClick: () => void;
}

export default function GenerateCookieButton({
  onClick,
}: ButtonComponentProps) {
  return (
    <div className={styles.main}>
      <button onClick={onClick}>Generate cookie</button>
    </div>
  );
}
