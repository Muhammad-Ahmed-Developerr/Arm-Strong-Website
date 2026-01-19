import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Loader } from "@/components/loader"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://arm-strong.netlify.app"),

  title: {
    default: "Arm Strong Gym – Premium Fitness & Strength Training",
    template: "%s | Arm Strong Gym",
  },

  description:
    "Arm Strong Gym offers premium fitness training, modern gym equipment, expert personal trainers, strength training, yoga, and complete body transformation programs.",

  keywords: [
    "Arm Strong Gym",
    "premium gym",
    "fitness center",
    "strength training",
    "personal trainer",
    "modern gym",
    "bodybuilding",
    "yoga studio",
    "workout gym",
    "fitness training",
  ],

  authors: [{ name: "Arm Strong Gym" }],
  creator: "Arm Strong Gym",
  publisher: "Arm Strong Gym",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon1.png", type: "image/png" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },

  manifest: "/manifest.json",

  openGraph: {
    type: "website",
    url: "https://arm-strong.netlify.app",
    title: "Arm Strong Gym – Premium Fitness & Strength Training",
    description:
      "Join Arm Strong Gym for elite fitness training, expert coaches, modern equipment, and complete body transformation.",
    siteName: "Arm Strong Gym",
    images: [
      {
        url: "/gym-logo.png",
        width: 1200,
        height: 630,
        alt: "Arm Strong Gym Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Arm Strong Gym – Premium Fitness & Strength Training",
    description:
      "Elite gym training, expert personal trainers, and modern fitness programs at Arm Strong Gym.",
    images: ["/gym-logo.png"],
  },

  alternates: {
    canonical: "https://arm-strong.netlify.app",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} font-sans antialiased`}>
        <Loader />
        {children}
        <Analytics />
      </body>
    </html>
  )
}