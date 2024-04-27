const copyLink = ({ alias, setLastAliasCopied }) => {
    const url = import.meta.env.VITE_API_URL + "/" + alias;
    setLastAliasCopied(alias);
    navigator.clipboard.writeText(url);
};

const deleteLink = ({ alias, button, removeUrlByAlias }) => {
    const container = button.parentElement.parentElement.parentElement;

    container.classList.add("scale-y-0", "opacity-0");
    removeUrlByAlias(alias).catch(() => {
        container.classList.remove("scale-y-0", "opacity-0");
    });
};

export const buttonFunctions = {
    copyLink,
    deleteLink,
};
