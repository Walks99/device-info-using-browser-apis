// src/components/GenerateFingerprintButton/GenerateFingerprintButton.tsx
"use client";
import React from 'react';
import styles from './GenerateFingerprintButton.styles.module.scss';

interface ButtonComponentProps {
  onClick: () => void;
 }
 

export default function GenerateFingerprintButton({onClick}: ButtonComponentProps) {
  return (
    <div className={styles.main}>
        <button onClick={onClick}>Generate fingerprint</button>
    </div>
  )
}
