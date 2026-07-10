"use client"

import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, LogOut, Settings, UserCircle, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
const Navbar = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [userData, setUserData] = useState<any>(null);


    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, []);

    // const user = localStorage.getItem('user')
    // const userData = user ? JSON.parse(user) : null

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleLogoutOut = () => {
        localStorage.removeItem('user')
        router.replace('/login')
    }

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
            <div className="flex items-center gap-4">
                {/* --- HAMBURGER BUTTON (Mobile Only) --- */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                    WEB<span className="text-blue-600">HR</span>
                </h1>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                {/* Search Bar - Desktop Only */}
                <div className="relative hidden lg:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        className="bg-gray-100 border-none rounded-full py-2.5 pl-10 pr-4 w-72 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                        placeholder="Search Employee..."
                    />
                </div>

                <div className="flex items-center gap-4 border-l pl-6 border-gray-100">
                    <div className="hidden md:block text-right">
                        <span className="text-[10px] text-gray-400 block leading-none uppercase font-bold tracking-wider">Company</span>
                        <span className="text-sm font-bold text-blue-700">My Tech Solutions</span>
                    </div>

                    {/* Notification Bell */}
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors relative">
                        <Bell size={22} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="w-10 h-10 rounded-full bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md hover:scale-105 transition-all outline-none border-0 cursor-pointer"
                        >
                            <User size={20} />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-9999 py-1">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-bold text-gray-800">Employee Account</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{userData?.email || 'alex@gmail.com'}</p>
                                </div>
                                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    <UserCircle size={16} className="text-gray-400" />
                                    My Profile
                                </button>
                                <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                                    <Settings size={16} className="text-gray-400" />
                                    Settings
                                </button>
                                <div className="border-t border-gray-100 mt-1 pt-1">
                                    <button onClick={handleLogoutOut} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut size={16} />
                                        Log out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* --- MOBILE SIDEBAR / MENU (Optional overlay) --- */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-white border-b shadow-lg md:hidden z-40 p-4 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            className="bg-gray-100 border-none rounded-lg py-2 pl-10 pr-4 w-full text-sm outline-none"
                            placeholder="Search..."
                        />
                    </div>
                    <nav className="flex flex-col gap-3">
                        <a href="#" className="text-gray-700 font-medium px-2 py-1">Dashboard</a>
                        <a href="#" className="text-gray-700 font-medium px-2 py-1">Employees</a>
                        <a href="#" className="text-gray-700 font-medium px-2 py-1">Reports</a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;