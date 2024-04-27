import { getDataFromForm } from "../../../utils/getDataFromForm";
import { LoadingSVG } from "../../../components/SVG";
import { useState } from "react";
import PropTypes from "prop-types";

export const ItemToCreate = ({ addNewUrl }) => {
    const [state, setState] = useState({
        isLoading: false,
        message: "Create Url",
    });

    const handleForm = (event) => {
        event.preventDefault();

        const form = event.target;
        const { alias, url } = getDataFromForm(form);

        setState({ isLoading: true, message: "Loading..." });
        addNewUrl(alias, url)
            .then(() => {
                setState({ isLoading: false, message: "Created" });
            })
            .catch(() => {
                setState({ isLoading: false, message: "Conflict" });
            })
            .finally(() => {
                form.reset();
            });
    };

    return (
        <article className="relative border rounded-md">
            <form onSubmit={handleForm}>
                <header className="border-b flex flex-row items-center justify-between">
                    <input
                        type="text"
                        className="mx-2 bg-transparent leading-none w-full mt-[-1px] mb-[1px] focus:bg-zinc-500"
                        placeholder="alias"
                        id="alias"
                        name="alias"
                        required
                    />
                    <button
                        type="button"
                        className="px-2"
                    >
                        x
                    </button>
                </header>
                <div className="px-2 pb-3 pt-[calc(0.75rem-2px)]">
                    <input
                        type="text"
                        className="block bg-transparent leading-none w-full mb-[calc(0.75rem-0.995px)] focus:bg-zinc-500"
                        placeholder="url"
                        id="url"
                        name="url"
                        pattern="(((http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?"
                        title="Valid url format"
                        required
                    />
                    <button
                        type="submit"
                        className="relative text-center w-full border overflow-hidden
                            flex justify-center items-center
                            transition-colors ease-in duration-[100ms]
                            hover:ease-out hover:duration-[200ms] hover:[&:not([disabled])]:bg-white hover:[&:not([disabled])]:text-[#333]
                            disabled:cursor-not-allowed"
                    >
                        <span className="pointer-events-none">
                            {state.message}
                        </span>
                        {/* Loading */}
                        <LoadingSVG isVisible={state.isLoading} />
                    </button>
                </div>
            </form>
        </article>
    );
};

ItemToCreate.propTypes = {
    addNewUrl: PropTypes.func.isRequired,
};
