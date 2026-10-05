import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Dish from "./components/Dish.jsx";
import Card from "./components/Card.jsx";

function DishList({ dishes, category, onAdd }) {
    if (dishes.length === 0) {
        return <p>No {category} dishes yet.</p>;
    }

    return (
        <div className="menu">
            {dishes.map(dish => (
                <Card key={dish.id}>
                    <Link to={`/menu/${dish.id}`}>
                        <Dish {...dish} onAdd={onAdd} />
                    </Link>
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