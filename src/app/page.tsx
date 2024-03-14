"use client";

import styles from "./page.module.scss";
import React, { useEffect, useState } from "react";

export default function Home() {
  // State variables for device information
  const [isLoading, setIsLoading] = useState(true);
  const [screenWidth, setScreenWidth] = useState<number | null>(null);
  const [screenHeight, setScreenHeight] = useState<number | null>(null);
  const [screenOrientation, setScreenOrientation] = useState<string | null>(
    null
  );
  const [devicePixelRatio, setDevicePixelRatio] = useState<number | null>(null);
  const [browserLanguage, setBrowserLanguage] = useState<string | null>(null);
  const [browserOnlineStatus, setBrowserOnlineStatus] = useState<
    boolean | null
  >(null);
  const [userAgent, setUserAgent] = useState<string | null>(null);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [batteryCharging, setBatteryCharging] = useState<boolean | null>(null);
  const [vibrationSupported, setVibrationSupported] = useState<boolean | null>(
    null
  );
  const [screenResolution, setScreenResolution] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        // Screen Details
        const width = window.screen.width;
        const height = window.screen.height;
        setScreenWidth(width);
        setScreenHeight(height);
        setScreenOrientation(window.screen.orientation.type);

        // Device Pixel Ratio
        setDevicePixelRatio(window.devicePixelRatio);

        // Navigator Information
        setBrowserLanguage(navigator.language);
        setBrowserOnlineStatus(navigator.onLine);

        // User Agent Information
        setUserAgent(navigator.userAgent);

        // Battery Status
        if ("getBattery" in navigator) {
          await (navigator.getBattery as any)().then(function (battery: any) {
            setBatteryLevel(battery.level);
            setBatteryCharging(battery.charging);
          });
        } else {
          console.log("Battery API is not supported");
        }

        // Vibration API
        setVibrationSupported("vibrate" in navigator);

        // Calculate actual screen ratio and find the closest common ratio
        const actualRatio = width / height;
        const commonRatios = [
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
        const closestRatio = commonRatios.reduce((prev, curr) =>
          Math.abs(curr.value - actualRatio) <
          Math.abs(prev.value - actualRatio)
            ? curr
            : prev
        );
        setScreenResolution(`${width}x${height}`);
        setAspectRatio(closestRatio.name);
      } catch (error) {
        console.error("Error fetching device info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDeviceInfo();
  }, []);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <p className={styles.isLoading}>Loading...</p>
      ) : (
        <div className={styles.deviceInfoContainer}>
          <div className={styles.childContainer}>
            <p>Screen Width:</p>
            <p>{screenWidth}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Screen Height:</p>
            <p>{screenHeight}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Screen Orientation:</p>
            <p>{screenOrientation}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Screen Resolution:</p>
            <p>{screenResolution}</p>
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
            <p>Browser Language:</p>
            <p>{browserLanguage}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Browser Online Status:</p>
            <p>{browserOnlineStatus ? "Online" : "Offline"}</p>
          </div>
          <div className={styles.childContainer}>
            <p>User Agent:</p>
            <p>{userAgent}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Battery Level:</p>
            <p>{batteryLevel ? `${batteryLevel * 100}%` : "Unknown"}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Battery Charging:</p>
            <p>{batteryCharging ? "Yes" : "No"}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Vibration Supported:</p>
            <p>{vibrationSupported ? "Yes" : "No"}</p>
          </div>
        </div>
      )}
    </main>
  );
}
