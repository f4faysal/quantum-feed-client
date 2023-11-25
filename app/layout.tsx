import Providers from "@/lib/providers";
import { ToastProvider } from "@/lib/toast-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuantumFeed",
  description: "A feed reader for the modern web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <ToastProvider />

          {children}
        </Providers>
      </body>
    </html>
  );
}
