'use client'
import { HeaderDashboard } from "@/components/header/headerDashboard";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function LayoutDashboard({ children }) {
  const pathname = usePathname();
  return (

    <div>
      <HeaderDashboard/>
          <div className="rounded-md border-2 p-2 h-screen">
            {children}

          </div>
    </div>
       
    
    

  );
}
