import { Outlet, NavLink } from "react-router-dom";
import Header from "./Header.jsx";

function Layout() {
    return (
        <>
            <Header />
            <nav className="main-nav">
                <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Home
                </NavLink>
                <NavLink to="/menu" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Menu
                </NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    Cart
                </NavLink>
            </nav>
            <Outlet />
            <footer>Addis Eats — Bole, Addis Ababa</footer>
        </>
    );
}

export default Layout;