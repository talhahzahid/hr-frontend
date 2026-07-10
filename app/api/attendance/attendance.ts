import { api } from "@/lib/api";

interface AttendanceParams {
  month?: number;
  year?: number;
  employeeId?: number | string;
  status?: string;
  date?: string;
}

export interface Attendance {
  id: number;
  employeeId: number;
  date: string;
  checkInTime: string | any;
  checkOutTime: string | null | any;
  status: string;
  workingHours: number;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceData {
  attendances: Attendance[];
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filters: {
    employeeId: string | null;
    status: string | null;
    month: string | null;
    year: string | null;
    date: string | null;
  };
}

export interface AttendanceRecordResponse {
  success: boolean;
  message: string;
  data: AttendanceData;
}

export const attendanceEmployeeByUserId = (params?: AttendanceParams) => {
  return api<AttendanceRecordResponse>({
    endpoint: "/api/v3/get-all",
    params,
  });
};