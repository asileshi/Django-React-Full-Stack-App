import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Corrected import statement
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null); // Initialize state properly

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setIsAuthorized(false);
                return;
            }
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken(); // Corrected function call
            } else {
                setIsAuthorized(true);
            }
        };

        auth().catch(() => setIsAuthorized(false)); // Moved auth() call inside useEffect
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN); // Corrected localStorage key
        try {
            const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
            // Process response if needed
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    return isAuthorized ? children : <Navigate to="/login" />

}

export default ProtectedRoute;
