import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <div id="appBody" className="d-flex flex-column">
                <div className="page-content">
                    <div className="navbar-overlay" />
                    <Header />
                    <main id="main" className="container">
                        <section className="section-app">
                            <Outlet />
                        </section>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    )
}