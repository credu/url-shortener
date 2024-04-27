import { getDataFromForm } from "../../../utils/getDataFromForm";
import { LoadingSVG, PencilSVG } from "../../../components/SVG";
import { useState } from "react";
import PropTypes from "prop-types";

export const ItemToEdit = ({ alias, url, editUrl, setEditMode }) => {
    const [state, setState] = useState({
        isLoading: false,
        message: "Edit Url",
    });

    const handleForm = (event) => {
        event.preventDefault();
        /** @type {HTMLFormElement} */
        const form = event.target;
        const { aliasToChange, urlToChange } = getDataFromForm(form);

        const hasChanges = alias !== aliasToChange || url !== urlToChange;
        if (!hasChanges) {
            setEditMode();
            return;
        }

        setState({ isLoading: true, message: "Loading..." });
        editUrl(alias, aliasToChange, urlToChange)
            .then(() => {
                setEditMode(false);
            })
            .catch((error) => {
                switch (error.message) {
                    case "409":
                        setState({ isLoading: false, message: "Conflict" });
                        break;
                    default:
                        setState({
                            isLoading: false,
                            message: "Error " + error.message,
                        });
                        break;
                }
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
                        className="mx-2 bg-zinc-500 bg-opacity-50 leading-none valid:bg-transparentt w-full mt-[-1px] mb-[1px]"
                        placeholder="alias"
                        id="aliasToChange"
                        name="aliasToChange"
                        defaultValue={alias}
                        required
                    />
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => setEditMode(false)}
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
                <div className="px-2 pb-3 pt-[calc(0.75rem-2px)]">
                    <input
                        className="block leading-none w-full bg-zinc-500 bg-opacity-50 mb-[calc(0.75rem-0.995px)] valid:bg-transparentt placeholder:"
                        defaultValue={url}
                        id="urlToChange"
                        name="urlToChange"
                        pattern="(((http|https):\/\/)|(\/)|(..\/))(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?"
                        placeholder="url"
                        required
                        title="Valid url format"
                        type="text"
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

ItemToEdit.propTypes = {
    alias: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    editUrl: PropTypes.func.isRequired,
    setEditMode: PropTypes.func.isRequired,
};
