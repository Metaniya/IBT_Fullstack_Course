import Dish from "./Dish.jsx";

const menu = [
    { id: 1, name: "Doro Wat", price: 240 },
    { id: 2, name: "Shiro", price: 120 },
    { id: 3, name: "Tibs", price: 280 },
    { id: 4, name: "Kitfo", price: 300 },
];

function Menu() {
    return (
        <div className="menu">
            {menu.map(dish => (
                <Dish key={dish.id} name={dish.name} price={dish.price} />
            ))}
        </div>
    );
}

export default Menu;