"use client";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

interface AppSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}

export default function AppSheet({
    open,
    onOpenChange,
    title,
    children,
    side = "right",
}: AppSheetProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side={side} className="w-full sm:max-w-xl overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>

                <div className="mt-6">{children}</div>
            </SheetContent>
        </Sheet>
    );
}