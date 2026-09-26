import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sharon-weds-justin-1.vercel.app"),
  title: "Sharon & Justin | Wedding Invitation",
  description: "The wedding invitation of Sharon and Justin.",
  openGraph: {
    title: "Sharon & Justin | Wedding Invitation",
    description: "The wedding invitation of Sharon and Justin.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sharon & Justin | Wedding Invitation",
    description: "The wedding invitation of Sharon and Justin.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
