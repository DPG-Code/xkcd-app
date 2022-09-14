import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="pb-12">
        {children}
      </main>
      <Footer />
    </>
  )
}