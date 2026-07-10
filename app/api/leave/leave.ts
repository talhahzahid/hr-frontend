// import { api } from "@/lib/api";

// export interface LeaveData {
//   id: number;
//   employeeId: number;
//   leaveType: string;
//   startDate: string;
//   endDate: string;
//   totalDays: string;
//   session: string;
//   reason: string;
//   status: string;
//   approvedBy: number | null;
//   rejectionReason: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// interface LeaveResponse {
//   code: string;
//   message: string;
//   responseData: {
//     data: LeaveData;
//   };
// }

// export const getLeaves = () => {
//   return api<LeaveResponse>({
//     endpoint: "/leaveLog/getLeaves",
//   });
// };

// // Apply Leave Payload
// export interface ApplyLeaveRequest {
//   employeeId: string | number | any;
//   leaveType: string;
//   session: string;
//   reason: string;
//   totalDays: number;
//   startDate: string;
//   endDate: string;
// }

// export const applyLeaves = (payload: ApplyLeaveRequest) => {
//   return api<LeaveResponse>({
//     endpoint: "/api/v2/create",
//     options: {
//       method: "POST",
//       body: JSON.stringify(payload),
//     },
//   });
// };

// // Leave Status List Item
// export interface LeaveRequest {
//   id: number;
//   employeeId: number;
//   leaveType: string;
//   startDate: string;
//   endDate: string;
//   totalDays: string;
//   session: string;
//   reason: string;
//   status: string;
//   approvedBy: number;
//   rejectionReason: string | null;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface LeaveStatusListResponse {
//   success: boolean;
//   message: string;
//   data: {
//     leaveRequests: LeaveRequest[];
//     totalRecords: number;
//     totalPages: number;
//     currentPage: number;
//     pageSize: number;
//   };
// }

// export const getLeaveStatusList = ({ id }: { id: number }) => {
//   return api<LeaveStatusListResponse>({
//     endpoint: `/api/v2/employee/${id}/leaves`,
//   });
// };

import { api } from "@/lib/api";

/* ============================
 * Types
 * ============================ */

export type LeaveType = "Sick" | "Casual" | "Annual";

export type LeaveSession = "Full Day" | "First Half" | "Second Half";

export type LeaveStatus = "Pending" | "Approved" | "Rejected";

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
 * Get Leaves Response
 * ============================ */

export interface GetLeavesResponse {
  success: boolean;
  message: string;
  data: Leave[];
}

export const getLeaves = () => {
  return api<GetLeavesResponse>({
    endpoint: "/leaveLog/getLeaves",
  });
};

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
