import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore.js";
import { selectTotal } from "../store/cartSelectors.js";
import { validate } from "../lib/validate.js";
import Field from "../components/Field.jsx";

const AREAS = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

function Checkout() {
    const items = useCartStore((s) => s.items);
    const total = useCartStore(selectTotal);
    const clear = useCartStore((s) => s.clear);
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: "", phone: "", area: "Bole", notes: "" });
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    const errors = validate(form);
    const hasErrors = Object.keys(errors).length > 0;
    const show = (field) => touched[field] && errors[field];

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    function handleBlur(e) {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
    }

    async function fakePlaceOrder(order) {
        // simulates exercise 7 — flip this to succeed/fail while testing
        await new Promise((res) => setTimeout(res, 600));
        if (order.phone.endsWith("0000")) {
            throw new Error("That number is not registered with TeleBirr");
        }
        return { id: Math.floor(Math.random() * 10000) };
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setTouched({ name: true, phone: true, area: true, notes: true });

        if (hasErrors) {
            const firstError = Object.keys(errors)[0];
            document.getElementById(firstError)?.focus();
            return;
        }

        if (submitting) return;
        setSubmitting(true);
        setServerError(null);

        try {
            await fakePlaceOrder(form);
            clear();
            navigate("/menu", { replace: true });
        } catch (err) {
            setServerError(err.message);
            document.getElementById("name")?.focus();
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2>Checkout</h2>
            <p>{items.length} items — {total} ETB</p>

            <Field label="Name" id="name" error={show("name")}>
                <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!show("name")}
                    aria-describedby={show("name") ? "name-error" : undefined}
                />
            </Field>

            <Field label="TeleBirr number" id="phone" error={show("phone")}>
                <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!show("phone")}
                    aria-describedby={show("phone") ? "phone-error" : undefined}
                />
            </Field>

            <Field label="Delivery area" id="area" error={show("area")}>
                <select
                    id="area"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    {AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
            </Field>

            <Field label="Notes (optional)" id="notes" error={null}>
                <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                />
            </Field>

            <button type="submit" disabled={submitting || hasErrors}>
                {submitting ? "Sending your order..." : `Order — ${total} ETB`}
            </button>

            {serverError && <p role="alert">{serverError}</p>}
        </form>
    );
}

export default Checkout;