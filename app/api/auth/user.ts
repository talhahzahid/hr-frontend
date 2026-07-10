// api/auth.ts
import { api } from "@/lib/api";

interface LoginBody {
  email: string;
  password: string;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  departmentName: string;
  roleName: string;
  designation: string;
  dateOfJoining: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    employee: Employee;
  };
}

export const login = (body: LoginBody) =>
  api<LoginResponse>({
    endpoint: "/api/auth/login",
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  });
