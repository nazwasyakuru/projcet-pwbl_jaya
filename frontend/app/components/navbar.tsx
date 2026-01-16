"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Navbar function
export default function Navbar() {
    // State untuk toggle dropdown admin
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("Admin");
    const router = useRouter();
// Ambil username dari token saat komponen dimount
    useEffect(() => {
        // Ambil token dari localStorage
        const token = localStorage.getItem("admin_token");
        // Decode token untuk mendapatkan username
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

               
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            {/* CONTAINER UTAMA NAVBAR */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/*LEFT: LOGO & NAMA APP*/}
                <div className="flex items-center gap-3">
                    {/*LOGO BULAT*/}
                    <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                        CR
                    </div>

                    {/*NAMA APP*/}
                    <div className="leading-tight">
                        <div className="font-semibold text-sm">
                            Clean Route Laundry
                        </div>
                        <div className="text-xs text-gray-500">
                            Admin Panel
                        </div>
                    </div>
                </div>

                {/*RIGHT: ADMIN BUTTON*/}
                <div className="relative">
                    {/* BUTTON ADMIN */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-4 py-2 rounded-md bg-teal-500 text-white text-sm flex items-center gap-2"
                    >
                        Admin
                        <span className="text-xs">▼</span>
                    </button>

                    {/*DROPDOWN MENU*/}
                    {open && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg overflow-hidden">

                            {/*EDIT PROFILE*/}
                            <button
                                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                onClick={() => {
                                    setOpen(false);
                                    alert("Edit Profile (dummy)");
                                }}
                            >
                                Edit Profile
                            </button>

                            {/*LOGOUT*/}
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onClick={() => {
                                    setOpen(false);
                                    alert("Logout (dummy)");
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
