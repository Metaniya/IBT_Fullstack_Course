import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext.js";

function Checkout() {
    const { items, total, dispatch } = useContext(CartContext);
    const navigate = useNavigate();

    async function placeOrder() {
        dispatch({ type: "clear" });
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