import { useState } from "react";

const PHONE_PATTERN = /^(?:\+251|0)9\d{8}$/;

function OrderForm() {
    const [form, setForm] = useState({ name: "", phone: "", area: "Bole" });

    const phoneValid = PHONE_PATTERN.test(form.phone);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(`Order placed for ${form.name} in ${form.area}`);
    }

    return (
        <form onSubmit={handleSubmit} className="order-form">
            <h2>Delivery Details</h2>

            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />

            <label htmlFor="phone">Phone</label>
            <input
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="09... or +2519..."
            />
            {form.phone && !phoneValid && (
                <p className="err">Use 09... or +2519... format.</p>
            )}

            <label htmlFor="area">Area</label>
            <select id="area" name="area" value={form.area} onChange={handleChange}>
                <option value="Bole">Bole</option>
                <option value="Piassa">Piassa</option>
                <option value="Kazanchis">Kazanchis</option>
            </select>

            <button type="submit" disabled={!phoneValid}>
                Pay with TeleBirr
            </button>
        </form>
    );
}

export default OrderForm;