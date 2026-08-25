import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { themeScript } from "@/components/theme-toggle";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Zulaiz | Outsourced customer support for ecommerce",
    template: "%s | Zulaiz",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Zulaiz | Outsourced customer support for ecommerce",
    description: site.description,
    url: site.url,
    images: [
      {
        url: "/images/og.jpg",
        width: 1730,
        height: 909,
        alt: "Parcels on a conveyor in a dimly lit fulfilment warehouse",
      },
    ],
  },
  /*
    Declared explicitly rather than via the app-directory icon convention.
    That convention appends a content hash to every icon URL and emits one
    link per file, which left three competing rel="icon" tags on the page.
    Google states that it supports one favicon per site and that the favicon
    URL must stay stable, so these are served from public/ at fixed paths and
    the ICO carries 16, 32, 48 and 96 pixel sizes in a single file.
  */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zulaiz | Outsourced customer support for ecommerce",
    description: site.description,
    images: ["/images/og.jpg"],
  },
};

/* Tells the browser to render native controls dark-first, matching the site. */
export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d12" },
    { media: "(prefers-color-scheme: light)", color: "#f1f3f5" },
  ],
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
        <StructuredData />
        <Analytics />
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
