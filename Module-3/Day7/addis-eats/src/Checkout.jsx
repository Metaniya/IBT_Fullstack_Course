import { useNavigate } from "react-router-dom";
import { useCartStore } from "./cartStore.js";
import { selectTotal } from "./cartSelectors.js";

function Checkout() {
    const items = useCartStore((s) => s.items);
    const total = useCartStore(selectTotal);
    const clear = useCartStore((s) => s.clear);
    const navigate = useNavigate();

    async function placeOrder() {
        clear();
        navigate("/menu", { replace: true });
    }

    return (
        <div>
            <h2>Checkout</h2>
            <p>{items.length} items — {total} ETB</p>
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
}

export default Checkout;