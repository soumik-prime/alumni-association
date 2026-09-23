// import { connection } from "next/server";

import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";
// import SiteNoticeTicker from "./_components/SiteNoticeTicker";
// import { getActiveSiteNotices } from "@/lib/notices/notices";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await connection();

  // const notices = await getActiveSiteNotices();

  return (
    <>
      <Header />
      {/* <SiteNoticeTicker notices={notices} /> */}
      <main id="main-content" className="flex-1 max-w-screen-2xl mx-auto" aria-label="Main content">
        {children}
      </main>
      <Footer />
    </>
  );
}
