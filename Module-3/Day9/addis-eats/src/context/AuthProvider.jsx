import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading] = useState(false);

    function login(phone) {
        setUser({ phone });
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}