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
import { useContext} from "react";
import Script from "next/script";

declare global {
  interface Window {
    ml?: (action: string, formId: string, show?: boolean) => void;
  }
}

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
  const context = useContext(DataContext);
  const metadata = context?.metadata;
  const { getMobilenav } = useContext(DataContext) || { getMobilenav: false };
 


  return (
    <html lang="en">
      {metadata ?
        <head>
            <title>{metadata.seo_title}</title>
            <meta name="description" content={metadata?.seo_description || "Default description"} />
            <meta property="og:title" content={metadata?.og_title || "Default OG Title"} />
            <meta property="og:description" content={metadata?.og_description || "Default OG Description"} />
            <meta property="og:url" content={metadata?.og_url || ""} />
            <meta property="og:type" content={metadata?.og_type || ""} />
            <meta property="og:site_name" content={metadata?.og_site_name || ""} />
            {/* <meta property="structured data" content={metadata?.structured_data || ""} /> */}
            <meta property="robots" content={metadata?.robots || ""} />
            <meta property="focus keywords" content={metadata?.focus_keywords || ""} />

            {/* Google Analytics */}
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-QQSS4GX170" />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-QQSS4GX170');
                `,
              }}
            />

            {metadata.structured_data && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(
                  typeof metadata.structured_data === "string"
                    ? JSON.parse(metadata.structured_data) // Ensure it's parsed as JSON
                    : metadata.structured_data,
                  null,
                  2
                ),
              }}
            />
          )}
            {/* MailerLite Universal Script */}
            <Script
              strategy="afterInteractive"
              src="https://assets.mailerlite.com/js/universal.js"
              onLoad={() => {
                if (typeof window !== "undefined" && window.ml) {
                  window.ml("account", "1014472");
                }
              }}
            />
            <Script
              strategy="afterInteractive"
              src="https://assets.mailerlite.com/jsonp/1014472/forms/n1oinc?callback=ml.fn.addOnClickForm"
              async
            />
        </head>
        :   
        <head>
          <title>{pageTitle}</title>
          <link href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />


          {/* Google Analytics */}
          <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-QQSS4GX170" />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-QQSS4GX170');
              `,
            }}
          />

           {/* MailerLite Universal Script */}
           <Script
              strategy="afterInteractive"
              src="https://assets.mailerlite.com/js/universal.js"
              onLoad={() => {
                if (typeof window !== "undefined" && window.ml) {
                  window.ml("account", "1014472");
                }
              }}
            />
            <Script
              strategy="afterInteractive"
              src="https://assets.mailerlite.com/jsonp/1014472/forms/n1oinc?callback=ml.fn.addOnClickForm"
              async
            />
        </head>
      }
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${
          getMobilenav ? "overflow-y-hidden" : ""
        } overflow-x-hidden antialiased bg-white`}
      >

        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "pftbt6yt4s");
            `,
          }}
        />


       
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
