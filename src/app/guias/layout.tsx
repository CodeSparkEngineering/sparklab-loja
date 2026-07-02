import Header from '@/components/Header';
import Footer from '@/components/Footer';

/** Header + Footer em toda a secção /guias (listagem e artigos). */
export default function GuiasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
