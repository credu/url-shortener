import { AuthContext } from "./AuthContext";
import { getJson } from "../utils/getJson";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// FIXME: Can you think a better name, no?
const AUTH_KEY = "AUTHENTICATION";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getJson(localStorage.getItem(AUTH_KEY)));

    const logoutUser = () => {
        setUser(undefined);
    };

    useEffect(() => {
        if (!user) {
            localStorage.removeItem(AUTH_KEY);
            return;
        }

        const authentication = localStorage.getItem(AUTH_KEY);
        if (user != authentication) {
            localStorage.setItem(AUTH_KEY, JSON.stringify(user));
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
