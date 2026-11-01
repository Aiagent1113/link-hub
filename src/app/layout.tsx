import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Akbarjon Egamberdiyev | Spatial Link Hub",
  description: "Spatial Personal Link Hub for Akbarjon Egamberdiyev — Software Engineer & Creative Technologist.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0c0c0c] text-white min-h-screen relative antialiased selection:bg-[#00d2ff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
