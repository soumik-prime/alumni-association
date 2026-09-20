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
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
	