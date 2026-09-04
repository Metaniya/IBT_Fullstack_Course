import { useState } from "react";
import CategoryBar from "./CategoryBar.jsx";
import DishList from "./DishList.jsx";
import OrderForm from "./OrderForm.jsx";
import dishes from "./data.js";

function Menu() {
    const [category, setCategory] = useState("All");
    const [total, setTotal] = useState(0);

    const shown = category === "All"
        ? dishes
        : dishes.filter(dish => dish.category === category);

    function addToTotal(price) {
        setTotal(total + price);
    }

    return (
        <div>
            <CategoryBar selected={category} onSelect={setCategory} />
            <DishList dishes={shown} category={category} onAdd={addToTotal} />
            <p className="order-total">Order total: {total} ETB</p>
            <OrderForm />
        </div>
    );
}

export default Menu;