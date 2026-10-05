import PropTypes from "prop-types";

function Dish({ id, name, price, currency = "ETB", spicy = false, category, onAdd }) {
    function handleAdd() {
        onAdd({ id, name, price, category, spicy });
    }

    return (
        <div className="dish">
            <h3>
                {name} {spicy && <span className="spicy-badge">Spicy</span>}
            </h3>
            <p>{price} {currency}</p>
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

Dish.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string,
    spicy: PropTypes.bool,
    category: PropTypes.string,
    onAdd: PropTypes.func.isRequired,
};

export default Dish;