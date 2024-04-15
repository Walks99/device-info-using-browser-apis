export const generateFingerprint = async () => {
    // Calculate the fingerprint
    const fingerprintData = `${screenOrientation}${devicePixelRatio}${browserOnlineStatus}${userAgent}${batteryLevel}${batteryCharging}${vibrationSupported}${screenResolution}${aspectRatio}${colourDepth}${operatingSystem}${numberOfLogicalProcessors}${estimatedRAM}${browser}${latitude}${longitude}${location}${downlink}${effectiveType}${rtt}${currentEntryId}${screenOrientation}${currentEntryKey}${timeOrigin}${connectStart}${decodedBodySize}${domContentLoadedEventStart}${domComplete}${domainLookupStart}${fetchStart}${requestStart}${responseStart}${responseEnd}${transferSize}`;
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(fingerprintData)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    setFingerprint(hashHex);
    console.log("Fingerprint:", hashHex);
  };