// utils/cookies.ts
"use client";
// export function setFingerprintCookie(fingerprint: string): void {
//     const expiryDate = new Date();
//     expiryDate.setDate(expiryDate.getDate() + 30); // Set to expire in 30 days
//     document.cookie = `fingerprint=${fingerprint}; expires=${expiryDate.toUTCString()}; path=/`;
//    }

export function setFingerprintCookie(fingerprint: string): void {
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 1); // Set to expire in 1 minutes
    document.cookie = `fingerprint=${fingerprint}; expires=${expiryDate.toUTCString()}; path=/`;
}
   
   export function getFingerprintCookie(): string {
    const name = "fingerprint=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
       let c = cookies[i];
       while (c.charAt(0) === ' ') {
         c = c.substring(1);
       }
       if (c.indexOf(name) === 0) {
         return c.substring(name.length, c.length);
       }
    }
    return "";
   }
   