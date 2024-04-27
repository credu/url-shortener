import { Link } from "react-router-dom";
import { LoadingSVG } from "./SVG/";
import PropTypes from "prop-types";

/**
 * @param {{
 *  fieldList: {
 *      type: import("react").HTMLInputTypeAttribute,
 *      name: String,
 *      id: String,
 *      placeholder: String,
 *      defaultValue: (String | undefined),
 *      required: Boolean,
 *  }[],
 *  buttonText: String,
 *  externalLink: { path: String, message: String },
 *  onSubmit: (event:SubmitEvent) => void,
 * }} props
 */
export const Form = ({
    fieldList,
    buttonText,
    externalLink,
    isLoading,
    onSubmit,
}) => {
    const genericSubmit = (event) => {
        event.preventDefault();
        console.error("Form not handled");
    };

    return (
        <form
            onSubmit={onSubmit || genericSubmit}
            className="p-5 relative z-[0] flex flex-col"
        >
            {fieldList.map((attributes) => (
                <input
                    key={attributes.id}
                    className="rounded-md px-3 py-1 text-lg text-center mb-5"
                    {...attributes}
                />
            ))}

            <button
                type="submit"
                className="flex items-center justify-center relative border border-white rounded-md text-lg px-3 py-1 transition-colors ease-in duration-[100ms]
                hover:ease-out hover:duration-[200ms] hover:[&:not([disabled])]:bg-white hover:[&:not([disabled])]:text-[#333]
                disabled:cursor-not-allowed"
                disabled={isLoading}
                id="button"
            >
                <span>{buttonText}</span>
                <LoadingSVG isVisible={isLoading} />
            </button>
            {externalLink && (
                <Link
                    className="px-5 absolute inset-[auto_0_-15px_0] text-center"
                    to={externalLink.path}
                >
                    {externalLink.message}
                </Link>
            )}
        </form>
    );
};

Form.propTypes = {
    fieldList: PropTypes.array.isRequired,
    externalLink: PropTypes.object,
    buttonText: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func,
};
