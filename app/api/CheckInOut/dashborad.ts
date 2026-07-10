import { api } from "@/lib/api";
import { StringDecoder } from "string_decoder";

interface Body {
  checkInTime?: string;
  day?: string;
  checkOutTime?: string;
}

interface checkInOutResponse {
  success: any;
  message: String;
  data: {
    id: number;
  };
}

export const checkIn = (body: any) => {
  return api<checkInOutResponse>({
    endpoint: "/api/v3/check-in",
    options: {
      method: "POST",
      body: JSON.stringify(body),
    },
  });
};

export const checkOut = (id: number, body: Body) => {
  return api<checkInOutResponse>({
    endpoint: `/api/v3/attendance/${id}/check-out`,
    options: {
      method: "PATCH",
      body: JSON.stringify(body),
    },
  });
};
