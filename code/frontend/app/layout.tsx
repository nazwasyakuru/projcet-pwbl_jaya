import "./globals.css";

export const metadata = {
  title: "Clean Route Laundry",
  description: "Aplikasi Laundry dengan fitur Tracking",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-gray-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
