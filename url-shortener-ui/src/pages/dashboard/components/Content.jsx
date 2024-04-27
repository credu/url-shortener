import { buttonFunctions } from "../utils/buttonFunctions";
import { Children, useState } from "react";
import { Item, ItemLoading, ItemToCreate } from ".";
import { useDashboard } from "../hooks/useDashboard";
import PropTypes from "prop-types";

export const Content = ({ user }) => {
    const { linkList, isLoading, editUrl, addNewUrl, removeUrlByAlias } =
        useDashboard(user.token);

    const [lastAliasCopied, setLastAliasCopied] = useState(null);

    const handleDashboardButtons = (event) => {
        const button = event.target;

        if (button.tagName !== "BUTTON") return;
        const { alias, btnfunction } = button.dataset;

        const btnFunction = buttonFunctions[btnfunction];
        if (btnFunction instanceof Function) {
            btnFunction({
                alias,
                button,
                removeUrlByAlias,
                setLastAliasCopied,
            });
        }
    };

    return (
        <div
            onClick={handleDashboardButtons}
            className="grid grid-cols-3 gap-5 px-2 py-4 max-h-full overflow-y-auto opacity-0 animate-[fadeIn_1s_ease_.3s_forwards]"
        >
            {isLoading ? (
                Children.toArray([...Array(9)].map(() => <ItemLoading />))
            ) : (
                <>
                    <ItemToCreate addNewUrl={addNewUrl} />
                    {linkList?.map((link) => (
                        <Item
                            key={link.id}
                            editUrl={editUrl}
                            isCopied={link.alias === lastAliasCopied}
                            {...link}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

Content.propTypes = {
    user: PropTypes.object.isRequired,
};
