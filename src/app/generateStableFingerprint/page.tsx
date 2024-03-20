"use client";

import React, { useState, useEffect } from "react";
import styles from "./generateStableFingerprint.styles.module.scss";

export default function GenerateStableFingerprint() {
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
  const [aspectRatio, setAspectRatio] = useState<
    string | null
  >(null);
  const [colourDepth, setColourDepth] = useState<number | null>(null);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
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
  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
      <h1>Generate fingerprint from screen properties</h1>
      <p>subtle crypto API</p>
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
      <button onClick={generateFingerprint}>Generate fingerprint</button>
    </div>
  );
}

