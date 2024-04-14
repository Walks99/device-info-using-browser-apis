"use client";

import React, { useState, useEffect } from "react";
import styles from "./fingerprintMyDevice.styles.module.scss";
import { fetchDeviceInfo } from "@/utils/deviceInfo";
import WebBrowserAPIsIntroduction from "@/components/WebBrowserAPIsIntroduction/WebBrowserAPIsIntroduction";
import GenerateDataButton from "../../components/GenerateDataButton/GenerateDataButton";
import GenerateFingerprintButton from "../../components/GenerateFingerprintButton/GenerateFingerprintButton";
import GenerateCookieButton from "@/components/GenerateCookieButton/GenerateCookieButton";
import {
  setFingerprintCookie,
  getFingerprintCookie,
} from "../../utils/cookies";

function DisplayData() {
  // ------------------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>();
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
  const [colourDepth, setColourDepth] = useState<number | null>(null);
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
  const [generateDataButtonClicked, setGenerateDataButtonClicked] = useState<
    boolean | null
  >(null);
  // ------
  const [downlink, setDownlink] = useState<number | null>(null);
  const [effectiveType, setEffectiveType] = useState<string | null>(null);
  const [rtt, setRtt] = useState<number | null>(null);
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [currentEntryKey, setCurrentEntryKey] = useState<string | null>(null);
  const [timeOrigin, setTimeOrigin] = useState<string | null>(null);
  const [connectStart, setConnectStart] = useState<number | null>(null);
  const [decodedBodySize, setDecodedBodySize] = useState<number | null>(null);
  const [domContentLoadedEventStart, setDomContentLoadedEventStart] = useState<
    number | null
  >(null);
  const [domComplete, setDomComplete] = useState<number | null>(null);
  const [domainLookupStart, setDomainLookupStart] = useState<number | null>(
    null
  );
  const [fetchStart, setFetchStart] = useState<number | null>(null);
  const [requestStart, setRequestStart] = useState<number | null>(null);
  const [responseStart, setResponseStart] = useState<number | null>(null);
  const [responseEnd, setResponseEnd] = useState<number | null>(null);
  const [transferSize, setTransferSize] = useState<number | null>(null);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  useEffect(() => {
    const collect = async () => {
      const response = await fetchDeviceInfo();
      console.log(response);
      setScreenResolution(response.screenResolution);
      setDevicePixelRatio(response.devicePixelRatio);
      setScreenOrientation(response.screenOrientation);
      setColourDepth(response.colorDepth);
      setAspectRatio(response.aspectRatio);
      setUserAgent(response.userAgent);
      setOperatingSystem(response.operatingSystem);
      setNumberOfLogicalProcessors(response.numberOfLogicalProcessors);
      setEstimatedRAM(response.estimatedRAM);
      setBatteryLevel(response.battery);
      setBatteryCharging(response.charging);
      setBrowser(response.browser);
      setBrowserOnlineStatus(response.online);
      setVibrationSupported(response.vibrate);
      setDownlink(response.downlink);
      setEffectiveType(response.effectiveType);
      setRtt(response.rtt);
      setConnectStart(response.connectStart);
      setDecodedBodySize(response.decodedBodySize);
      setDomContentLoadedEventStart(response.domContentLoadedEventStart);
      setDomComplete(response.domComplete);
      setDomainLookupStart(response.domainLookupStart);
      setFetchStart(response.fetchStart);
      setRequestStart(response.requestStart);
      setResponseStart(response.responseStart);
      setResponseEnd(response.responseEnd);
      setTransferSize(response.transferSize);
      setCurrentEntryId(response.currentEntryID);
      setCurrentEntryKey(response.currentEntryKey);
      setTimeOrigin(response.timeOrigin);
      setBrowserLanguage(response.language);
      setLatitude(response.latitude);
      setLongitude(response.longitude);
      setLocation(response.location);
      setIsLoading(false);
    };
    collect();
  }, []);

  const generateFingerprint = async () => {
    // Calculate the fingerprint
    const fingerprintData = `${screenOrientation}${devicePixelRatio}${browserOnlineStatus}${userAgent}${batteryLevel}${batteryCharging}${vibrationSupported}${screenResolution}${aspectRatio}${colourDepth}${operatingSystem}${numberOfLogicalProcessors}${estimatedRAM}${browser}${latitude}${longitude}${location}${permissionInteracted}${locationsDisabled}${downlink}${effectiveType}${rtt}${currentEntryId}${screenOrientation}${currentEntryKey}${timeOrigin}${connectStart}${decodedBodySize}${domContentLoadedEventStart}${domComplete}${domainLookupStart}${fetchStart}${requestStart}${responseStart}${responseEnd}${transferSize}`;
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
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // -------------------------------------------------------------------------------- //
  const setAndGetFingerprintFromCookie = async () => {
    try {
      if (fingerprint !== null) {
        await setFingerprintCookie(fingerprint);
        setTimerActive(true);
        setRemainingTime(120);
        const fingerprintFromCookie = await getFingerprintCookie();
        console.log("Fingerprint from cookie: ", fingerprintFromCookie);
      } else {
        console.error("Fingerprint is null");
      }
    } catch (error) {
      console.error(
        "Error setting and getting fingerprint from cookie: ",
        error
      );
    }
  };
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ //
  // -------------------------------------------------------------------------------- //
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (timerActive) {
      timerId = setInterval(() => {
        setRemainingTime((prevTime = 0) => {
          if (prevTime <= 1) {
            clearInterval(timerId as NodeJS.Timeout);
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId as NodeJS.Timeout);
  }, [timerActive]);
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ //

  return (
    <main className={styles.main}>
      {/* ---------------------------------------------------------------------- */}
      <div className={styles.webIntroAndGenerateButtonsContainer}>
        <WebBrowserAPIsIntroduction />
        <div className={styles.generateButtonsContainer}>
          <GenerateDataButton
            setGenerateDataButtonClicked={setGenerateDataButtonClicked}
          />
          {generateDataButtonClicked ? (
            !isLoading ? (
              <GenerateFingerprintButton onClick={generateFingerprint} />
            ) : null
          ) : null}
          {fingerprint ? (
            <GenerateCookieButton onClick={setAndGetFingerprintFromCookie} />
          ) : null}
          {timerActive ? (
            <div className={styles.timerActiveContainer}>
              <p>Expires in:</p>
              <p className={styles.remainingTime}>{remainingTime} seconds</p>
            </div>
          ) : (
            <div>
              {remainingTime === 0 ? (
                <div className={styles.timerActiveContainer}>
                  <p className={styles.remainingTime}>Cookie expired</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      <div className={styles.deviceInfoContainer}>
        {" "}
        {/* Start */}
        {/* ------------------------------------------------------- */}
        <div className={styles.deviceInfoColumn}>
          {/* DONE */}
          <div className={styles.childContainer}>
            {generateDataButtonClicked ? (
              isLoading ? null : (
                <>
                  <p>Fingerprint:</p>
                  {fingerprint ? (
                    <p className={styles.data}>{fingerprint}</p>
                  ) : null}
                </>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Screen Resolution:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : screenResolution ? (
                <p className={styles.data}>{screenResolution}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Aspect Ratio:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : aspectRatio ? (
                <p className={styles.data}>{aspectRatio}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Device Pixel Ratio:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : devicePixelRatio ? (
                <p className={styles.data}>{devicePixelRatio}</p>
              ) : (
                <p className={styles.data}>No data avialable</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Colour depth:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : colourDepth ? (
                <p className={styles.colorDepth}>{colourDepth}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Screen Orientation:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : screenOrientation ? (
                <p className={styles.data}>{screenOrientation}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Browser Language:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : browserLanguage ? (
                <p className={styles.data}>{browserLanguage}</p>
              ) : (
                <p className={styles.data}>No data available </p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Browser:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : browser ? (
                <p className={styles.data}>{}browser</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Browser Online Status:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : browserOnlineStatus ? (
                <p className={styles.data}>Online</p>
              ) : (
                <p className={styles.data}>Offline</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={`${styles.childContainer} ${styles.secondClass}`}>
            <p>User Agent:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : userAgent ? (
                <p className={styles.data}>{userAgent}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Operating System:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading</p>
              ) : operatingSystem ? (
                <p className={styles.data}>{}operatingSystem</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Number of Logical Processors:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : numberOfLogicalProcessors ? (
                <p className={styles.data}>{numberOfLogicalProcessors}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Estimated RAM:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : estimatedRAM ? (
                <p className={styles.data}>{`${estimatedRAM} GB`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Battery Level:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : batteryLevel ? (
                <p className={styles.data}>{`${batteryLevel}%`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Battery Charging:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : batteryCharging ? (
                <p className={styles.data}>Yes</p>
              ) : (
                <p className={styles.data}>No</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Vibration Supported:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : vibrationSupported ? (
                <p className={styles.data}>Yes</p>
              ) : (
                <p className={styles.data}>No</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Connection downlink:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : downlink ? (
                <p className={styles.data}>{`${downlink} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Connection effectiveType:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : effectiveType ? (
                <p className={styles.data}>{effectiveType}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
        </div>
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
        {/* -------------------------------------------------- */}
        <div className={styles.deviceInfoColumn}>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>Connection rtt:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading</p>
              ) : rtt ? (
                <p className={styles.data}>{`${rtt} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>currentEntry id:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading..</p>
              ) : currentEntryId ? (
                <p className={styles.data}>{currentEntryId}</p>
              ) : (
                // Handle the case where isLoading is false and currentEntryId is falsy
                <p className={styles.data}>No data available.</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>currentEntry key</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : currentEntryKey ? (
                <p className={styles.data}>{currentEntryKey}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>time origin:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : timeOrigin ? (
                <p className={styles.data}>{timeOrigin}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>connectStart</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : connectStart ? (
                <p className={styles.data}>{`${connectStart} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>decodeBodySize:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading ...</p>
              ) : decodedBodySize ? (
                <p className={styles.data}>{`${decodedBodySize} bytes`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>domContentLoadedEventStart:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : domContentLoadedEventStart ? (
                <p
                  className={styles.data}
                >{`${domContentLoadedEventStart} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE  */}
          <div className={styles.childContainer}>
            <p>domComplete:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : domComplete ? (
                <p className={styles.data}>{`${domComplete} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>domainLookupStart:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading</p>
              ) : domainLookupStart ? (
                <p
                  className={styles.data}
                >{`${domainLookupStart} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>fetchStart:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : fetchStart ? (
                <p className={styles.data}>{`${fetchStart} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>requestStart:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : requestStart ? (
                <p className={styles.data}>{`${requestStart} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>responseStart:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : responseStart ? (
                <p className={styles.data}>{`${responseStart} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>responseEnd:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : responseEnd ? (
                <p className={styles.data}>{`${responseEnd} milliseconds`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>
          {/* DONE */}
          <div className={styles.childContainer}>
            <p>transferSize:</p>
            {generateDataButtonClicked ? (
              isLoading ? (
                <p className={styles.data}>Loading...</p>
              ) : transferSize ? (
                <p className={styles.data}>{`${transferSize} bytes`}</p>
              ) : (
                <p className={styles.data}>No data available</p>
              )
            ) : null}
          </div>

          {locationsDisabled ? (
            <div className={styles.childContainer}>
              <p>Location:</p>
              <p className={styles.data}>
                Disabled - Update browser permissions in device settings
              </p>
            </div>
          ) : (
            <>
              <div className={styles.childContainer}>
                <p>Latitude:</p>
                {generateDataButtonClicked ? (
                  <p className={styles.data}>
                    {latitude ? latitude : "Loading..."}
                  </p>
                ) : null}
              </div>
              <div className={styles.childContainer}>
                <p>Longitude:</p>
                {generateDataButtonClicked ? (
                  <p className={styles.data}>
                    {longitude ? longitude : "Loading..."}
                  </p>
                ) : null}
              </div>
              <div className={styles.childContainer}>
                <p>Location:</p>
                {generateDataButtonClicked ? (
                  <p className={styles.data}>
                    {location ? location : "Loading..."}
                  </p>
                ) : null}
              </div>
            </>
          )}
        </div>
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
      </div>{" "}
      {/* End */}
      {/* ---------------------------------------------------------------------- */}
    </main>
  );
}

export default DisplayData;
