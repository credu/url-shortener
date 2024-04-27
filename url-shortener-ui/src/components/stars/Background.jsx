import bgImg from "/img/white-stars-bg.png"; // extracted from https://www.pngall.com/stars-png/download/1741

export const Background = () => {
    return (
        <div className="fixed inset-0 z-[0] pointer-events-none">
            <div
                className="fixed inset-0 z-[-1] w-full h-full animate-[mist_150s_3800ms_infinite_linear] bg-[length:20%] brightness-150 transition-opacity duration-[3000ms] mix-blend-screen"
                style={{
                    backgroundImage: `url(${bgImg})`,
                }}
            ></div>
            <div
                className="fixed inset-0 z-[-1] w-full h-full animate-[mist_150s_3800ms_infinite_linear] bg-[length:30%] brightness-150 transition-opacity duration-[3000ms] mix-blend-screen"
                style={{
                    backgroundImage: `url(${bgImg})`,
                }}
            ></div>
        </div>
    );
};
