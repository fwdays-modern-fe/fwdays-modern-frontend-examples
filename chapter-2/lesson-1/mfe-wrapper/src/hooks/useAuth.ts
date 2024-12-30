import {useState} from "react"

//Для наївної аутентифікації і захисту навігації
export const isAuthenticated = () => {
    return false;
}

//Використання React hook для аутентифікації і захисту навігації
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        login,
        logout,
    }
}
