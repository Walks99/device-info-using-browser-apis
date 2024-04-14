"use client";
import React from 'react';
import dynamic from "next/dynamic";
import DisplayData from './DisplayData';

// Dynamically import the HomeComponent with Server Side Rendering disabled
const Data = dynamic(() => Promise.resolve(DisplayData), {
  ssr: false, // This ensures the component is only loaded on the client side
});

export default function DeviceInfoData() {

    
  return (
    <div>
      <Data />
    </div>
  )
}