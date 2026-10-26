import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "D.Town Records — Artists First",
  description: "D.Town Records is an independent, artist-first record label. Discover the roster and book an artist for your venue or event.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
