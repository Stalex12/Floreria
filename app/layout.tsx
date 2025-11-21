import type React from "react"
import type { Metadata } from "next"
import { CartProvider } from "@/contexts/cart-context"
import { AdminProvider } from "@/contexts/admin-context"
import "./globals.css"

export const metadata: Metadata = {
  title: "Florería - Regalos que Perduran",
  description: "Regalos florales que perduran en el tiempo. Arreglos personalizados para cada ocasión.",
  icons: {
    icon: "/WhatsApp Image 2025-11-20 at 2.01.02 PM.jpeg",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/WhatsApp Image 2025-11-20 at 2.01.02 PM.jpeg" sizes="any" />
      </head>
      <body style={{ backgroundColor: "#faf9f7", color: "#1c1a38" }} className="antialiased">
        <AdminProvider>
          <CartProvider>{children}</CartProvider>
        </AdminProvider>
      </body>
    </html>
  )
}
