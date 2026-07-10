// app/(auth)/layout.tsx

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${poppins.className} min-h-screen flex items-center justify-center bg-gray-50`}
    >
      {children}
    </div>
  );
}