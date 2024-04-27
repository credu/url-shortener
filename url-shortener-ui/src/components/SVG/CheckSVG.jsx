import PropTypes from "prop-types";

export const CheckSVG = ({ isVisible }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={
                "w-6 h-6 absolute top-0 bottom-0 right-1 duration-100 transition-transform ease-in pointer-events-none [&:not(.-translate-y-full)]:ease-out [&:not(.-translate-y-full)]:duration-300" +
                (!isVisible ? " -translate-y-full" : "")
            }
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 12.75 6 6 9-13.5"
            />
        </svg>
    );
};

CheckSVG.propTypes = {
    isVisible: PropTypes.bool.isRequired,
};
