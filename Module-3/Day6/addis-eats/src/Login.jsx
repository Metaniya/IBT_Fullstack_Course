import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";

function Login() {
    const [phone, setPhone] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        login(phone);
        const from = location.state?.from?.pathname ?? "/menu";
        navigate(from, { replace: true });
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="phone">Phone</label>
            <input id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login;