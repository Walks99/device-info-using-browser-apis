// src/components/WebBrowserAPIsIntroduction.tsx
"use client";
import React from "react";
import styles from "./WebBrowserAPIsIntroduction.styles.module.scss";

export default function WebBrowserAPIsIntroduction() {
  const currentPath = window.location.pathname;
  const landingPage = currentPath === "/";
  const subtleCryptoAPIpage = currentPath === "/subtleCryptoAPI";
  const hideInstructions = currentPath === "/";
  const showSubtleCryptoTitle = currentPath === "/subtleCyptoAPI";

  return (
    <>
      {landingPage ? (
        <div className={styles.main}>
          <div className={styles.title}>
            <p>Web browser APIs</p>
          </div>
          <div className={styles.introductionBody}>
            <p>
              Web Browser APIs play a crucial role in the digital landscape,
              offering a wide range of functionalities that enhance the user
              experience on websites. Among these APIs, there are several that
              are particularly interesting from a privacy and security
              perspective, especially in the context of fingerprinting.
              Fingerprinting is a technique used to uniquely identify and track
              users across the web by collecting information about their devices
              and browsing habits. This information can include details about
              the user&apos;s browser, operating system, screen resolution, and
              even the specific fonts installed on their computer. By analyzing
              these unique characteristics, websites can create a detailed
              profile of a user, which can then be used for targeted
              advertising, personalized content, or even for tracking users
              across different websites.
              <br />
              <br />
              The Web Browser APIs involved in fingerprinting include, but are
              not limited to, the Navigator API, which provides information
              about the browser and the device, the Screen API, which offers
              details about the screen&apos;s size and orientation, and the
              Battery API, which can reveal the device&apos;s battery status.
              Additionally, the use of the Canvas API allows websites to
              generate images or patterns that can be analyzed to gather more
              information about the user&apos;s device. These APIs, when
              combined, can create a comprehensive fingerprint of a user&apos;s
              device, making it increasingly difficult for users to remain
              anonymous online.
              <br />
              <br />
              Understanding the role of these APIs in fingerprinting is
              essential for users to be aware of the potential privacy
              implications of their online activities. It&apos;s also crucial
              for developers and website owners to consider the ethical and
              legal implications of using these APIs, especially when it comes
              to collecting and processing personal data. As users become more
              aware of these issues, the demand for privacy-enhancing
              technologies and practices will continue to grow, pushing the web
              forward towards a more secure and user-centric future.
              <br />
              <br />
              To explore how Browser APIs and fingerprinting work in practice,
              feel free to click the button below. Rest assured, your data will
              not be collected or stored; this is simply a demonstration of the
              capabilities and techniques involved.
            </p>
          </div>
        </div>
      ) : null}
      {subtleCryptoAPIpage ? (
        <div className={styles.main}>
          <div className={styles.title}>
            <p>The Digital Fingerprint</p>
            <p>Unveiling Privacy with Web Browser APIs</p>
          </div>
          <div className={styles.introductionBody}>
            <p>
              In the digital age, Web Browser APIs have become indispensable
              tools, offering a wide array of functionalities that significantly
              enhance the user experience on websites. Among these APIs, a few
              stand out for their potential in fingerprinting, a technique that
              uniquely identifies and tracks users across the web by collecting
              detailed information about their devices and browsing habits. This
              information can range from the user&apos;s browser and operating
              system to their screen resolution, device pixel ratio, and even
              the specific fonts installed on their computer. By analyzing these
              unique characteristics, websites can create a detailed profile of
              a user, which can then be used for targeted advertising,
              personalized content, or even for tracking users across different
              websites.
              <br />
              <br />
              The choice of values for fingerprinting is crucial, as it
              determines the uniqueness and effectiveness of the fingerprint.
              For this website, we have selected a set of values that are highly
              variable and provide the most unique fingerprint for the user.
              <br />
              <br />
              By carefully selecting these values, we aim to create a
              comprehensive fingerprint that is highly variable and unique to
              each user. This approach not only enhances the accuracy of user
              identification but also ensures that the fingerprinting process is
              as effective as possible.
              <br />
              <br />
              Understanding the role of these APIs in fingerprinting is
              essential for users to be aware of the potential privacy
              implications of their online activities. It&apos;s also crucial
              for developers and website owners to consider the ethical and
              legal implications of using these APIs, especially when it comes
              to collecting and processing personal data. As users become more
              aware of these issues, the demand for privacy-enhancing
              technologies and practices will continue to grow, pushing the web
              forward towards a more secure and user-centric future. way.
              <br />
              <br />
              This website demonstrates the use of the Subtle Crypto API to
              generate a unique hash value, which is then stored in a persistent
              cookie. This cookie is designed to survive browser history and
              cache clearing, showcasing the resilience of this method for
              tracking users across sessions. By combining the power of the
              Subtle Crypto API with persistent storage, we can explore the
              capabilities and implications of fingerprinting in a more tangible
              way.
            </p>

            <div className={styles.instructionsContainer}>
              <h3>
                To see the power of these API&apos;s in action, follow the
                instructions below:
              </h3>
              <p>
                <strong>1.</strong> Click the &apos;Generate data&apos; button
              </p>
              <p>
                <strong>2.</strong> Click the &apos;Generate fingerprint&apos;
                button
              </p>
              <p>
                <strong>3.</strong> click the &apos;Generate cookie&apos; button
              </p>
              <p>
                <strong>4.</strong> Open Chrome dev tools: Right click, select
                &apos;inspect&apos;
              </p>
              <p>
                <strong>5.</strong> Select &apos;Application&apos; in the task
                bar
              </p>
              <p>
                <strong>6.</strong> From the left navigation bar, select
                &apos;Cookies&apos;
              </p>
              <p>
                <strong>7.</strong> Under &apos;Cookies&apos;, select the URL
                listed
              </p>
              <p>
                <strong>8.</strong> If your cookie is not listed, click the
                circular arrow to refresh the table
              </p>
              <div className={styles.instructionsNote}>
                <p>
                  <strong>NOTE:</strong>
                </p>
                <p>
                  Your cookie will expire in two minutes. Your data will not be
                  collected or stored; this is simply a demonstration of the
                  capabilities and techniques involved.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
