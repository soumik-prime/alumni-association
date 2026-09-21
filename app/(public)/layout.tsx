import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";
import SiteNoticeTicker from "./_components/SiteNoticeTicker";
import { getActiveSiteNotices } from "@/lib/notices/notices";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notices = await getActiveSiteNotices();

  return (
    <>
      <Header />
      <SiteNoticeTicker notices={notices} />
      <main id="main-content" className="flex-1" aria-label="Main content">
        {children}
      </main>
      <Footer />
    </>
  );
}
