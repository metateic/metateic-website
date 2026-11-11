import type { Metadata, Viewport } from "next"
import { Analytics, SkipLink, ThemeScript } from "@metateic/ui"
import { strings } from "@/lib/strings"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://metateic.com"),
  alternates: { canonical: "/" },
  title: strings.site.title,
  description: strings.site.description,
  openGraph: {
    title: strings.site.title,
    description: strings.site.description,
    url: "/",
    siteName: strings.site.name,
    locale: "en_CA",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon-dark.png" },
      { url: "/favicon-white.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/favicon-dark.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#050815" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set by ThemeScript before hydration
    <html lang="en-CA" className="h-full" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <Analytics
          src={process.env.NEXT_PUBLIC_ANALYTICS_SRC}
          domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
          websiteId={process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  )
}
