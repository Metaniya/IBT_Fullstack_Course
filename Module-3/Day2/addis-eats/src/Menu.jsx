import PropTypes from "prop-types";
import Dish from "./Dish.jsx";
import Card from "./Card.jsx";
import dishes from "./data.js";

function Menu({ category }) {
    const shown = dishes.filter(dish => dish.category === category);

    if (shown.length === 0) {
        return <p>No {category} dishes found.</p>;
    }

    return (
        <div className="menu">
            {shown.map(dish => (
                <Card key={dish.id}>
                    <Dish
                        name={dish.name}
                        price={dish.price}
                        spicy={dish.spicy}
                    />
                </Card>
            ))}
        </div>
    );
}

Menu.propTypes = {
    category: PropTypes.string.isRequired,
};

export default Menu;