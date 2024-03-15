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
  const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
  const [browser, setBrowser] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);

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
        const physicalWidth = window.screen.width * window.devicePixelRatio;
        const physicalHeight = window.screen.height * window.devicePixelRatio;
        console.log(`screen resolution: ${physicalWidth}x${physicalHeight}`);

        // Navigator Information
        setBrowserLanguage(navigator.language);
        setBrowserOnlineStatus(navigator.onLine);
        if ((navigator as any).userAgentData) {
          setOperatingSystem((navigator as any).userAgentData.platform);
          setBrowser((navigator as any).userAgentData.brands[2].brand);
        } else {
          console.log("userAgentData is not supported");
        }

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

        // Geolocation
        if (navigator.geolocation) {
          console.log("Geolocation is supported by your browser");

          // Request permission to access the user's location
          await navigator.geolocation.getCurrentPosition(
            async function (position) {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);

              // Use the latitude and longitude to get the user's location
              const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`;
              const response = await fetch(locationUrl);
              const data = await response.json();
              if (data && data.address) {
                // Construct a more detailed address string
                let detailedAddress = "";
                if (data.address.house_number) {
                  detailedAddress += data.address.house_number + " ";
                }
                if (data.address.road) {
                  detailedAddress += data.address.road + ", ";
                }
                if (data.address.suburb) {
                  detailedAddress += data.address.suburb + ", ";
                }
                if (data.address.city) {
                  detailedAddress += data.address.city + ", ";
                }
                if (data.address.country) {
                  detailedAddress += data.address.country;
                }
                setLocation(detailedAddress.trim());
              } else {
                console.log("Unable to determine location");
              }
            },
            function (error) {
              console.error("Error occurred: " + error.message);
            }
          );
        } else {
          console.log("Geolocation is not supported by your browser");
        }
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
          <div className={styles.childContainer}>
            <p>Operating System:</p>
            <p>{operatingSystem}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Browser:</p>
            <p>{browser}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Latitude:</p>
            <p>{latitude}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Longitude:</p>
            <p>{longitude}</p>
          </div>
          <div className={styles.childContainer}>
            <p>Location:</p>
            <p>{location}</p>
          </div>
        </div>
      )}
    </main>
  );
}
