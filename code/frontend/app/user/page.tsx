"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";


export default function HomePage() {
    // SIMULASI STATUS LOGIN
    const isLoggedIn = true;

    const protectedRoute = (path: string) =>
        isLoggedIn ? `/user${path}` : "/loginuser";


    // state untuk menu mobile
    const [open, setOpen] = useState(false);

    return (
        <main className="min-h-screen bg-white">

            {/* NAVBAR */}
            <header className="fixed top-0 w-full bg-white shadow-sm z-50">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                    {/* LOGO */}
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <span className="bg-emerald-500 text-white px-3 py-1 rounded-full">
                            CR
                        </span>
                        Clean Route Laundry
                    </div>

                    {/* MENU DESKTOP */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium">
                        <Link href={protectedRoute("/")} className="hover:text-emerald-500">
                            Home
                        </Link>
                        <Link href={protectedRoute("/order")} className="hover:text-emerald-500">
                            Order
                        </Link>
                        <Link href={protectedRoute("/tracking")} className="hover:text-emerald-500">
                            Tracking
                        </Link>
                        <Link href="/loginuser" className="hover:text-emerald-500">
                            Log Out
                        </Link>
                    </nav>

                    {/* BUTTON MOBILE */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-2xl"
                    >
                        ☰
                    </button>
                </div>

                {/* MENU MOBILE */}
                {open && (
                    <div className="md:hidden border-t bg-white">
                        <nav className="flex flex-col px-6 py-6 gap-4 text-sm font-medium">
                            <Link href={protectedRoute("/")} onClick={() => setOpen(false)}>
                                Home
                            </Link>
                            <Link href={protectedRoute("/order")} onClick={() => setOpen(false)}>
                                Order
                            </Link>
                            <Link href={protectedRoute("/tracking")} onClick={() => setOpen(false)}>
                                Tracking
                            </Link>
                            <Link href="/loginuser" onClick={() => setOpen(false)}>
                                Sign In
                            </Link>

                        </nav>
                    </div>
                )}
            </header>

            {/* HERO */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Laundry Bersih <br /> Cepat & Terpercaya
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Clean Route Laundry menyediakan layanan laundry profesional
                            dengan sistem pemesanan dan tracking online.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={protectedRoute("/order")}
                                className="bg-emerald-500 text-white px-8 py-3 rounded-full"
                            >
                                Order Sekarang
                            </Link>

                            <Link
                                href={protectedRoute("/tracking")}
                                className="border border-emerald-500 text-emerald-600 px-8 py-3 rounded-full"
                            >
                                Cek Status
                            </Link>
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl">
                        <Image
                            src="/img/laundry.jpg"
                            alt="Laundry"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>


                </div>
            </section>

            {/* FOOTER */}
            <footer className="text-center text-sm text-gray-500 py-8">
                © 2025 Clean Route Laundry
            </footer>

        </main>
    );
}
