import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";

function RequireAuth({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) return <p>Loading...</p>;

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
}

export default RequireAuth;