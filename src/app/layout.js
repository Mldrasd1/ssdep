
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./components/header.css"
import "./components/orders.css"
import "./components/tracking.css"
import "./components/homepage.css"
import "./components/checkout.css"
import "./components/checkout-header.css"
import Link from "next/link";
import Header from "./components/header";
import { CartContextProvider } from "./components/CartContext";
import { CartProvider } from "./components/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mouloud App",
  
};

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
        <Header />
        {children}
        </CartProvider>
        
      </body>
    </html>
  );
}
