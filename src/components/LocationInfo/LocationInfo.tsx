// // src/components/LocationInfo.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import styles from "./LocationInfo.styles.module.scss";

// // Define an interface for the props
// interface LocationInfoProps {
//     setPermissionInteracted: (permissionInteracted: boolean) => void;
//    }

// export default function LocationInfo({ setPermissionInteracted }: LocationInfoProps) {
//   const [latitude, setLatitude] = useState<number | null>(null);
//   const [longitude, setLongitude] = useState<number | null>(null);
//   const [location, setLocation] = useState<string | null>(null);
//   const [locationsDisabled, setLocationsDisabled] = useState(false);

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
//   return (
//     <div className={styles.main}>
//       {locationsDisabled ? (
//         <div className={styles.childContainer}>
//           <p>Location:</p>
//           <p>Disabled - Update browser permissions in device settings</p>
//         </div>
//       ) : (
//         <>
//           <div className={styles.childContainer}>
//             <p>Latitude:</p>
//             <p>{latitude ? latitude : "Loading..."}</p>
//           </div>
//           <div className={styles.childContainer}>
//             <p>Longitude:</p>
//             <p>{longitude ? longitude : "Loading..."}</p>
//           </div>
//           <div className={styles.childContainer}>
//             <p>Location:</p>
//             <p>{location ? location : "Loading..."}</p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
