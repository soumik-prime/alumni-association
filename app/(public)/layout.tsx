import { connection } from "next/server";

import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";
import SiteNoticeTicker from "./_components/SiteNoticeTicker";
import { getActiveSiteNotices } from "@/lib/notices/notices";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Notices depend on the current time and must not be captured in a static shell.
  await connection();
  const notices = await getActiveSiteNotices();

  return (
    <>
      <Header />
      <SiteNoticeTicker notices={notices} />
      {/* <main id="main-content" className="flex-1 w-full max-w-screen-2xl mx-auto" aria-label="Main content"> */}
        <>
          {children}
        </>
      {/* </main> */}
      <Footer />
    </>
  );
}
