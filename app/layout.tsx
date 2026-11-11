import type { Metadata, Viewport } from "next"
import { SkipLink, ThemeScript } from "@metateic/ui"
import { strings } from "@/lib/strings"
import "./globals.css"

export const metadata: Metadata = {
  title: strings.site.title,
  description: strings.site.description,
  openGraph: {
    title: strings.site.title,
    description: strings.site.description,
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
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b111e" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme is set by ThemeScript before hydration
    <html lang="en-CA" className="h-full" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  )
}
