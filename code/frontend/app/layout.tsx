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
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Navbar />
            <main style={{ padding: "20px" }}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
