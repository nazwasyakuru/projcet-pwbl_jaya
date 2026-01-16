"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
    /*SIMULASI STATUS LOGIN*/
    const isLoggedIn = false;

    /*Jika sudah login → langsung ke halaman user,Jika belum login → ke halaman login*/
    const loginRoute = isLoggedIn ? "/user" : "/loginuser";

    return (
        <main className="min-h-screen flex flex-col bg-linear-to-br from-teal-50 to-teal-100">

            {/*CONTENT*/}
            <div className="flex-1 flex items-center justify-center px-4">

                {/* CARD */}
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

                    {/*EFT SIDE*/}
                    <div className="p-8 md:p-12 flex flex-col justify-center">

                        {/* LOGO */}
                        <div className="flex items-center gap-2 mb-10">
                            <span className="text-3xl font-bold text-teal-600">CR</span>
                            <span className="font-semibold text-lg">Laundry</span>
                        </div>

                        {/* TITLE */}
                        <h1 className="text-2xl md:text-3xl font-bold mb-6">
                            Selamat Datang 👋
                        </h1>

                        {/* DESCRIPTION */}
                        <p className="text-gray-600 mb-10 leading-relaxed">
                            Sistem manajemen laundry modern untuk memudahkan pemesanan,
                            pelacakan, dan pengelolaan laundry secara digital.
                        </p>

                        {/* LOGIN BUTTON */}
                        <Link
                            href={loginRoute}
                            className="w-full md:w-fit text-center bg-linear-to-r from-teal-500 to-teal-600 text-white px-10 py-3 rounded-full font-semibold hover:opacity-90 transition"
                        >
                            LOGIN
                        </Link>
                    </div>

                    {/*RIGHT SIDE*/}
                    <div className="relative hidden md:flex items-center justify-center bg-linear-to-br from-teal-500 to-teal-700">

                        {/* ILLUSTRATION */}
                        <Image
                            src="/img/laundry2.jpg"
                            alt="Laundry Illustration"
                            width={250}
                            height={350}
                            priority
                        />

                        {/* ICONS */}
                        <div className="absolute right-10 bottom-12 flex flex-col gap-4">
                            <div className="bg-white p-3 rounded-full shadow">👕</div>
                            <div className="bg-white p-3 rounded-full shadow">👖</div>
                            <div className="bg-white p-3 rounded-full shadow">👚</div>
                        </div>
                    </div>

                </div>
            </div>

            {/*FOOTER*/}
            <footer className="text-center text-sm text-gray-500 py-6">
                © 2025 Clean Route Laundry
            </footer>

        </main>
    );
}
