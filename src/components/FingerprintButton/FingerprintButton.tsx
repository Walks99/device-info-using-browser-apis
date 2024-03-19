// "use client";

// import React, { useState} from 'react';
// import styles from './FingerprintButton.styles.module.scss'
// import { getFingerprint } from "@thumbmarkjs/thumbmarkjs";


// export default function FingerprintButton() {
//     const [fingerprint, setFingerprint] = useState<string | null>(null);

//     const handleClick = async () => {
//         const fingerprint = await getFingerprint();
//         setFingerprint(fingerprint);
//       };
    
//   return (
//     <div className={styles.childContainer}>
//     <button onClick={handleClick}>Generate Fingerprint</button>
//     {fingerprint ? (
//       <div>
//         <p>{fingerprint}</p>
//       </div>
//     ) : null}
//   </div>
//   )
// }

