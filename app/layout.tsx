import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Alumni Association",
  description: "Alumni Association, Department of CSE, Netrokona University",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className={`${roboto.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}