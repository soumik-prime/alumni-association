import Footer from "./_component/Footer";
import Header from "./_component/Header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1" aria-label="Main content">
        {children}
      </main>
      <Footer />
    </>
  );
}
