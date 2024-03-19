// src/components/GenerateDataButton.tsx
"use client";
import React from 'react';
import styles from './GenerateDataButton.styles.module.scss'

interface WebBrowserAPIsIntroductionProps {
  setGenerateDataButtonClicked: (value: boolean) => void;
}

export default function GenerateDataButton({setGenerateDataButtonClicked}: WebBrowserAPIsIntroductionProps) {

  const generateData = async () => {
    setGenerateDataButtonClicked(true)
  }

  return (
    <div className={styles.GenerateDataButtonContainer}>
        <button onClick={generateData}>Generate data</button>
    </div>
  )
}
