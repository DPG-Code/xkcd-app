import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}