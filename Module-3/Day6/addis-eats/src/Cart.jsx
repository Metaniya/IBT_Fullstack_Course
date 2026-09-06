import { useContext } from "react";
import { CartContext } from "./CartContext.js";

function Cart() {
    const { items, total, dispatch } = useContext(CartContext);

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
            <button onClick={() => dispatch({ type: "clear" })}>Clear Cart</button>
        </div>
    );
}

export default Cart;