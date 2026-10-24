import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { strings } from "@/lib/strings"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: strings.site.title,
  description: strings.site.description,
  icons: {
    icon: [
      { url: "/favicon-dark.png" },
      { url: "/favicon-white.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/favicon-dark.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col font-[var(--font-montserrat),system-ui,sans-serif]">
        {children}
      </body>
    </html>
  )
}
