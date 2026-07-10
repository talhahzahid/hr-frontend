// "use client";

// import { useState, useEffect, useRef } from "react";
// import FeedCard from "@/components/FeedCard";
// import { Button } from "@/components/ui/button";
// import { User, Settings } from "lucide-react";
// import userImage from "@/public/avater.jpg";
// import Image from "next/image";
// import { Calendar } from "@/components/ui/calendar";
// import React from "react";

// export default function Page() {
//   const [seconds, setSeconds] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [signInTime, setSignInTime] = useState<string | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const [date, setDate] = React.useState<Date | undefined>(new Date());
//   const [mounted, setMounted] = useState(false);

//   const user = localStorage.getItem('user')
//   const userData = user ? JSON.parse(user) : null

//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   // Timer Logic
//   useEffect(() => {
//     if (isTimerRunning) {
//       timerRef.current = setInterval(() => {
//         setSeconds((prev) => prev + 1);
//       }, 1000);
//     } else {
//       if (timerRef.current) clearInterval(timerRef.current);
//     }

//     return () => {
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, [isTimerRunning]);

//   const handleAuthAction = () => {
//     if (!isTimerRunning) {
//       setIsTimerRunning(true);
//       const now = new Date();
//       setSignInTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
//     } else {
//       setIsTimerRunning(false);
//       setSeconds(0);
//       setSignInTime(null);
//     }
//   };

//   const formatTimer = (totalSeconds: number) => {
//     const hrs = Math.floor(totalSeconds / 3600);
//     const mins = Math.floor((totalSeconds % 3600) / 60);
//     const secs = totalSeconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Header Section */}
//       <div className="p-4 md:p-6">
//         <div
//           className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden bg-zinc-900 text-white p-6 md:p-10 flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-4 shadow-xl"
//           style={{
//             backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070")',
//             backgroundSize: 'cover',
//             backgroundPosition: 'center'
//           }}
//         >
//           {/* Left Side: Avatar & Details */}
//           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
//             <div className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white/20 bg-white/10 overflow-hidden shadow-2xl shrink-0">
//               <Image
//                 src={userImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//                 width={128}
//                 height={128}
//               />
//             </div>

//             <div className="space-y-2">
//               <h2 className="text-2xl md:text-3xl font-medium tracking-tight">{userData?.name}</h2>
//               <div className="bg-blue-600 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
//                 Software Engineer
//               </div>
//               <div className="flex flex-col items-center md:items-start gap-2 mt-2 text-sm text-gray-300">
//                 <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
//                   <User size={14} /> My Info
//                 </span>
//                 <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
//                   <Settings size={14} /> Account Settings
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Right Side: Timer & Action */}
//           <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto border-t md:border-none pt-6 md:pt-0 border-white/10">
//             <div className="text-4xl md:text-6xl font-light tabular-nums tracking-tighter">
//               {formatTimer(seconds)}
//             </div>
//             <div className="text-xs md:text-sm text-gray-400 font-medium">
//               {signInTime ? `Signed In at ${signInTime}` : "Status: Offline"}
//             </div>
//             <Button
//               onClick={handleAuthAction}
//               className={`w-full md:w-48 px-10 text-white transition-all font-semibold h-12 rounded-xl ${isTimerRunning
//                 ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30"
//                 : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30"
//                 }`}
//             >
//               {isTimerRunning ? "Sign Out" : "Sign In"}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Grid */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-6 items-start">

//         {/* Left Column: Feed */}
//         <div className="lg:col-span-2 space-y-6">
//           <FeedCard />
//           <FeedCard />
//           <FeedCard />
//           <FeedCard />
//           <FeedCard />
//         </div>

//         {/* Right Column: Sticky Sidebar */}
//         {/* Right Column: Sticky Sidebar */}
//         <aside className="hidden lg:block sticky top-6">
//           <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 overflow-hidden">

//             <h2 className="text-xl font-bold text-gray-900 mb-6 px-1">
//               Calendar
//             </h2>

//             <div className="space-y-6 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">

//               <div className="bg-slate-50 rounded-2xl p-2 border border-gray-100">

//                 {mounted && (
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     className="w-full"
//                   />
//                 )}

//               </div>
//             </div>
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// }

// app/page.tsx
import EventCard from "@/components/EventCard";
import DashboardPage from "./pages/Dashboard/page";

export default function Home() {
  return (
    <>
      <EventCard />
    </>
  );
}