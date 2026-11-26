import type { Metadata } from "next";
import { PreferencesProvider } from "@/components/preferences";
import '@fontsource-variable/plus-jakarta-sans';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "tuGasREEN | Brief rapi, pengerjaan terarah",
    template: "%s | tuGasREEN",
  },
  description:
    "Platform pemesanan bantuan tugas terstruktur dengan brief, file, budget, dan progres dalam satu alur.",
  icons: {
    icon: "/tugasreen-logo.jpg",
    apple: "/tugasreen-logo.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full"><PreferencesProvider initialLanguage="id">{children}</PreferencesProvider></body>
    </html>
  );
}
