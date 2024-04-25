import Script from "next/script";
import React from "react";

export const GoogleAnalyticsScript = () => (
  <>
    <Script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-HHC0NZSLNK"
    />
    <Script id="google-analytics-tag" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HHC0NZSLNK');`}
    </Script>
  </>
);
