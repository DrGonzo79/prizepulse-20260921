import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrizePulse — instant-win campaign studio",
  description: "A transparent instant-win lead capture campaign prototype.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
