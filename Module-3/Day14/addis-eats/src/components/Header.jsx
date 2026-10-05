import CartBadge from "./CartBadge.jsx";

function Header() {
    return (
        <header>
            <h1>Addis Eats</h1>
            <p>Order great food across Addis.</p>
            <CartBadge />
        </header>
    );
}

export default Header;