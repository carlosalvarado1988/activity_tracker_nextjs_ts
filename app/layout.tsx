import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "./auth/Provider";
import localFont from "next/font/local";
import NavBar from "./NavBar";
import { Theme } from "@radix-ui/themes";
import { GoogleAnalyticsScript } from "@/GoogleAnalyticsScript";

const localFontPoppins = localFont({
  src: "../public/fonts/poppins-regular-webfont.woff2",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "PM Tracking app",
  description: "Playground app for activity tracking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="winter">
      <GoogleAnalyticsScript />
      <body className={localFontPoppins.className}>
        <Theme appearance="light" accentColor="grass" radius="small">
          <AuthProvider>
            <NavBar />
            <main>{children}</main>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  );
}
