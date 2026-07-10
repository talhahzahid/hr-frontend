import { api } from "@/lib/api";

/* ============================
 * Types
 * ============================ */

export type LeaveType = "Annual" | "Casual" | "Sick";

export type LeaveSession = "Full Day" | "First Half" | "Second Half";

export type LeaveStatus = "Pending" | "Approved" | "Rejected";

/* ============================
 * Leave Balance
 * (GET /employee/:id/balances)
 * ============================ */

export interface LeaveBalance {
  id: number;
  employeeId: number;
  leaveType: LeaveType | string;
  year: number;
  allocated: string;
  used: string;
  remaining: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetLeavesResponse {
  success: boolean;
  message: string;
  data: {
    employeeId: number;
    year: number;
    quotas: {
      Annual: number;
      Casual: number;
      Sick: number;
    };
    balances: LeaveBalance[];
  };
}

export const getLeaves = (
  id: number,
  params: { year: number }
) => {
  return api<GetLeavesResponse>({
    endpoint: `/api/v2/employee/${id}/balances`,
    params,
  });
};

/* ============================
 * Leave Request
 * (Create & List)
 * ============================ */

export interface Leave {
  id: number;
  employeeId: number;
  leaveType: LeaveType | string;
  startDate: string;
  endDate: string;
  totalDays: string;
  session: LeaveSession | string;
  reason: string;
  status: LeaveStatus | string;
  approvedBy: number | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

/* ============================
 * Apply Leave
 * ============================ */

export interface ApplyLeaveRequest {
  employeeId: number;
  leaveType: LeaveType | string;
  session: LeaveSession | string;
  reason: string;
  totalDays: number;
  startDate: string;
  endDate: string;
}

export interface ApplyLeaveResponse {
  success: boolean;
  message: string;
  data: Leave;
}

export const applyLeaves = (payload: ApplyLeaveRequest) => {
  return api<ApplyLeaveResponse>({
    endpoint: "/api/v2/create",
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
};

/* ============================
 * Leave Status List
 * ============================ */

export interface LeaveStatusListResponse {
  success: boolean;
  message: string;
  data: {
    leaveRequests: Leave[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export const getLeaveStatusList = ({ id }: { id: number }) => {
  return api<LeaveStatusListResponse>({
    endpoint: `/api/v2/employee/${id}/leaves`,
  });
};