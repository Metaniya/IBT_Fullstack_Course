import { useEffect, useRef, useState } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import OrderForm from "./OrderForm.jsx";
import { fetchDishes } from "./api.js";

function Menu() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [category, setCategory] = useState("All");
    const [total, setTotal] = useState(0);

    const searchRef = useRef(null);

    useEffect(() => {
        document.title = `Addis Eats — ${dishes.length} dishes`;
    }, [dishes]);

    useEffect(() => {
        const controller = new AbortController();

        fetchDishes(controller.signal)
            .then(setDishes)
            .catch(err => {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            })
            .finally(() => setLoading(false));

        return () => controller.abort();
    }, [category]);

    function handleCategorySelect(nextCategory) {
        setLoading(true);
        setError(null);
        setCategory(nextCategory);
    }

    useEffect(() => {
        searchRef.current.focus();
    }, []);

    function addToTotal(price) {
        setTotal(total + price);
    }

    if (loading) return <p>Loading the menu...</p>;
    if (error) return <p className="err">{error}</p>;

    const shown = category === "All"
        ? dishes
        : dishes.filter(dish => dish.category === category);

    return (
        <div>
            <input ref={searchRef} type="text" placeholder="Search dishes..." className="search-input" />
            <CategoryBar selected={category} onSelect={handleCategorySelect} />
            <DishList dishes={shown} category={category} onAdd={addToTotal} />
            <p className="order-total">Order total: {total} ETB</p>
            <OrderForm />
        </div>
    );
}

export default Menu;