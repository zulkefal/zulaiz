import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { themeScript } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Zulaiz | Customer support for ecommerce brands",
    template: "%s | Zulaiz",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Zulaiz | Customer support for ecommerce brands",
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: "Zulaiz | Customer support for ecommerce brands",
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/*
          Inline on purpose. This has to run before first paint or dark-mode
          visitors see a flash of the light palette. next/script with
          strategy="beforeInteractive" runs too late: data-theme is still
          unset at readyState "interactive". React logs a dev-only warning
          about script tags in components; that is the accepted cost here.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
