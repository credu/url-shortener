import { CheckSVG, PencilSVG } from "../../../components/SVG";
import PropTypes from "prop-types";

export const ItemView = ({ alias, url, isCopied, setEditMode }) => {
    return (
        <article className="relative border rounded-md transition-[opacity_.5s_ease-in-out,transform_.3s_ease-in-out]">
            <header className="border-b flex flex-row items-center justify-between">
                <h2 className="px-2">{alias}</h2>

                <div className="flex">
                    <button
                        type="button"
                        onClick={() => setEditMode(true)}
                    >
                        <PencilSVG />
                    </button>
                    <button
                        type="button"
                        className="px-2"
                        data-btnfunction="deleteLink"
                        data-alias={alias}
                    >
                        x
                    </button>
                </div>
            </header>
            <div className="px-2 py-3">
                <p className="overflow-hidden whitespace-nowrap text-ellipsis leading-none mb-3">
                    {url}
                </p>
                <button
                    data-btnfunction="copyLink"
                    data-alias={alias}
                    className="relative text-center w-full border overflow-hidden
                        flex justify-center items-center
                        transition-colors ease-in duration-[100ms]
                        hover:ease-out hover:duration-[200ms] hover:[&:not([disabled])]:bg-white hover:[&:not([disabled])]:text-[#333]
                        disabled:cursor-not-allowed"
                >
                    <span className="pointer-events-none">
                        {isCopied ? "Copied" : "Copy Url"}
                    </span>
                    <CheckSVG isVisible={isCopied} />
                </button>
            </div>
        </article>
    );
};

ItemView.propTypes = {
    alias: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isCopied: PropTypes.bool,
    setEditMode: PropTypes.func.isRequired,
};
