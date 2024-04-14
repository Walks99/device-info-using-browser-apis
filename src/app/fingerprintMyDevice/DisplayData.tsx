"use client";

import React, { useState, useEffect } from 'react';
import styles from './fingerprintMyDevice.styles.module.scss'
import {fetchDeviceInfo } from '@/utils/deviceInfo';
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
    const [screenResolution, setScreenResolution] =
      useState<string | null>(null);
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
            setScreenResolution(response.screenResolution)
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
            setRequestStart(response.requestStart)
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
        }
        collect();
    }, [])

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
      // -------------------------------------------------------------------------------- // NEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEWNEW
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

  return (
    <main className={styles.main}>
      {/* ---------------------------------------------------------------------- */}
      <div className={styles.webIntroAndGenerateButtonsContainer}>
        <WebBrowserAPIsIntroduction />
        <div className={styles.generateButtonsContainer}>
          <GenerateDataButton
            setGenerateDataButtonClicked={setGenerateDataButtonClicked}
          />
          {isLoading ? null : (
            <GenerateFingerprintButton onClick={generateFingerprint} />
          )}
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
          {isLoading ? null : (
            <div className={styles.childContainer}>
              <p>Fingerprint:</p>
              {fingerprint ? (
                <p className={styles.data}>{fingerprint}</p>
              ) : null}
            </div>
          )}
          <div className={styles.childContainer}>
            <p>Screen Resolution in CSS Pixels:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{screenResolution}</p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>Aspect Ratio:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{aspectRatio}</p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>Device Pixel Ratio:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{devicePixelRatio}</p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>Colour depth:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{colourDepth}</p>
            ) : null}
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
            ) : null}
          </div>
          {browser ? (
            <div className={styles.childContainer}>
              <p>Browser:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{browser}</p>
              ) : null}
            </div>
          ) : null}
          <div className={styles.childContainer}>
            <p>Browser Online Status:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {browserOnlineStatus ? "Online" : "Offline"}
              </p>
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
              ) : null}
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
          {/* {batteryLevel ? ( */}
          <div className={styles.childContainer}>
            <p>Battery Level:</p>
            {generateDataButtonClicked ? (
              // <p className={styles.data}>{`${batteryLevel}%`}</p>
              <p className={styles.data}>
                {batteryLevel ? `${batteryLevel}%` : "N/A"}
              </p>
            ) : null}
          </div>
          {/* ) : null} */}
          {batteryCharging ? (
            <div className={styles.childContainer}>
              <p>Battery Charging:</p>
              {generateDataButtonClicked ? (
                <p className={styles.data}>{batteryCharging ? "Yes" : "No"}</p>
              ) : null}
            </div>
          ) : null}
          <div className={styles.childContainer}>
            <p>Vibration Supported:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{vibrationSupported ? "Yes" : "No"}</p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>Connection downlink:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {downlink ? `${downlink} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>Connection effectiveType:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {effectiveType ? effectiveType : "N/A"}
              </p>
            ) : null}
          </div>
        </div>
        {/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */}
        {/* -------------------------------------------------- */}
        <div className={styles.deviceInfoColumn}>
          <div className={styles.childContainer}>
            <p>Connection rtt:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {rtt ? `${rtt} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>currentEntry id:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {currentEntryId ? currentEntryId : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>currentEntry key</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {currentEntryKey ? currentEntryKey : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>time origin:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>{timeOrigin ? timeOrigin : "N/A"}</p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>connectStart</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {connectStart ? `${connectStart} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>decodeBodySize:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {decodedBodySize ? `${decodedBodySize} bytes` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>domContentLoadedEventStart:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {domContentLoadedEventStart
                  ? `${domContentLoadedEventStart} milliseconds`
                  : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>domComplete:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {domComplete ? `${domComplete} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>domainLookupStart:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {domainLookupStart
                  ? `${domainLookupStart} milliseconds`
                  : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>fetchStart:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {fetchStart ? `${fetchStart} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>requestStart:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {requestStart ? `${requestStart} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>responseStart:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {responseStart ? `${responseStart} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>responseEnd:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {responseEnd ? `${responseEnd} milliseconds` : "N/A"}
              </p>
            ) : null}
          </div>
          <div className={styles.childContainer}>
            <p>transferSize:</p>
            {generateDataButtonClicked ? (
              <p className={styles.data}>
                {transferSize ? `${transferSize} bytes` : "N/A"}
              </p>
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
  )
}

export default DisplayData;