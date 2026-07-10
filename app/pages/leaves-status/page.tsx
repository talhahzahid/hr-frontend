"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Clock3, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getLeaveStatusList, Leave } from "@/app/api/leave/leave";

type LeaveStatus = "Approved" | "Pending" | "Rejected";

const statusStyles: Record<LeaveStatus, string> = {
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

function formatDate(date: string) {
    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function normalizeStatus(status: string): LeaveStatus {
    const value = status?.toLowerCase().trim();

    if (value === "approved") return "Approved";
    if (value === "rejected") return "Rejected";

    return "Pending";
}

export default function LeaveStatusPage() {
    const [leaveRequests, setLeaveRequests] = useState<Leave[]>([]);
    const [loading, setLoading] = useState(true);



    const fetchLeaveStatus = async () => {
        try {
            setLoading(true);

            const userData = localStorage.getItem("user");
            const user = userData ? JSON.parse(userData) : null;

            if (!user?.id) {
                toast.error("Please login to view leave status");
                return;
            }

            const result = await getLeaveStatusList({
                id: user?.id,
            });

            setLeaveRequests(result?.data?.leaveRequests ?? []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load leave status");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaveStatus();
    }, []);

    const approvedCount = leaveRequests.filter(
        (item) => normalizeStatus(item.status) === "Approved"
    ).length;

    const pendingCount = leaveRequests.filter(
        (item) => normalizeStatus(item.status) === "Pending"
    ).length;

    const rejectedCount = leaveRequests.filter(
        (item) => normalizeStatus(item.status) === "Rejected"
    ).length;

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">

                <div className="mb-8 border-l-4 border-blue-600 pl-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Leave Status
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        Track employee leave requests and their current status
                    </p>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                    <div className="bg-white border rounded-xl p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                            Approved
                        </p>

                        <p className="text-2xl font-bold text-emerald-600 mt-1">
                            {approvedCount}
                        </p>
                    </div>


                    <div className="bg-white border rounded-xl p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                            Pending
                        </p>

                        <p className="text-2xl font-bold text-amber-600 mt-1">
                            {pendingCount}
                        </p>
                    </div>


                    <div className="bg-white border rounded-xl p-4 shadow-sm">
                        <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                            Rejected
                        </p>

                        <p className="text-2xl font-bold text-rose-600 mt-1">
                            {rejectedCount}
                        </p>
                    </div>

                </div>


                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

                    {loading ? (

                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            <p className="text-gray-500 text-sm">
                                Loading leave status...
                            </p>
                        </div>

                    ) : leaveRequests.length === 0 ? (

                        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                            <p className="font-medium">
                                No leave records found
                            </p>
                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-225 text-sm">

                                <thead className="bg-gray-50 border-b">

                                    <tr className="text-left text-gray-500">

                                        <th className="px-5 py-4 font-semibold">
                                            Employee
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Leave Type
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Duration
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Days
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Reason
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Applied On
                                        </th>

                                        <th className="px-5 py-4 font-semibold">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {leaveRequests.map((item) => {

                                        const status = normalizeStatus(item.status);

                                        return (

                                            <tr
                                                key={item.id}
                                                className="border-b last:border-b-0 hover:bg-gray-50/80 transition-colors"
                                            >

                                                <td className="px-5 py-4">
                                                    <p className="font-semibold text-gray-800">
                                                        Employee #{item.employeeId}
                                                    </p>
                                                </td>


                                                <td className="px-5 py-4 text-gray-600">
                                                    {item.leaveType}
                                                </td>


                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-2 text-gray-600">

                                                        <CalendarDays className="w-4 h-4 text-blue-500" />

                                                        <span>
                                                            {formatDate(item.startDate)}
                                                            {" - "}
                                                            {formatDate(item.endDate)}
                                                        </span>

                                                    </div>

                                                </td>


                                                <td className="px-5 py-4 font-medium text-gray-700">
                                                    {item.totalDays}
                                                </td>


                                                <td
                                                    className="px-5 py-4 text-gray-600 max-w-45 truncate"
                                                    title={item.reason}
                                                >
                                                    {item.reason}
                                                </td>


                                                <td className="px-5 py-4">

                                                    <div className="flex items-center gap-2 text-gray-500">

                                                        <Clock3 className="w-4 h-4" />

                                                        <span>
                                                            {formatDate(item.createdAt)}
                                                        </span>

                                                    </div>

                                                </td>


                                                <td className="px-5 py-4">

                                                    <span
                                                        className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-semibold ${statusStyles[status]}`}
                                                    >
                                                        {status}
                                                    </span>

                                                </td>


                                            </tr>

                                        );

                                    })}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>
        </div>
    );
}