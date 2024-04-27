import { useState } from "react";

export const useToggle = (value) => {
    const [state, setState] = useState(!!value);

    const toggleState = () => {
        setState((state) => !state);
    };

    return [state, toggleState];
};
