import PropTypes from "prop-types";

function CategoryBar({ selected, onSelect }) {
    const cats = ["All", "Main", "Vegan", "Grill"];

    return (
        <div className="category-bar">
            {cats.map(cat => (
                <button
                    key={cat}
                    className={cat === selected ? "chip chip-active" : "chip"}
                    onClick={() => onSelect(cat)}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}

CategoryBar.propTypes = {
    selected: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default CategoryBar;