"use client"
import React, { useState } from 'react';
import { LayoutDashboard, ChartArea, Leaf, Menu, X, Search, Bell, NotepadText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { key: 'dashboard', label: "Dashboard", href: "/pages/Dashboard", icon: <LayoutDashboard size={20} /> },
    { key: 'attendance', label: "Attendance", href: "/pages/Attendance", icon: <ChartArea size={20} /> },
    { key: 'leaves', label: "Leaves", href: "/pages/Leave", icon: <Leaf size={20} /> },
    { key: 'leaves-status', label: "Leaves Status", href: "/pages/leaves-status", icon: <NotepadText size={20} /> }
];

const Sidebar = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-700 text-white rounded-lg shadow-lg"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar Desktop & Mobile */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-41 bg-blue-700 text-white transition-transform duration-300 ease-in-out
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:inset-0
            `}>
                <div className="flex flex-col h-full p-4">
                    {/* Brand Logo */}
                    <div className="flex items-center justify-center py-6 mb-6">
                        <div className="bg-white text-blue-700 px-4 py-2 rounded-xl font-black text-2xl tracking-tighter shadow-sm">
                            HR<span className="opacity-70 text-blue-500">PRO</span>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.key}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`
                                        flex flex-col items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                                        ${isActive
                                            ? 'bg-white text-blue-700 font-bold shadow-md'
                                            : 'text-blue-100 hover:bg-white/10 hover:text-white'}
                                    `}
                                >
                                    <span className={`${isActive ? 'text-blue-700' : 'text-blue-200 group-hover:text-white'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom User Info (Optional) */}
                    {/* <div className="border-t border-blue-600 pt-4 mt-auto">
                        <div className="flex items-center gap-3 px-2">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">AD</div>
                            <div className="text-sm">
                                <p className="font-semibold leading-none">Admin User</p>
                                <p className="text-xs text-blue-300 mt-1">Super Admin</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;