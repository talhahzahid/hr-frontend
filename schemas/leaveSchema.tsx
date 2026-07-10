import z from "zod";

export const leaveSchema = z.object({
    employeeId: z.string().optional(),
    leaveType: z.string().min(1, "Leave type is required"),
    session: z.string().min(1, "Session type is required"),
    reason: z.string().min(5, "Description is required"),
    totalDays: z.number().min(1, "Max days is required"),
    // status: z.string().optional(),   // ← make it optional, no default
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
});
