import PropTypes from "prop-types";

export const Header = ({ logoutUser }) => {
    return (
        <header className="flex flex-row justify-between py-1 border-b text-base">
            <h1 className="px-2">Dashboard</h1>
            <div>
                <button
                    type="button"
                    className="px-2"
                    onClick={logoutUser}
                >
                    x
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};
