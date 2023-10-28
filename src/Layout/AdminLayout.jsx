import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export default function AdminLayout() {
  return (
    <>
      <Header />
      <section className="min-h-[70vh] container py-5">
        <div className="flex gap-5">
          <aside className="account_sidebar"></aside>
          <main className="account_content">
            <Outlet />
          </main>
        </div>
      </section>
      <Footer />
    </>
  );
}
