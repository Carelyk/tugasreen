import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TUGASREEN — Brief rapi, pengerjaan terarah",
    template: "%s | TUGASREEN",
  },
  description:
    "Platform pemesanan bantuan tugas terstruktur dengan brief, file, budget, dan progres dalam satu alur.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
