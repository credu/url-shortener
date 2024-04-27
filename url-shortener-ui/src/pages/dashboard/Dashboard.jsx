import { AuthContext } from "../../context/AuthContext";
import { Container } from "./components/Container";
import { useContext } from "react";

export const Dashboard = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <Container
            user={user}
            logoutUser={logoutUser}
        />
    );
};
