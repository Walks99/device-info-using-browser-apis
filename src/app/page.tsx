import React from "react";
import styles from "./page.module.scss";

import Script from 'next/script';

const clarityScript = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "m8kagekqmr");
`;

export default function landingPage() {
  return (
    <div className={styles.main}>
      <div className={styles.contentsContainer}>
        <h1>Welcome</h1>
        <h4>Check out one of the following:</h4>
        <ul>
          <li>
            <a href="/subtleCryptoAPI">
              /subtleCryptoAPI
            </a>
          </li>
          <li>
            <a href="/fingerprintMyDevice">
              /fingerprintMyDevice
            </a>
          </li>
        </ul>
      </div>
      <Script id="ms-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: clarityScript }} />
    </div>
  );
}
