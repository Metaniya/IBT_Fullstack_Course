import PropTypes from "prop-types";
import Dish from "./Dish.jsx";
import Card from "./Card.jsx";

function DishList({ dishes, category, onAdd }) {
    if (dishes.length === 0) {
        return <p>No {category} dishes yet.</p>;
    }

    return (
        <div className="menu">
            {dishes.map(dish => (
                <Card key={dish.id}>
                    <Dish {...dish} onAdd={onAdd} />
                </Card>
            ))}
        </div>
    );
}

DishList.propTypes = {
    dishes: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default DishList;