import { Animation, Background } from "./";
import { useState } from "react";

export const Starfield = () => {
    const [animationEnded, setAnimationEnded] = useState(false);

    return (
        <>
            {!animationEnded && (
                <Animation setAnimationEnded={setAnimationEnded} />
            )}
            <Background />
        </>
    );
};
