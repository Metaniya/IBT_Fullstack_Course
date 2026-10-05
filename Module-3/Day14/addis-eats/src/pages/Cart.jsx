import { useCartStore } from "../store/cartStore.js";
import { selectTotal } from "../store/cartSelectors.js";

function Cart() {
    const items = useCartStore((s) => s.items);
    const total = useCartStore(selectTotal);
    const clear = useCartStore((s) => s.clear);

    if (items.length === 0) {
        return <p>Your cart is empty.</p>;
    }

    return (
        <div className="checkout-panel">
            <h2>Your Order</h2>
            {items.map((item, index) => (
                <p key={index}>{item.name} — {item.price} ETB</p>
            ))}
            <p className="order-total">Total: {total} ETB</p>
            <button onClick={clear}>Clear Cart</button>
        </div>
    );
}

export default Cart;