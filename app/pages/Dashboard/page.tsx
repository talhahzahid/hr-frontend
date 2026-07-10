"use client";

import { useState, useEffect, useRef } from "react";
import FeedCard from "@/components/FeedCard";
import { Button } from "@/components/ui/button";
import { User, Settings, Loader2 } from "lucide-react";
import userImage from "@/public/avater.jpg";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { checkIn, checkOut } from "@/app/api/CheckInOut/dashborad";
import EventCard from "@/components/EventCard";
import { toast } from "sonner";

export default function Page() {
  // ======================================================
  // STATES
  // ======================================================

  const [loading, setLoading] = useState<boolean>(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] =
    useState(false);
  const [signInTime, setSignInTime] = useState<
    string | null
  >(null);

  const [signOutTime, setSignOutTime] = useState<
    string | null
  >(null);

  const [date, setDate] = React.useState<
    Date | undefined
  >(new Date());

  const [mounted, setMounted] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(
    null
  );

  // ======================================================
  // USER DATA
  // ======================================================

  const user =
    typeof window !== "undefined"
      ? localStorage.getItem("user")
      : null;

  const userData = user ? JSON.parse(user) : null;

  // ======================================================
  // MOUNT
  // ======================================================

  useEffect(() => {
    setMounted(true);
  }, []);

  // ======================================================
  // RESTORE TIMER AFTER REFRESH / ROUTE CHANGE
  // ======================================================

  useEffect(() => {
    const savedTimestamp =
      localStorage.getItem("signInTimestamp");

    if (savedTimestamp) {
      setIsTimerRunning(true);

      const loginDate = new Date(savedTimestamp);

      setSignInTime(
        loginDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }
  }, []);

  // ======================================================
  // TIMER
  // ======================================================

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        const savedTimestamp =
          localStorage.getItem("signInTimestamp");

        if (savedTimestamp) {
          const startTime =
            new Date(savedTimestamp).getTime();

          const currentTime = new Date().getTime();

          const differenceInSeconds = Math.floor(
            (currentTime - startTime) / 1000
          );

          setElapsedSeconds(differenceInSeconds);
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTimerRunning]);

  // ======================================================
  // FORMAT TIMER
  // ======================================================

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);

    const mins = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const secs = totalSeconds % 60;

    return `${hrs
      .toString()
      .padStart(2, "0")}:${mins
        .toString()
        .padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`;
  };

  // Helper: local date-time ko "YYYY-MM-DDTHH:mm:ss" format mein convert karta hai
const formatLocalDateTime = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

  // ======================================================
  // SIGN IN
  // ======================================================

  const employeeId = userData?.id

  const handleSignIn = async () => {
    setLoading(true);

    const now = new Date();

    const body = {
      employeeId: userData?.id,
    };

    try {
      const result = await checkIn(body);
      if (result?.success === true) {
        // ✅ API success - ab timestamp save karo aur timer start karo
        localStorage.setItem("signInTimestamp", now.toISOString());
        setIsTimerRunning(true);
        setSignOutTime(null);
        setSignInTime(
          now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })
        );
        toast.success(result?.message || "Signed in successfully");
      } else {
        // ❌ API ne success false diya - timer start NAHI hoga
        toast.error(result?.message || "Sign in failed");
      }
    } catch (error: any) {
      // ❌ API error aaya - timer start NAHI hoga
      console.log("Error:", error.status, error.message, error.data);
      toast.error(error?.message || "Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

const handleSignOut = async () => {
  setLoading(true);

  const now = new Date();

  const checkOutTime = formatLocalDateTime(now); // "2026-07-08T13:19:00"

  const body = {
    employeeId,
  };

  try {
    const result = await checkOut(body);
    console.log(result);

    if (result?.success === true) {
      setSignOutTime(checkOutTime);
      setIsTimerRunning(false);

      const payload = {
        userId: userData?.id,
        name: userData?.name,
        signInTime,
        signOutTime: checkOutTime,
        totalWorkedSeconds: elapsedSeconds,
        totalWorkedTime: formatTimer(elapsedSeconds),
        date: formatLocalDateTime(now),
      };

      console.log("ATTENDANCE PAYLOAD:", payload);

      localStorage.removeItem("signInTimestamp");
      setElapsedSeconds(0);
      setSignInTime(null);

      toast.success(result?.message || "Signed out successfully");
    } else {
      toast.error(result?.message || "Sign out failed");
    }
  } catch (error: any) {
    console.log("Error:", error.status, error.message, error.data);
    toast.error(error?.message || "Something went wrong, please try again");
  } finally {
    setLoading(false);
  }
};

  // const handleSignIn = async () => {
  //   setLoading(true)

  //   const now = new Date();

  //   // SAVE REAL TIMESTAMP
  //   localStorage.setItem(
  //     "signInTimestamp",
  //     now.toISOString()
  //   );


  //   const checkInTime = now.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     // hour12: true,
  //   })
  //   console.log(checkInTime, 'employee sign in time')
  //   const today = new Date();
  //   const dayOfMonth = today.getDate();
  //   console.log(dayOfMonth); // e.g., 15
  //   let body = {
  //     // checkInTime,
  //     // dayOfMonth,
  //     // employeeId : userData?.id
  //     employeeId: userData?.id
  //   }
  //   console.log(body)
  //   const employeeId = userData?.id
  //   // setLoading(true)
  //   // return
  //   try {
  //     const result = await checkIn(body);
  //     console.log(result)
  //     if (result?.success === true) {
  //       console.log('f')
  //     } else {
  //       toast.error(result?.message)
  //     }
  //     // window.location.href = "/pages/Dashboard";
  //   } catch (error: any) {
  //     console.log("Error:", error.status, error.message, error.data);
  //   } finally {
  //     setLoading(false)
  //   }






  //   setIsTimerRunning(true);
  //   setSignOutTime(null);
  //   setSignInTime(
  //     now.toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       second: "2-digit",
  //       hour12: true,
  //     })
  //   );

  //   // console.log(signInTime, 'current time')
  // };

  // ======================================================
  // SIGN OUT
  // ======================================================

  // const handleSignOut = async () => {
  //   setLoading(true)
  //   const now = new Date();

  //   const logoutTime = now.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     // hour12: true,
  //   });

  //   let checkOutTime = now.toLocaleTimeString([], {
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //     // hour12: true,
  //   });

  //   let body = {
  //     checkOutTime
  //   }

  //   try {
  //     const result = await checkOut(employeeId ,body);
  //     console.log(result)
  //     // window.location.href = "/pages/Dashboard";
  //   } catch (error: any) {
  //     console.log("Error:", error.status, error.message, error.data);
  //   } finally {
  //     setLoading(false)
  //   }

  //   setSignOutTime(logoutTime);

  //   setIsTimerRunning(false);

  //   // ======================================================
  //   // FINAL PAYLOAD
  //   // ======================================================

  //   const payload = {
  //     userId: userData?.id,
  //     name: userData?.name,

  //     signInTime,

  //     signOutTime: logoutTime,

  //     totalWorkedSeconds: elapsedSeconds,

  //     totalWorkedTime: formatTimer(
  //       elapsedSeconds
  //     ),

  //     date: new Date().toISOString(),
  //   };

  //   console.log(
  //     "ATTENDANCE PAYLOAD:",
  //     payload
  //   );

  //   // ======================================================
  //   // API CALL
  //   // ======================================================

  //   // await axios.post("/api/attendance", payload)

  //   // ======================================================
  //   // CLEAR STORAGE
  //   // ======================================================

  //   localStorage.removeItem("signInTimestamp");

  //   // ======================================================
  //   // RESET
  //   // ======================================================

  //   setElapsedSeconds(0);

  //   setSignInTime(null);
  // };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div className="p-4 md:p-6">
        <div
          className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden bg-zinc-900 text-white p-6 md:p-10 flex flex-col md:flex-row items-center md:justify-between gap-8 md:gap-4 shadow-xl"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070")',

            backgroundSize: "cover",

            backgroundPosition: "center",
          }}
        >
          {/* ====================================================== */}
          {/* LEFT SIDE */}
          {/* ====================================================== */}

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <div className="h-28 w-28 md:h-32 md:w-32 rounded-full border-4 border-white/20 bg-white/10 overflow-hidden shadow-2xl shrink-0">
              <Image
                src={userImage}
                alt="Profile"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
                {userData?.name || "Umar Shahid"}
              </h2>

              <div className="bg-blue-600 text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
                {userData?.designation || ' Engineer'}
              </div>

              <div className="flex flex-col items-center md:items-start gap-2 mt-2 text-sm text-gray-300">
                <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                  <User size={14} />
                  My Info
                </span>

                <span className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors">
                  <Settings size={14} />
                  Account Settings
                </span>
              </div>
            </div>
          </div>

          {/* ====================================================== */}
          {/* RIGHT SIDE */}
          {/* ====================================================== */}

          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto border-t md:border-none pt-6 md:pt-0 border-white/10">
            {/* TIMER */}

            <div className="text-4xl md:text-6xl font-light tabular-nums tracking-tighter">
              {formatTimer(elapsedSeconds)}
            </div>

            {/* STATUS */}

            <div className="text-xs md:text-sm text-gray-400 font-medium space-y-1 text-center md:text-right">
              {signInTime && (
                <p>
                  Signed In:{" "}
                  <span className="text-green-400">
                    {signInTime}
                  </span>
                </p>
              )}

              {signOutTime && (
                <p>
                  Signed Out:{" "}
                  <span className="text-red-400">
                    {signOutTime}
                  </span>
                </p>
              )}

              {!isTimerRunning &&
                !signInTime && (
                  <p>Status: Offline</p>
                )}
            </div>

            {/* BUTTON */}

            {!isTimerRunning ? (
              <Button
                onClick={handleSignIn}
                className="w-full md:w-48 px-10 text-white transition-all font-semibold h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Sign In"}
              </Button>
            ) : (
              <Button
                onClick={handleSignOut}
                className="w-full md:w-48 px-10 text-white transition-all font-semibold h-12 rounded-xl bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/30 cursor-pointer"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Sign Out"}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================================== */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-4 md:p-6 items-start">
        {/* LEFT COLUMN */}

        <div className="lg:col-span-2 space-y-6">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>

        {/* RIGHT COLUMN */}

        <div className="flex flex-col gap-10">
          <div>
            <EventCard />
          </div>
          <div>
            {mounted && (
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}