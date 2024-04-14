// src/app/page.tsx
"use client";

import React from "react";
import dynamic from "next/dynamic";
import HomePage from './HomePage';

// ---------------------------------------------------------------------------------------
// Dynamically import the HomeComponent with Server Side Rendering disabled
const Home = dynamic(() => Promise.resolve(HomePage), {
  ssr: false, // This ensures the component is only loaded on the client side
});

export default function Page() {
  return (
    <div>
      <Home />
    </div>
  );
}
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
