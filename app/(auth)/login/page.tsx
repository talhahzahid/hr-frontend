"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/app/api/auth/user";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Zod Schema
const loginSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Page = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login(data);


            if (result?.success) {
                toast.success(result.message);

                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        token: result.data.token,
                        id: result.data.employee.id,
                        name: `${result.data.employee.firstName} ${result.data.employee.lastName}`,
                        email: result.data.employee.email,
                        designation: result.data.employee.designation,
                    })
                );

                setTimeout(() => {
                    window.location.href = "/pages/Dashboard";
                }, 800);
            }

        } catch (error: any) {
            toast.success(error.message)
            console.log("Error:", error.status, error.message, error.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-xl">

                {/* Card */}
                <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                        <p className="text-gray-500 mt-2 text-sm">
                            Login to continue to your dashboard
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                {...register("email")}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                outline-none transition"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                outline-none transition"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 
              bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 
              text-white py-3 rounded-lg transition font-medium"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-xs text-gray-400 mt-6">
                        Secure login powered by your system
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;