"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    { name: "Home", href: "/user" },
    { name: "Order", href: "/user/order" },
    { name: "Tracking", href: "/user/tracking" },
    { name: "Log Out", href: "/Lof Out" },
  ];

  return (
    <div>
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="font-bold text-teal-600 text-lg">6R Laundry</h1>

        <ul className="flex gap-6 text-sm">
          {menu.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`${
                  pathname === item.href
                    ? "text-teal-600 font-semibold"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* PAGE CONTENT */}
      <main>{children}</main>
    </div>
  );
}
