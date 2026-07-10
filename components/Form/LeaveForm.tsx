"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { leaveSchema } from "../../schemas/leaveSchema";
import { applyLeaves } from "@/app/api/leave/leave";
import { toast } from "sonner";


type LeaveFormValues = z.infer<typeof leaveSchema>;

export const LeaveForm = ({ onClose }: { onClose?: () => void }) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LeaveFormValues>({
        resolver: zodResolver(leaveSchema),
        defaultValues: {
            employeeId: "",
            leaveType: "",
            reason: "",
            totalDays: 0,
            // status: "",
            startDate: "",
            session: "",
            endDate: "",
        },
    });

    const storedData =
        typeof window !== "undefined"
            ? localStorage.getItem("user")
            : null;

    const userData = storedData ? JSON.parse(storedData) : null;


    const onSubmit = async (values: LeaveFormValues) => {
        if (!userData?.id) {
            toast.error("Please login to apply for leave");
            return;
        }
        try {
            setLoading(true);
            const payload = {
                ...values,
                // status: values.status ?? "pending",
                employeeId: userData.id,
            };
            console.log(payload)
            // return
            const res = await applyLeaves(payload);
            if (res?.success === true) {
                toast.success("Leave applied successfully");
                onClose?.();
            } else {
                toast.error(res?.message || "Failed to apply leave");
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error("Failed to apply leave");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-2xl mx-auto p-6 border rounded-lg space-y-6"
        >
            <h2 className="text-2xl font-semibold">Leave Form</h2>

            {/* Leave Type */}
            <div className="space-y-2">
                <Label>Leave Type</Label>

                <Controller
                    control={control}
                    name="leaveType"
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Leave Type" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Annual">Annual Leave</SelectItem>
                                <SelectItem value="Sick">Sick Leave</SelectItem>
                                <SelectItem value="Casual">Casual Leave</SelectItem>
                            </SelectContent>
                        </Select>

                    )}

                />
                {errors.leaveType && (
                    <p className="text-sm text-red-500">
                        {errors.leaveType.message}
                    </p>
                )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Input type="date" {...register("startDate")} />
                    {errors.startDate && (
                        <p className="text-sm text-red-500">
                            {errors.startDate.message}
                        </p>
                    )}
                </div>
                <div>
                    <Input type="date" {...register("endDate")} />
                    {errors.endDate && (
                        <p className="text-sm text-red-500">
                            {errors.endDate.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Max Days */}
            <div className="space-y-2">
                <Label>Max Days</Label>
                <Input
                    type="number"
                    {...register("totalDays", {
                        valueAsNumber: true,
                    })}
                />
                {errors.totalDays && (
                    <p className="text-sm text-red-500">
                        {errors.totalDays.message}
                    </p>
                )}
            </div>

            {/* Leave Type */}
            <div className="space-y-2">
                <Label>Session</Label>

                <Controller
                    control={control}
                    name="session"
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Session Type" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="Full Day">Full Day</SelectItem>
                                <SelectItem value="First Half">First Half</SelectItem>
                                <SelectItem value="Second Half">Second Half</SelectItem>
                            </SelectContent>
                        </Select>

                    )}

                />
                {errors.session && (
                    <p className="text-sm text-red-500">
                        {errors.session.message}
                    </p>
                )}
            </div>

            {/* reason */}
            <div className="space-y-2">
                <Label>Leave Reason</Label>
                <Textarea rows={4} {...register("reason")} />
                {errors.reason && (
                    <p className="text-sm text-red-500">
                        {errors.reason.message}
                    </p>
                )}
            </div>


            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
};