"use client";

import React, { useEffect, useState } from "react";

import { getLeaves } from "@/app/api/leave/leave";
import LeaveCard from "@/components/LeaveCard";
import { Button } from "@/components/ui/button";
import AppSheet from "@/components/AppSheet";
import { LeaveForm } from "@/components/Form/LeaveForm";

interface LeaveBalance {
  id: number;
  employeeId: number;
  leaveType: string;
  year: number;
  allocated: string;
  used: string;
  remaining: string;
  createdAt: string;
  updatedAt: string;
}

interface LeaveResponse {
  employeeId: number;
  year: number;
  quotas: {
    Annual: number;
    Casual: number;
    Sick: number;
  };
  balances: LeaveBalance[];
}

export default function Page() {
  const [leaveData, setLeaveData] = useState<LeaveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [openSheet, setOpenSheet] = useState(false);

  const getLeaveLog = async () => {
    try {
      setLoading(true);

      const params = {
        year: 2026,
      };

      const result = await getLeaves(18, params);

      console.log(result);

      // API response:
      // {
      //   success: true,
      //   data: {
      //      employeeId,
      //      year,
      //      quotas,
      //      balances
      //   }
      // }

      setLeaveData(result?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaveLog();
  }, []);

  const leaveStats =
    leaveData?.balances.map((item) => ({
      id: item.id,
      title: `${item.leaveType} Leave`,
      used: Number(item.used),
      total: Number(item.remaining),
      icon:
        item.leaveType === "Annual"
          ? "📅"
          : item.leaveType === "Sick"
            ? "🤒"
            : "🏖️",
      bgColor:
        item.leaveType === "Annual"
          ? "bg-blue-600"
          : item.leaveType === "Sick"
            ? "bg-red-500"
            : "bg-emerald-500",
    })) || [];

  const totalUsed = leaveData?.balances.reduce(
    (sum, item) => sum + Number(item.used),
    0
  );

  const totalRemaining = leaveData?.balances.reduce(
    (sum, item) => sum + Number(item.remaining),
    0
  );

  if (leaveData) {
    leaveStats.push({
      id: 999,
      title: "Total Leave",
      used: totalUsed || 0,
      total: totalRemaining || 0,
      icon: "📊",
      bgColor: "bg-green-600",
    });
  }

  return (
    <>
      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 border-l-4 border-blue-600 pl-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Leave Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              Summary of your attendance for{" "}
              {leaveData?.year || 2026}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              Employee ID: {leaveData?.employeeId}
            </p>
          </div>

          {/* Loading */}
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
            <Button onClick={() => setOpenSheet(true)}>
              Apply Leave
            </Button>
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