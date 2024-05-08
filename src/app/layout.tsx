import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Script from 'next/script';

const clarityScript = `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "m8kagekqmr");
`;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "I will find you",
  description: "And I will fingerprint you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script id="ms-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: clarityScript }} />
    </html>
  );
}
