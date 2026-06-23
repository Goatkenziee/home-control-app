import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Control",
  description: "Control your Wi-Fi home devices from your browser",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ ["--font-sans" as string]: "Inter, system-ui, sans-serif" }}>
      <body>{children}</body>
    </html>
  );
}
