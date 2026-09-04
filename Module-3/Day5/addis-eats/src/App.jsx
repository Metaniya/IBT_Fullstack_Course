import Header from "./Header.jsx";
import Menu from "./Menu.jsx";
import { CartProvider } from "./CartProvider.jsx";
import "./index.css";

function App() {
    return (
        <CartProvider>
            <Header />
            <Menu />
        </CartProvider>
    );
}

export default App;