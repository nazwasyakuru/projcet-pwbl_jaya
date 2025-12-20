"use client";

import "./globals.css";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <div className="flex min-h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar />

          {/* Konten kanan */}
          <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
