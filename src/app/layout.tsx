import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Public_Sans } from "@next/font/google";
import StoreProvider from "@/app/store/StoreProvider";
import QueryProvider from "./components/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ClerkProvider } from "@clerk/nextjs";
import { LoaderProvider } from "./components/LoaderProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const publicSans = Public_Sans({
  variable: "--font-publicsans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

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
            href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Rubik:ital@0;1&display=swap"
            rel="stylesheet"></link>
        </head>

        <body className={`${publicSans.className} ${geistSans.className}`}>
          <StoreProvider>
            {" "}
            <LoaderProvider>{children} </LoaderProvider>
          </StoreProvider>
        </body>
      </html>
    </QueryProvider>
  );
}
