// // app/pages/layout.tsx

// import Sidebar from "@/components/Sidebar";
// import Navbar from "@/components/Navbar";
// import { Poppins } from "next/font/google";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });

// export default function PagesLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className={`${poppins.className} flex h-screen`}>
//       <Sidebar />

//       <div className="flex flex-col flex-1">
//         <Navbar />

//         <main className="flex-1 overflow-auto p-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import { Loader2 } from "lucide-react";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-transparent backdrop-blur-sm">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className={`${poppins.className} flex h-screen`}>
      <Sidebar />

      <div className="flex flex-col flex-1">
        <Navbar />

        <main className="flex-1 overflow-auto p-4">
          {children}
          <Toaster  />
        </main>
      </div>
    </div>
  );
}