"use client";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import { Public_Sans } from "next/font/google";
import StoreProvider from "@/app/store/StoreProvider";
import QueryProvider from "./components/QueryProvider";
import { LoaderProvider } from "./components/LoaderProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-publicsans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"></link>
        </head>

        <body className={`${publicSans.className}`}>
          <StoreProvider>
            <LoaderProvider>{children} </LoaderProvider>
          </StoreProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
