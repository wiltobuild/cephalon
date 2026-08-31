import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Saira_Condensed } from "next/font/google";
import "./globals.css";

const saira = Saira_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-saira" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], variable: "--font-jetbrains" });

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${saira.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
