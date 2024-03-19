// "use client";

// import styles from "./page.module.scss";
// import React, { useEffect, useState } from "react";
// import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";

// export default function Home() {
//   const [screenOrientation, setScreenOrientation] = useState<string | null>(
//     null
//   );
//   const [devicePixelRatio, setDevicePixelRatio] = useState<number | null>(null);
//   const [browserLanguage, setBrowserLanguage] = useState<string | null>(null);
//   const [browserOnlineStatus, setBrowserOnlineStatus] = useState<
//     boolean | null
//   >(null);
//   const [userAgent, setUserAgent] = useState<string | null>(null);
//   const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
//   const [batteryCharging, setBatteryCharging] = useState<boolean | null>(null);
//   const [vibrationSupported, setVibrationSupported] = useState<boolean | null>(
//     null
//   );
//   const [screenResolutionInCSSPixels, setScreenResolutionInCSSPixels] =
//     useState<string | null>(null);
//   const [
//     screenResolutionInPhysicalPixels,
//     setScreenResolutionInPhysicalPixels,
//   ] = useState<string | null>(null);
//   const [aspectRatioInCSSPixels, setAspectRatioInCSSPixels] = useState<
//     string | null
//   >(null);
//   const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
//   const [numberOfLogicalProcessors, setNumberOfLogicalProcessors] = useState<
//     number | null
//   >(null);
//   const [estimatedRAM, setEstimatedRAM] = useState<number | null>(null);
//   const [browser, setBrowser] = useState<string | null>(null);
//   const [latitude, setLatitude] = useState<number | null>(null);
//   const [longitude, setLongitude] = useState<number | null>(null);
//   const [location, setLocation] = useState<string | null>(null);
//   const [permissionInteracted, setPermissionInteracted] = useState(false);
//   const [locationsDisabled, setLocationsDisabled] = useState(false);
//   const [fingerprint, setFingerprint] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDeviceInfo = async () => {
//       console.log(window.History.length);
//       console.log("Fetching device info...");
//       try {
//         // Screen Details
//         const widthInCSSPixels = window.screen.width;
//         const heightInCSSPixels = window.screen.height;
//         const devicePixelRatio = window.devicePixelRatio;
//         setScreenResolutionInCSSPixels(
//           `${widthInCSSPixels} x ${heightInCSSPixels}`
//         );
//         const widthInPhysicalPixels = Math.round(
//           widthInCSSPixels * devicePixelRatio
//         );
//         const heightInPhysicalPixels = Math.round(
//           heightInCSSPixels * devicePixelRatio
//         );
//         setScreenResolutionInPhysicalPixels(
//           `${widthInPhysicalPixels} x ${heightInPhysicalPixels}`
//         );
//         setScreenOrientation(window.screen.orientation.type);
//         setDevicePixelRatio(Number(devicePixelRatio.toFixed(2)));

//         // Aspect Ratio
//         const commonLandscapeRatios = [
//           { name: "4/3", value: 4 / 3 },
//           { name: "16/9", value: 16 / 9 },
//           { name: "16/10", value: 16 / 10 },
//           { name: "1/1", value: 1 },
//           { name: "21/9", value: 21 / 9 },
//           { name: "32/9", value: 32 / 9 },
//           { name: "5/4", value: 5 / 4 },
//           { name: "3/2", value: 3 / 2 },
//           { name: "2/1", value: 2 },
//         ];
//         const commonPortraitRatios = [
//           { name: "3/4", value: 4 / 3 },
//           { name: "9/16", value: 16 / 9 },
//           { name: "10/16", value: 16 / 10 },
//           { name: "1/1", value: 1 },
//           { name: "9/21", value: 21 / 9 },
//           { name: "9/32", value: 32 / 9 },
//           { name: "4/5", value: 5 / 4 },
//           { name: "2/3", value: 3 / 2 },
//           { name: "1/2", value: 2 },
//         ];

//         let aspectRatio: number;

//         if (window.screen.orientation.type === "landscape-primary") {
//           aspectRatio = widthInCSSPixels / heightInCSSPixels;
//           const closestLandscapeRatio = commonLandscapeRatios.reduce(
//             (prev, curr) =>
//               Math.abs(curr.value - aspectRatio) <
//               Math.abs(prev.value - aspectRatio)
//                 ? curr
//                 : prev
//           );
//           setAspectRatioInCSSPixels(closestLandscapeRatio.name);
//         } else {
//           aspectRatio = heightInCSSPixels / widthInCSSPixels;
//           const closestPortraitRatio = commonPortraitRatios.reduce(
//             (prev, curr) =>
//               Math.abs(curr.value - aspectRatio) <
//               Math.abs(prev.value - aspectRatio)
//                 ? curr
//                 : prev
//           );
//           setAspectRatioInCSSPixels(closestPortraitRatio.name);
//         }

//         // Navigator Information
//         setBrowserLanguage(navigator.language);
//         setBrowserOnlineStatus(navigator.onLine);
//         if ((navigator as any).userAgentData) {
//           setOperatingSystem((navigator as any).userAgentData.platform);
//           setNumberOfLogicalProcessors((navigator as any).hardwareConcurrency);
//           setEstimatedRAM((navigator as any).deviceMemory);
//           setBrowser((navigator as any).userAgentData.brands[2].brand);
//         } else {
//           console.log("userAgentData is not supported");
//         }

//         // User Agent Information
//         setUserAgent(navigator.userAgent);

//         // Battery Status
//         if ("getBattery" in navigator) {
//           const battery = await (navigator.getBattery as any)();
//           setBatteryLevel(Math.round(battery.level * 100));
//           setBatteryCharging(battery.charging);
//         } else {
//           console.log("Battery API is not supported");
//         }

//         // Vibration API
//         setVibrationSupported("vibrate" in navigator);
//       } catch (error) {
//         console.error("Error fetching device info:", error);
//       }
//     };

//     fetchDeviceInfo();
//   }, [permissionInteracted]);

//   useEffect(() => {
//     const fetchLocation = async () => {
//       // Geolocation
//       if (navigator.geolocation) {
//         // Request permission to access the user's location
//         navigator.geolocation.getCurrentPosition(
//           async function (position) {
//             setPermissionInteracted(true);
//             setLatitude(position.coords.latitude);
//             setLongitude(position.coords.longitude);
//             const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`;
//             const response = await fetch(locationUrl);
//             const data = await response.json();
//             if (data && data.address) {
//               let detailedAddress = "";
//               if (data.address.house_number) {
//                 detailedAddress += data.address.house_number + " ";
//               }
//               if (data.address.road) {
//                 detailedAddress += data.address.road + ", ";
//               }
//               if (data.address.suburb) {
//                 detailedAddress += data.address.suburb + ", ";
//               }
//               if (data.address.city) {
//                 detailedAddress += data.address.city + ", ";
//               }
//               if (data.address.country) {
//                 detailedAddress += data.address.country;
//               }
//               setLocation(detailedAddress.trim());
//             } else {
//               console.log("Unable to determine location");
//             }
//           },
//           function (error) {
//             setPermissionInteracted(true);
//             console.error("Error occurred: " + error.message);
//             setLocationsDisabled(true);
//           }
//         );
//       } else {
//         console.log("Geolocation is not supported by your browser");
//         setLocationsDisabled(true);
//       }
//     };
//     fetchLocation();
//   }, []);

//   const handleClick = async () => {
//     const fingerprint = await getFingerprint();
//     setFingerprint(fingerprint);
//   };

//   return (
//     <main className={styles.main}>

//         <div className={styles.deviceInfoContainer}>
//           <div className={styles.childContainer}>
//             <p>Screen Resolution in CSS Pixels:</p>
//             <p>{screenResolutionInCSSPixels}</p>
//           </div>
//           <div className={styles.childContainer}>
//             <p>Screen Resolution in Physical Pixels:</p>
//             <p>{screenResolutionInPhysicalPixels}</p>
//           </div>
//           <div className={styles.childContainer}>
//             <p>Aspect Ratio:</p>
//             <p>{aspectRatioInCSSPixels}</p>
//           </div>
//           <div className={styles.childContainer}>
//             <p>Device Pixel Ratio:</p>
//             <p>{devicePixelRatio}</p>
//           </div>
//           <div className={styles.childContainer}>
//             <p>Screen Orientation:</p>
//             <p>{screenOrientation}</p>
//           </div>
//           <div className={styles.childContainer}>
//             <p>Browser Language:</p>
//             <p>{browserLanguage}</p>
//           </div>
//           {browser ? (
//             <div className={styles.childContainer}>
//               <p>Browser:</p>
//               <p>{browser}</p>
//             </div>
//           ) : null}
//           <div className={styles.childContainer}>
//             <p>Browser Online Status:</p>
//             <p>{browserOnlineStatus ? "Online" : "Offline"}</p>
//           </div>
//           <div className={`${styles.childContainer} ${styles.secondClass}`}>
//             <p>User Agent:</p>
//             <p>{userAgent}</p>
//           </div>
//           {operatingSystem ? (
//             <div className={styles.childContainer}>
//               <p>Operating System:</p>
//               <p>{operatingSystem}</p>
//             </div>
//           ) : null}
//           {numberOfLogicalProcessors ? (
//             <div className={styles.childContainer}>
//               <p>Number of Logical Processors:</p>
//               <p>{numberOfLogicalProcessors}</p>
//             </div>
//           ) : null}
//           {estimatedRAM ? (
//             <div className={styles.childContainer}>
//               <p>Estimated RAM:</p>
//               <p>{`${estimatedRAM} GB`}</p>
//             </div>
//           ) : null}
//           {batteryLevel ? (
//             <div className={styles.childContainer}>
//               <p>Battery Level:</p>
//               <p>{`${batteryLevel}%`}</p>
//             </div>
//           ) : null}
//           {batteryCharging ? (
//             <div className={styles.childContainer}>
//               <p>Battery Charging:</p>
//               <p>{batteryCharging ? "Yes" : "No"}</p>
//             </div>
//           ) : null}
//           <div className={styles.childContainer}>
//             <p>Vibration Supported:</p>
//             <p>{vibrationSupported ? "Yes" : "No"}</p>
//           </div>
//           {locationsDisabled ? (
//             <div className={styles.childContainer}>
//               <p>Location:</p>
//               <p>Disabled - Update browser permissions in device settings</p>
//             </div>
//           ) : (
//             <>
//               <div className={styles.childContainer}>
//                 <p>Latitude:</p>
//                 <p>{latitude ? latitude : "Loading..."}</p>
//               </div>
//               <div className={styles.childContainer}>
//                 <p>Longitude:</p>
//                 <p>{longitude ? longitude : "Loading..."}</p>
//               </div>
//               <div className={styles.childContainer}>
//                 <p>Location:</p>
//                 <p>{location ? location : "Loading..."}</p>
//               </div>
//             </>
//           )}
//           <div className={styles.childContainer}>
//             <button onClick={handleClick}>Generate Fingerprint</button>
//             {fingerprint ? (
//               <div>
//                 <p>{fingerprint}</p>
//               </div>
//             ) : null}
//           </div>
//         </div>
//     </main>
//   );
// }

// ###############

// src/app/page.tsx
"use client";

import styles from "./newpage.module.scss";
import React, { useEffect, useState } from "react";
import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";
import WebBrowserAPIsIntroduction from "@/components/WebBrowserAPIsIntroduction/WebBrowserAPIsIntroduction";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  const [screenResolutionInCSSPixels, setScreenResolutionInCSSPixels] =
    useState<string | null>(null);
  const [
    screenResolutionInPhysicalPixels,
    setScreenResolutionInPhysicalPixels,
  ] = useState<string | null>(null);
  const [aspectRatioInCSSPixels, setAspectRatioInCSSPixels] = useState<
    string | null
  >(null);
  const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
  const [numberOfLogicalProcessors, setNumberOfLogicalProcessors] = useState<
    number | null
  >(null);
  const [estimatedRAM, setEstimatedRAM] = useState<number | null>(null);
  const [browser, setBrowser] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [permissionInteracted, setPermissionInteracted] = useState(false);
  const [locationsDisabled, setLocationsDisabled] = useState(false);
  const [fingerprint, setFingerprint] = useState<string | null>(null);
  const [generateDataButtonClicked, setGenerateDataButtonClicked] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchDeviceInfo = async () => {

      console.log(window.History.length);
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
          setAspectRatioInCSSPixels(closestLandscapeRatio.name);
        } else {
          aspectRatio = heightInCSSPixels / widthInCSSPixels;
          const closestPortraitRatio = commonPortraitRatios.reduce(
            (prev, curr) =>
              Math.abs(curr.value - aspectRatio) <
              Math.abs(prev.value - aspectRatio)
                ? curr
                : prev
          );
          setAspectRatioInCSSPixels(closestPortraitRatio.name);
        }

        // Navigator Information
        setBrowserLanguage(navigator.language);
        setBrowserOnlineStatus(navigator.onLine);
        if ((navigator as any).userAgentData) {
          setOperatingSystem((navigator as any).userAgentData.platform);
          setNumberOfLogicalProcessors((navigator as any).hardwareConcurrency);
          setEstimatedRAM((navigator as any).deviceMemory);
          setBrowser((navigator as any).userAgentData.brands[2].brand);
        } else {
          console.log("userAgentData is not supported");
        }

        // User Agent Information
        setUserAgent(navigator.userAgent);

        // Battery Status
        if ("getBattery" in navigator) {
          const battery = await (navigator.getBattery as any)();
          setBatteryLevel(Math.round(battery.level * 100));
          setBatteryCharging(battery.charging);
        } else {
          console.log("Battery API is not supported");
        }

        // Vibration API
        setVibrationSupported("vibrate" in navigator);
      } catch (error) {
        console.error("Error fetching device info:", error);
      }
    };

    fetchDeviceInfo();
  }, [permissionInteracted]);

  useEffect(() => {
    if (generateDataButtonClicked) {
      const fetchLocation = async () => {
        // Geolocation
        if (navigator.geolocation) {
          // Request permission to access the user's location
          navigator.geolocation.getCurrentPosition(
            async function (position) {
              setIsLoading(false);
              setPermissionInteracted(true);
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`;
              const response = await fetch(locationUrl);
              const data = await response.json();
              if (data && data.address) {
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
              setIsLoading(false);
            },
            function (error) {
              setPermissionInteracted(true);
              console.error("Error occurred: " + error.message);
              setIsLoading(false);
              setLocationsDisabled(true);
            }
          );
        } else {
          console.log("Geolocation is not supported by your browser");
          setLocationsDisabled(true);
        }
      };
      fetchLocation();
    }
  }, [generateDataButtonClicked]);

  const handleClick = async () => {
    const fingerprint = await getFingerprint();
    setFingerprint(fingerprint);
  };

  return (
    <main className={styles.main}>
      <WebBrowserAPIsIntroduction setGenerateDataButtonClicked={setGenerateDataButtonClicked}/>
        <div className={styles.deviceInfoContainer}>
          <div className={styles.childContainer}>
            <p>Screen Resolution in CSS Pixels:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{screenResolutionInCSSPixels}</p>
            ) : (
              null
            )}
          </div>
          <div className={styles.childContainer}>
            <p>Screen Resolution in Physical Pixels:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{screenResolutionInPhysicalPixels}</p>
            ) : (
              null
            )}
          </div>
          <div className={styles.childContainer}>
            <p>Aspect Ratio:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{aspectRatioInCSSPixels}</p>
            ) : (
              null
            )}
          </div>
          <div className={styles.childContainer}>
            <p>Device Pixel Ratio:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{devicePixelRatio}</p>
            ) : (
              null
            )}
          </div>
          <div className={styles.childContainer}>
            <p>Screen Orientation:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{screenOrientation}</p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>Browser Language:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{browserLanguage}</p>
            ) : (
              null
            )}
          </div>
          {browser ? (
            <div className={styles.childContainer}>
              <p>Browser:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{browser}</p>
              ) : (
                null
              )}
            </div>
          ) : null}
          <div className={styles.childContainer}>
            <p>Browser Online Status:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{browserOnlineStatus ? "Online" : "Offline"}</p>
            ) : null}
          </div>
          <div className={`${styles.childContainer} ${styles.secondClass}`}>
            <p>User Agent:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{userAgent}</p>
            ) : null}
          </div>
          {operatingSystem ? (
            <div className={styles.childContainer}>
              <p>Operating System:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{operatingSystem}</p>
              ) : (
                null
              )}
            </div>
          ) : null}
          {numberOfLogicalProcessors ? (
            <div className={styles.childContainer}>
              <p>Number of Logical Processors:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{numberOfLogicalProcessors}</p>
              ) : null}
            </div>
          ) : null}
          {estimatedRAM ? (
            <div className={styles.childContainer}>
              <p>Estimated RAM:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{`${estimatedRAM} GB`}</p>
              ) : null}
            </div>
          ) : null}
          {batteryLevel ? (
            <div className={styles.childContainer}>
              <p>Battery Level:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{`${batteryLevel}%`}</p>
              ) : (
                null
              )}
            </div>
          ) : null}
          {batteryCharging ? (
            <div className={styles.childContainer}>
              <p>Battery Charging:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{batteryCharging ? "Yes" : "No"}</p>
              ) : (
                null
              )}
            </div>
          ) : null}
          <div className={styles.childContainer}>
            <p>Vibration Supported:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{vibrationSupported ? "Yes" : "No"}</p>
            ) : null}
          </div>
          {locationsDisabled ? (
            <div className={styles.childContainer}>
              <p>Location:</p>
              <p className={styles.data}>Disabled - Update browser permissions in device settings</p>
            </div>
          ) : (
            <>
              <div className={styles.childContainer}>
                <p>Latitude:</p>
                {generateDataButtonClicked ? (
                  <p className={styles.data}>{latitude ? latitude : "Loading..."}</p>
                ) : null}
              </div>
              <div className={styles.childContainer}>
                <p>Longitude:</p>
                {generateDataButtonClicked ? (
                  <p className={styles.data}>{longitude ? longitude : "Loading..."}</p>
                ) : (
                  null
                )}
              </div>
              <div className={styles.childContainer}>
                <p>Location:</p>
                {generateDataButtonClicked ? (
                  <p className={styles.data}>{location ? location : "Loading..."}</p>
                ) : (
                  null
                )}
              </div>
            </>
          )}
          {isLoading ? (
            null
          ) : (
            <div className={styles.buttonContainer}>
            <button onClick={handleClick}>Generate Fingerprint</button>
            {fingerprint ? (
              <div>
                <p className={styles.data}>{fingerprint}</p>
              </div>
            ) : null}
          </div>
          )}
        </div>
    </main>
  );
}