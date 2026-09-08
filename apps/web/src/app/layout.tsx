import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Saira_Condensed } from "next/font/google";
import "./globals.css";
import { UiProvider } from "@/ui";
export const metadata = {
  title: "Cephalon — Your arsenal, understood",
  description:
    "Build, compare, and optimize your Warframe weapons with weapon stats and build comparisons.",
};

const saira = Saira_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-saira",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains",
});

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${saira.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
