import { Inter } from "next/font/google";

import HeaderPage from "@/components/header/header";

export default function RootLayout({ children }) {
  return (
    <body>
        <HeaderPage></HeaderPage>
        <div className="p-2">
          {children}

        </div>
    
    </body>
  );
}
