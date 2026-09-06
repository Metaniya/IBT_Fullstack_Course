import { useParams } from "react-router-dom";
import { useFetch } from "./useFetch.js";

function DishDetail() {
    const { id } = useParams();
    const { data: dishes, loading, error } = useFetch("/dishes.json");

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="err">{error}</p>;

    const dish = dishes.find(d => String(d.id) === id);

    if (!dish) return <p>No dish called {id}.</p>;

    return (
        <div className="dish-detail">
            <h2>{dish.name}</h2>
            <p>{dish.price} ETB</p>
            <p>Category: {dish.category}</p>
            {dish.spicy && <p className="spicy-badge">Spicy</p>}
        </div>
    );
}

export default DishDetail;