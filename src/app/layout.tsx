import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WRAITH | Web3 Sniper Bot",
  description: "Advanced DEX sniper bot with real-time mempool monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="scan-line"></div>
        {children}
      </body>
    </html>
  );
}
