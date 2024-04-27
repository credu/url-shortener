import { AuthContext } from "./context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Starfield } from "./components/stars/";
import { useContext } from "react";

const AUTHENTICATION_PATHS = ["/login", "/register"];

// FIXME: Deuda tecnica
export const Root = () => {
    const { pathname } = useLocation();
    const { user } = useContext(AuthContext);

    const requireAuthentication =
        !AUTHENTICATION_PATHS.includes(pathname) && !user;
    const noRequireAuthentication =
        AUTHENTICATION_PATHS.includes(pathname) && user;

    return (
        <main className="bg-[#000000] w-full h-dvh flex flex-col justify-center items-center *:z-[0] last:relative">
            <Starfield />

            {requireAuthentication ? (
                <Navigate to="/login" />
            ) : noRequireAuthentication ? (
                <Navigate to="/" />
            ) : (
                <Outlet />
            )}
        </main>
    );
};
