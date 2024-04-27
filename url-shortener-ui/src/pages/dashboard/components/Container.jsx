import { Content, Header } from "./";
import PropTypes from "prop-types";

export const Container = ({ user, logoutUser }) => {
    return (
        <section className="border border-white rounded-md h-full w-full max-h-[422px] max-w-[800px] flex flex-col items-stretch">
            <Header logoutUser={logoutUser} />
            <Content user={user} />
        </section>
    );
};

Container.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
};
