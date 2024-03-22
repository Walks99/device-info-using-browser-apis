// utils/cookies.ts
"use client";

export function setFingerprintCookie(fingerprint: string): void {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 2); // Set to expire in 2 minutes
  document.cookie = `fingerprint=${fingerprint}; expires=${expiryDate.toUTCString()}; path=/`;
}

export function getFingerprintCookie(): string {
  const name = "fingerprint=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
