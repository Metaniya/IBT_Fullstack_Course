import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import OrderForm from "./OrderForm.jsx";
import { useFetch } from "./useFetch.js";
import { useCartStore } from "./cartStore.js";

function Menu() {
    const [params, setParams] = useSearchParams();
    const category = params.get("category") ?? "All";

    const { data: dishes, loading, error } = useFetch("/dishes.json");
    const addItem = useCartStore((s) => s.addItem);

    const shown = useMemo(() => {
        const list = dishes ?? [];
        return category === "All"
            ? list
            : list.filter(dish => dish.category === category);
    }, [dishes, category]);

    if (loading) return <p>Loading the menu...</p>;
    if (error) return <p className="err">{error}</p>;

    function handleCategorySelect(newCategory) {
        setParams({ category: newCategory });
    }

    function addToCart(dish) {
        addItem(dish);
    }

    return (
        <div>
            <CategoryBar selected={category} onSelect={handleCategorySelect} />
            <DishList dishes={shown} category={category} onAdd={addToCart} />
            <OrderForm />
        </div>
    );
}

export default Menu;