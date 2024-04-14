"use client";
// ---------------------------------------------------------------------------------------
// Required interfaces
import {
  DeviceInfo,
  ExtendedNavigator,
  NavigationTimingEntry,
  AspectRatio,
  ScreenDimensions,
  GeoLocationData,
  GeoPosition,
  GeoLocationResult,
  // ExtendedWindow,
} from "../interfaces/deviceInfoInterfaces";
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ---------------------------------------------------------------------------------------
/**
 * The `fetchDeviceInfo` function is an asynchronous function that collects and returns a comprehensive set of device information, including screen dimensions, pixel ratio, color depth, aspect ratio, user agent, operating system, number of logical processors, estimated RAM, browser, and geolocation data. It initializes a `DeviceInfo` object with default values and then populates these values by accessing various properties of the `window.screen` and `navigator` objects. For aspect ratio, it uses helper functions `calculateLandscapeRatio` and `calculatePortraitRatio` to determine the closest common aspect ratio based on the screen's width and height. If geolocation is supported and permission is granted, it fetches the user's geolocation data using the `fetchGeoLocationData` function, which in turn uses the OpenStreetMap API to reverse geolocate the latitude and longitude to a detailed address. The function handles errors gracefully, logging them to the console and setting the `error` property of the `DeviceInfo` object accordingly. This function provides a robust way to gather detailed device information and geolocation data for use in web applications.
 */

export const fetchDeviceInfo = async (): Promise<DeviceInfo> => {
  console.log("Fetching device info...");
  const result: DeviceInfo = {
    width: 0,
    height: 0,
    screenResolution: "",
    devicePixelRatio: 0,
    screenOrientation: "",
    colorDepth: 0,
    aspectRatio: "",
    userAgent: "",
    operatingSystem: "",
    numberOfLogicalProcessors: 0,
    estimatedRAM: 0,
    battery: 0,
    charging: false,
    browser: "",
    online: false,
    vibrate: false,
    downlink: 0,
    effectiveType: "",
    rtt: 0,
    connectStart: 0,
    decodedBodySize: 0,
    domContentLoadedEventStart: 0,
    domComplete: 0,
    domainLookupStart: 0,
    fetchStart: 0,
    requestStart: 0,
    responseStart: 0,
    responseEnd: 0,
    transferSize: 0,
    currentEntryID: "",
    currentEntryKey: "",
    timeOrigin: "",
    language: "",
    latitude: 0,
    longitude: 0,
    location: null,
    error: null,
  };

  try {
    // Time of script execution
    const timeOrigin = performance.timeOrigin;
    const date = new Date(timeOrigin);
    result.timeOrigin = date.toString();
    // Screen data
    result.width = window.screen.width;
    result.height = window.screen.height;
    result.screenResolution = `${window.screen.width}x${window.screen.height}`;
    result.screenOrientation = window.screen.orientation.type;
    result.colorDepth = window.screen.colorDepth;
    const pixelRatio = window.devicePixelRatio;
    result.devicePixelRatio = Number(pixelRatio.toFixed(2));

    if (window.screen.orientation.type === "landscape-primary") {
      result.aspectRatio = calculateLandscapeRatio();
    } else {
      result.aspectRatio = calculatePortraitRatio();
    }
    // browser data
    result.browser = (
      navigator as ExtendedNavigator
    ).userAgentData.brands[2].brand;
    result.language = (navigator as ExtendedNavigator).language;
    result.online = (navigator as ExtendedNavigator).onLine;
    result.currentEntryID = (window as any).navigation.currentEntry.id;
    result.currentEntryKey = (window as any).navigation.currentEntry.key;

    //software data
    result.userAgent = (navigator as ExtendedNavigator).userAgent;
    result.operatingSystem = (
      navigator as ExtendedNavigator
    ).userAgentData.platform;

    // Hardware data
    result.numberOfLogicalProcessors = (
      navigator as ExtendedNavigator
    ).hardwareConcurrency;
    result.estimatedRAM = (navigator as ExtendedNavigator).deviceMemory;
    result.vibrate = typeof navigator.vibrate === "function";

    if ("getBattery" in navigator) {
      const battery = await (navigator as ExtendedNavigator).getBattery();
      result.battery = Math.round(battery.level * 100);
      result.charging = battery.charging;
    } else {
      console.log("Battery API is not supported");
    }

    // DOM performance data
    result.downlink = (navigator as ExtendedNavigator).connection.downlink;
    result.effectiveType = (
      navigator as ExtendedNavigator
    ).connection.effectiveType;
    result.rtt = (navigator as ExtendedNavigator).connection.rtt;

    let performanceEntries = performance.getEntriesByType("navigation");
    if (performanceEntries.length) {
      let navigationEntry = performanceEntries[0] as NavigationTimingEntry;
      result.connectStart = navigationEntry.connectStart;
      result.decodedBodySize = navigationEntry.decodedBodySize;
      result.domContentLoadedEventStart =
        navigationEntry.domContentLoadedEventStart;
      result.domComplete = navigationEntry.domComplete;
      result.domainLookupStart = navigationEntry.domainLookupStart;
      result.fetchStart = navigationEntry.fetchStart;
      result.requestStart = navigationEntry.requestStart;
      result.responseStart = navigationEntry.responseStart;
      result.responseEnd = navigationEntry.responseEnd;
      result.transferSize = navigationEntry.transferSize;
    }

    // Geolocation
    if (navigator.geolocation) {
      // Request permission to access the user's location
      const geoLocationResult = await fetchGeoLocationData();
      result.location = geoLocationResult.location;
      result.latitude = geoLocationResult.latitude;
      result.longitude = geoLocationResult.longitude;
    } else {
      console.log("Geolocation is not supported by your browser");
    }

    return result;
  } catch (error) {
    console.error("Error fetching device info:", error);
    result.error = "Error fetching device info:";
    return result;
  }
};
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ----------------------------------------------------------------------------------------------------
// Calculate the aspect ratio for landscape screens
const calculateLandscapeRatio = (): string => {
  const screenDimensions: ScreenDimensions = {
    width: window.screen.width,
    height: window.screen.height,
  };

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

  const aspectRatio = screenDimensions.width / screenDimensions.height;
  const closestLandscapeRatio: AspectRatio = commonLandscapeRatios.reduce(
    (prev, curr) =>
      Math.abs(curr.value - aspectRatio) < Math.abs(prev.value - aspectRatio)
        ? curr
        : prev
  );
  const calculatedAspectRatio = closestLandscapeRatio.name;
  return calculatedAspectRatio;
};

// Calculate the aspect ratio for landscape screens
const calculatePortraitRatio = (): string => {
  const screenDimensions: ScreenDimensions = {
    width: window.screen.width,
    height: window.screen.height,
  };

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

  const aspectRatio = screenDimensions.height / screenDimensions.width;
  const closestPortraitRatio = commonPortraitRatios.reduce((prev, curr) =>
    Math.abs(curr.value - aspectRatio) < Math.abs(prev.value - aspectRatio)
      ? curr
      : prev
  );
  const calculatedAspectRatio = closestPortraitRatio.name;
  return calculatedAspectRatio;
};
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// ----------------------------------------------------------------------------------------------------
// Fetch the users geolocation data
const fetchGeoLocationData = async (): Promise<GeoLocationResult> => {
  return new Promise<GeoLocationResult>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position: GeoPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${position.coords.latitude}&lon=${position.coords.longitude}&zoom=18&addressdetails=1`;
        try {
          const response = await fetch(locationUrl);
          const data = await response.json();
          if (data && data.address) {
            const geoLocationData: GeoLocationData = {
              house_number: data.address.house_number,
              road: data.address.road,
              suburb: data.address.suburb,
              city: data.address.city,
              country: data.address.country,
            };

            let detailedAddress = "";
            if (geoLocationData.house_number) {
              detailedAddress += geoLocationData.house_number + " ";
            }
            if (geoLocationData.road) {
              detailedAddress += geoLocationData.road + ", ";
            }
            if (geoLocationData.suburb) {
              detailedAddress += geoLocationData.suburb + ", ";
            }
            if (geoLocationData.city) {
              detailedAddress += geoLocationData.city + ", ";
            }
            if (geoLocationData.country) {
              detailedAddress += geoLocationData.country;
            }
            const location = detailedAddress.trim();
            resolve({ location, latitude, longitude });
          } else {
            console.log("Unable to determine location");
            resolve({ location: null, latitude, longitude });
          }
        } catch (error) {
          console.error("Error fetching geolocation data:", error);
          reject(new Error(`Failed to fetch geolocation data: ${error}`));
        }
      },
      (error) => {
        console.error("Location permissions denied by user: " + error);
        reject(new Error("Location permissions denied by user"));
      }
    );
  });
};
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
