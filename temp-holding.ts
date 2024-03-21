        // <div className={styles.gifsContainer}>
        //   {currentGif === 1 && (
        //     <iframe
        //       src="https://giphy.com/embed/3ohc0Rnm6JE0cg0RvG"
        //       width="880"
        //       height="880"
        //       className="giphy-embed"
        //       allowFullScreen
        //       sandbox="allow-scripts allow-same-origin"
        //       style={{ pointerEvents: "none", border: "none" }}
        //     ></iframe>
        //   )}
        //   {currentGif === 2 && (
        //     <iframe
        //       src="https://giphy.com/embed/zQc8STzaOlJ3q" 
        //       width="880"
        //       height="880"
        //       className="giphy-embed"
        //       allowFullScreen
        //       sandbox="allow-scripts allow-same-origin"
        //       style={{ pointerEvents: "none", border: "none" }}
        //     ></iframe>
        //   )}
        //   {currentGif === 3 && (
        //     <iframe
        //       src="https://giphy.com/embed/3ubqmFn2F7ytq" 
        //       width="880"
        //       height="880"
        //       className="giphy-embed"
        //       allowFullScreen
        //       sandbox="allow-scripts allow-same-origin"
        //       style={{ pointerEvents: "none", border: "none" }}
        //     ></iframe>
        //   )}
        //   {currentGif === 4 && (
        //     <iframe
        //       src="https://giphy.com/embed/l378b59fSuMV12tzO" 
        //       width="880"
        //       height="880"
        //       className="giphy-embed"
        //       allowFullScreen
        //       sandbox="allow-scripts allow-same-origin"
        //       style={{ pointerEvents: "none", border: "none" }}
        //     ></iframe>
        //   )}
        //   {currentGif === 5 && (
        //     <iframe
        //       src="https://giphy.com/embed/l3diU8csLCa1UcBc4" 
        //       width="880"
        //       height="880"
        //       className="giphy-embed"
        //       allowFullScreen
        //       sandbox="allow-scripts allow-same-origin"
        //       style={{ pointerEvents: "none", border: "none" }}
        //     ></iframe>
        //   )}
        // </div>

// ##############################################################################################################

  // useEffect(() => {
  //   const switchGif = () => {
  //     setCurrentGif((prevGif) => (prevGif < 5 ? prevGif + 1 : 1));
  //   };

  //   switchGif();
  //   const intervalId = setInterval(() => {
  //     switchGif();
  //   }, 3000);

  //   // Cleanup function
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

// ##############################################################################################################

      // let performanceEntries = performance.getEntriesByType("navigation");
      // if (performanceEntries.length) {
      //   let navigationEntry = performanceEntries[0];
      //   console.log(navigationEntry);
      // } 

// ##############################################################################################################

// const fingerprintData = `${screenOrientation}${devicePixelRatio}${browserOnlineStatus}${userAgent}${batteryLevel}${batteryCharging}${vibrationSupported}${screenResolutionInCSSPixels}${aspectRatio}${colourDepth}${operatingSystem}${numberOfLogicalProcessors}${estimatedRAM}${browser}${latitude}${longitude}${location}${permissionInteracted}${locationsDisabled}${downlink}${effectiveType}${rtt}${currentEntryId}${screenOrientation}${currentEntryKey}${timeOrigin}${connectStart}${decodedBodySize}${domContentLoadedEventStart}${domComplete}${domainLookupStart}${fetchStart}${requestStart}${responseStart}${responseEnd}${transferSize}`;