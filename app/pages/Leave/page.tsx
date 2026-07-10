"use client";

import React, { useEffect, useState } from "react";

import { getLeaves, LeaveData } from "@/app/api/leave/leave";
import LeaveCard from "@/components/LeaveCard";
import { Button } from "@/components/ui/button";
import AppSheet from "@/components/AppSheet";
import { LeaveForm } from "@/components/Form/LeaveForm";

export default function Page() {
  const [leaveData, setLeaveData] = useState<LeaveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSheet, setOpenSheet] = useState(false);

  const getLeaveLog = async () => {
    try {
      setLoading(true);

      const result = await getLeaves();

      console.log(result);

      setLeaveData(result?.responseData?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaveLog();
  }, []);

  // Dynamic UI cards from API
  const leaveStats = [
    {
      id: 1,
      title: "Annual Leave",
      used: 0,
      total: leaveData?.annualLeaves || 0,
      icon: "📅",
      bgColor: "bg-blue-600",
    },
    {
      id: 2,
      title: "Sick Leave",
      used: 0,
      total: leaveData?.sickLeaves || 0,
      icon: "🤒",
      bgColor: "bg-red-500",
    },
    {
      id: 3,
      title: "Casual Leave",
      used: 0,
      total: leaveData?.casualLeaves || 0,
      icon: "🏖️",
      bgColor: "bg-emerald-500",
    },
    {
      id: 4,
      title: "Total Leave",
      used: 0,
      total: leaveData?.casualLeaves || 0,
      icon: "🏖️",
      bgColor: "bg-green-500",
    },
  ];

  return (
    <>
      <div className="min-h-screen  p-4 md:p-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8 border-l-4 border-blue-600 pl-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Leave Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              Summary of your attendance for 2026
            </p>

            {leaveData && (
              <p className="text-sm text-gray-600 mt-2">
                Employee: {leaveData.userName}
              </p>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                <p className="text-gray-500 text-sm">
                  Loading leave data...
                </p>
              </div>
            </div>
          ) : (
            /* Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {leaveStats.map((stat) => (
                <LeaveCard
                  key={stat.id}
                  title={stat.title}
                  used={stat.used}
                  total={stat.total}
                  icon={stat.icon}
                  bgColor={stat.bgColor}
                />
              ))}
            </div>
          )}
          <div className="flex justify-end mt-6">
            <Button onClick={() => setOpenSheet(true)}>Apply Leave</Button>
          </div>
        </div>
      </div>
      <AppSheet
        open={openSheet}
        onOpenChange={setOpenSheet}
        title="Apply Leave"
      >
        <LeaveForm
          onClose={() => {
            setOpenSheet(false);
            getLeaveLog();
          }}
        />
      </AppSheet>
    </>

  );
}