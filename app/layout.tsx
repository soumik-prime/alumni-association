import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CSE Alumni Association | Netrokona University",
    template: "%s | CSE Alumni Association",
  },
  description:
    "Connect with the Department of CSE alumni network at Netrokona University, discover graduates, track batches, and explore publications and statistics.",
  applicationName: "CSE Alumni Association",
  keywords: [
    "Netrokona University",
    "CSE alumni",
    "alumni association",
    "department of computer science",
    "university graduates",
    "alumni directory",
    "batch records",
    "research publications",
  ],
  openGraph: {
    title: "CSE Alumni Association | Netrokona University",
    description:
      "An alumni directory and community hub for graduates, students, and faculty of the Department of CSE at Netrokona University.",
    type: "website",
    locale: "en_US",
    siteName: "CSE Alumni Association",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSE Alumni Association | Netrokona University",
    description:
      "Stay connected with the Department of CSE alumni community and discover student and graduate achievements.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
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