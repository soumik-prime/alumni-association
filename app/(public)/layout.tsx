import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";
import UnderConstructionNotice from "./_components/UnderConstructionNotice";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <UnderConstructionNotice />
      <main id="main-content" className="flex-1" aria-label="Main content">
        {children}
      </main>
      <Footer />
    </>
  );
}
