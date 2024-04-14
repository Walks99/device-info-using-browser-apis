// --------------------------------------------------------
export interface DeviceInfo {
    width: number;
    height: number;
    screenResolution: string;
    devicePixelRatio: number;
    screenOrientation: string;
    colorDepth: number;
    aspectRatio: string;
    userAgent: string;
    operatingSystem: string;
    numberOfLogicalProcessors: number;
    estimatedRAM: number;
    battery: number;
    charging: boolean;
    browser: string;
    online: boolean;
    vibrate: boolean;
    downlink: number;
    effectiveType: number;
    rtt: number;
    connectStart: number;
    decodedBodySize: number;
    domContentLoadedEventStart: number;
    domComplete: number;
    domainLookupStart: number;
    fetchStart: number;
    requestStart: number;
    responseStart: number;
    responseEnd: number;
    transferSize: number;
    currentEntryID: string;
    currentEntryKey: string;
    timeOrigin: string;
    language: string;
    latitude: number;
    longitude: number;
    location: string | null;
    error: string | null;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// --------------------------------------------------------
type GetBatteryFunction = () => Promise<BatteryInfo>;
interface BatteryInfo {
 level: number; // The battery charge level, from 0.0 to 1.0.
 charging: boolean; // Indicates whether the device is currently charging.
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// --------------------------------------------------------
  export interface ExtendedNavigator extends Navigator {
    userAgentData: {
      platform: string;
      brands: Array<{ brand: string }>;
    };
    hardwareConcurrency: number;
    deviceMemory: number;
    userAgent: string;
    language: string;
    online: boolean;
    connection: {
      downlink: number;
      effectiveType: number;
      rtt: number;
    }
    getBattery: GetBatteryFunction;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --------------------------------------------------------
  export interface NavigationTimingEntry extends PerformanceEntry {
    connectStart: number;
    decodedBodySize: number;
    domContentLoadedEventStart: number;
    domComplete: number;
    domainLookupStart: number;
    fetchStart: number;
    requestStart: number;
    responseStart: number;
    responseEnd: number;
    transferSize: number;
   }
   // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //  interface CurrentEntry {
  //   id: string;
  //   key: string;
  //  }
   
  //  interface Navigation {
  //   currentEntry: CurrentEntry;
  //  }
   
  //  export interface ExtendedWindow extends Window {
  //   navigation: Navigation;
  //  }
   
  // --------------------------------------------------------
  export interface AspectRatio {
    name: string;
    value: number;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --------------------------------------------------------
  export interface ScreenDimensions {
    width: number;
    height: number;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --------------------------------------------------------
  export interface GeoLocationData {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    country?: string;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --------------------------------------------------------
  export interface GeoPosition {
    coords: {
      latitude: number;
      longitude: number;
    };
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // --------------------------------------------------------
  export interface GeoLocationResult {
    location: string | null;
    latitude: number;
    longitude: number;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// --------------------------------------------------------
  export interface StrapiInfo extends ScreenDimensions {
    ratio: string;
  }
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^