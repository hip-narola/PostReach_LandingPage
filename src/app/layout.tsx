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
           {/* Add MailerLite Universal Script Here */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,e,u,f,l,n){
                    w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
                    l=d.createElement(e),l.async=1,l.src=u,
                    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);
                  })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
                  ml('account', '1014472');
                `,
              }}
            />
        </head>
        :   
        <head>
          <title>{pageTitle}</title>
           {/* Add MailerLite Universal Script Here */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,e,u,f,l,n){
                    w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);};
                    l=d.createElement(e),l.async=1,l.src=u,
                    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);
                  })(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
                  ml('account', '1014472');
                `,
              }}
            />
        </head>
      }
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${
          getMobilenav ? "overflow-y-hidden" : ""
        } overflow-x-hidden antialiased bg-white`}
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
