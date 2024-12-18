import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resort Reservation System",
  description: "A simple reservation management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-green-600 text-white py-4 text-center">
          <h1 className="text-2xl font-bold">Resort Reservation System</h1>
        </header>
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p>© 2024 Resort Management. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
