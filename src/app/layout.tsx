'use client';
import localFont from "next/font/local";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { DataProvider, DataContext } from "./context/shareData";
import Sidenav from "./layout/mobile-sidenav";
import { LoadingProvider } from "./context/LoadingContext";
import { usePathname } from "next/navigation";
import { routeTitleMapping } from "./navigation-list/match-route";
import GlobalLoader from "./common/Loader/common-loader";
import { useContext } from "react";

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

const getDynamicTitle = (pathname: string): string => {
  if (pathname.startsWith("/blog-detail")) {
    return "Blog Details";
  }
  return "Page Not Found";
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DataProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </DataProvider>
  );
}

function RootLayoutContent({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const staticTitle = routeTitleMapping[pathname];
  const dynamicTitle = getDynamicTitle(pathname);
  const pageTitle = staticTitle || dynamicTitle || "Page Not Found";

  const { getMobilenav } = useContext(DataContext) || { getMobilenav: false };

  return (
    <html lang="en">
      <head>
        <title>{pageTitle}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${
          getMobilenav ? "overflow-y-hidden" : ""
        } overflow-x-hidden antialiased`}
      >
        <NextUIProvider className="max-[1280px]:max-w-[100vw] max-[1280px]:overflow-x-hidden">
          <LoadingProvider>
            <GlobalLoader />
            <Header />
            <Sidenav />
            {children}
            <Footer />
          </LoadingProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
