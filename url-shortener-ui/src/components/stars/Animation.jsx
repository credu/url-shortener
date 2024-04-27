import { handleStarAnimation } from "../../utils/handleStarAnimation";
import { useLayoutEffect, useRef } from "react";
import PropTypes from "prop-types";

export const Animation = ({ setAnimationEnded }) => {
    const canvaRef = useRef(null);

    useLayoutEffect(() => {
        handleStarAnimation(canvaRef.current, setAnimationEnded);
    });

    return (
        <canvas
            className="fixed inset-0 !z-[2] w-full h-full transition-opacity duration-100"
            ref={canvaRef}
        ></canvas>
    );
};

Animation.propTypes = {
    setAnimationEnded: PropTypes.func.isRequired,
};
