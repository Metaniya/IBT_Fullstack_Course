import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false, onAdd }) {
    const [count, setCount] = useState(0);

    function handleAdd() {
        setCount(count + 1);
        onAdd(price);
    }

    return (
        <div className="dish">
            <h3>
                {name} {spicy && <span className="spicy-badge">Spicy</span>}
            </h3>
            <p>{price} {currency}</p>
            <button onClick={handleAdd}>Add</button>
            {count > 0 && <span className="dish-count">Added: {count}</span>}
        </div>
    );
}

Dish.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string,
    spicy: PropTypes.bool,
    onAdd: PropTypes.func.isRequired,
};

export default Dish;