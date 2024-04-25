import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "./auth/Provider";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import { GoogleAnalyticsScript } from "@/GoogleAnalyticsScript";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
