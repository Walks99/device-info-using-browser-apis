// src/generatedStableFingerprint/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import styles from "./generateStableFingerprint.styles.module.scss";
import dynamic from "next/dynamic";
import { setFingerprintCookie, getFingerprintCookie } from '../../utils/cookies'; // NEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEW

function GenerateStableFingerprint() {
  // --------------------------------------------------------------------------------
  const [loading, setLoading] = useState(true);
  const [screenOrientation, setScreenOrientation] = useState<string | null>(
    null
  );
  const [devicePixelRatio, setDevicePixelRatio] = useState<number | null>(null);
  const [screenResolutionInCSSPixels, setScreenResolutionInCSSPixels] =
    useState<string | null>(null);
  const [
    screenResolutionInPhysicalPixels,
    setScreenResolutionInPhysicalPixels,
  ] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);
  const [colourDepth, setColourDepth] = useState<number | null>(null);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(120); // 2 minutes in seconds
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --------------------------------------------------------------------------------
  useEffect(() => {
    const collectDeviceInformation = async () => {
      console.log("Fetching device info...");
      try {
        // Screen Details
        const widthInCSSPixels = window.screen.width;
        const heightInCSSPixels = window.screen.height;
        const devicePixelRatio = window.devicePixelRatio;
        setScreenResolutionInCSSPixels(
          `${widthInCSSPixels} x ${heightInCSSPixels}`
        );
        const widthInPhysicalPixels = Math.round(
          widthInCSSPixels * devicePixelRatio
        );
        const heightInPhysicalPixels = Math.round(
          heightInCSSPixels * devicePixelRatio
        );
        setScreenResolutionInPhysicalPixels(
          `${widthInPhysicalPixels} x ${heightInPhysicalPixels}`
        );
        setScreenOrientation(window.screen.orientation.type);
        setDevicePixelRatio(Number(devicePixelRatio.toFixed(2)));
        setColourDepth(window.screen.colorDepth);

        // Aspect Ratio
        const commonLandscapeRatios = [
          { name: "4/3", value: 4 / 3 },
          { name: "16/9", value: 16 / 9 },
          { name: "16/10", value: 16 / 10 },
          { name: "1/1", value: 1 },
          { name: "21/9", value: 21 / 9 },
          { name: "32/9", value: 32 / 9 },
          { name: "5/4", value: 5 / 4 },
          { name: "3/2", value: 3 / 2 },
          { name: "2/1", value: 2 },
        ];
        const commonPortraitRatios = [
          { name: "3/4", value: 4 / 3 },
          { name: "9/16", value: 16 / 9 },
          { name: "10/16", value: 16 / 10 },
          { name: "1/1", value: 1 },
          { name: "9/21", value: 21 / 9 },
          { name: "9/32", value: 32 / 9 },
          { name: "4/5", value: 5 / 4 },
          { name: "2/3", value: 3 / 2 },
          { name: "1/2", value: 2 },
        ];

        let aspectRatio: number;

        if (window.screen.orientation.type === "landscape-primary") {
          aspectRatio = widthInCSSPixels / heightInCSSPixels;
          const closestLandscapeRatio = commonLandscapeRatios.reduce(
            (prev, curr) =>
              Math.abs(curr.value - aspectRatio) <
              Math.abs(prev.value - aspectRatio)
                ? curr
                : prev
          );
          setAspectRatio(closestLandscapeRatio.name);
        } else {
          aspectRatio = heightInCSSPixels / widthInCSSPixels;
          const closestPortraitRatio = commonPortraitRatios.reduce(
            (prev, curr) =>
              Math.abs(curr.value - aspectRatio) <
              Math.abs(prev.value - aspectRatio)
                ? curr
                : prev
          );
          setAspectRatio(closestPortraitRatio.name);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching device info: ", error);
      }
    };

    collectDeviceInformation();
  }, []);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --------------------------------------------------------------------------------
  const generateFingerprint = async () => {
    // Calculate the fingerprint
    const fingerprintData = `${screenOrientation}${devicePixelRatio}${screenResolutionInCSSPixels}${screenResolutionInPhysicalPixels}${aspectRatio}${colourDepth}`;
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(fingerprintData)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setFingerprint(hashHex);
  };
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -------------------------------------------------------------------------------- // NEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEW
  const setAndGetFingerprintFromCookie = async () => {
    try {
      if (fingerprint !== null) {
        await setFingerprintCookie(fingerprint);
        setTimerActive(true);
        const fingerprintFromCookie = await getFingerprintCookie();
        console.log("Fingerprint from cookie: ", fingerprintFromCookie);
      } else {
        console.error("Fingerprint is null");
      }
    } catch (error) {
      console.error("Error setting and getting fingerprint from cookie: ", error);
    }
  };
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ // NEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEW
  // -------------------------------------------------------------------------------- // NEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEW
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (timerActive) {
       timerId = setInterval(() => {
         setRemainingTime((prevTime) => {
           if (prevTime <= 1) {
             clearInterval(timerId as NodeJS.Timeout);
             setTimerActive(false);
             return 0;
           }
           return prevTime - 1;
         });
       }, 1000);
    }
    return () => clearInterval(timerId as NodeJS.Timeout);
   }, [timerActive]);   
   
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ // NEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEW
  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <h1>Generate fingerprint from screen properties</h1>
        <p>Subtle Crypto API</p>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.deviceInfoContainer}>
          <div className={styles.childContainer}>
            <p>Screen Orientation:</p>
            <p>{screenOrientation}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Screen Resolution in CSS Pixels:</p>
            <p>{screenResolutionInCSSPixels}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Screen Resolution in Physical Pixels:</p>
            <p>{screenResolutionInPhysicalPixels}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Aspect Ratio:</p>
            <p>{aspectRatio}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Device Pixel Ratio:</p>
            <p>{devicePixelRatio}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Colour depth:</p>
            <p>{colourDepth}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Fingerprint:</p>
            <p>{fingerprint}</p>
          </div>
        </div>
      )}
      <div className={styles.buttonsContainer}>
        <button onClick={generateFingerprint}>Generate fingerprint</button>
        <div className={styles.generateCookieButtonContainer}>
          <button onClick={setAndGetFingerprintFromCookie}>Generate cookie</button>
          {timerActive ? (
            <>
            <p>Expires in:</p>
            <p className={styles.remainingTime}>{remainingTime} seconds</p>
            </>
          ) : (
            null
          )}
        </div>
      </div>
      <div className={styles.cookieInformationContainer}>
        <h3>To see your cookie, follow the intrustions below:</h3>
        <p><strong>1.</strong> Open Chrome dev tools: Right click, select &apos;inspect&apos;</p>
        <p><strong>2.</strong> Select &apos;Application&apos; in the task bar</p>
        <p><strong>3.</strong> From the left navigation bar, select &apos;Cookies&apos;</p>
        <p><strong>4.</strong> Under &apos;Cookies&apos;, select the URL listed</p>
        <p><strong>5.</strong> If your cookie is not listed, click the circular arrow to refresh the table</p>
        <p><strong>NOTE:</strong> Your cookie will expire in two minutes</p>
      </div>

    </div>
  );
}

// ---------------------------------------------------------------------------------------
// Dynamically import the HomeComponent with Server Side Rendering disabled
const Home = dynamic(() => Promise.resolve(GenerateStableFingerprint), {
  ssr: false, // This ensures the component is only loaded on the client side
});

export default function Page() {
  return (
    <div>
      <Home />
    </div>
  );
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
