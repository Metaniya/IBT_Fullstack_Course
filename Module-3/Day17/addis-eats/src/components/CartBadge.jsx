import { useCartStore } from "../store/cartStore.js";

function CartBadge() {
    const count = useCartStore((s) => s.items.length);
    return <span className="cart-badge">{count}</span>;
}

export default CartBadge;