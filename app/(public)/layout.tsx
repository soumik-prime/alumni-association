import TopBar from "./_component/TopBar";
import Footer from "./_component/Footer";
import Navbar from "./_component/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
			<header className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
        <Navbar />
      </header>
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  );
}
	