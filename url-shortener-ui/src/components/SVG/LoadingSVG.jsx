import PropTypes from "prop-types";

export const LoadingSVG = ({ isVisible }) => {
    return (
        <div
            className={
                "transition-opacity opacity-0 absolute right-3 block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-inherit" +
                (isVisible ? " !opacity-100" : "")
            }
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};

LoadingSVG.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};
