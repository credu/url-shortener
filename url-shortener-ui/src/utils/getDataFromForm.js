/**
 * Return a data object from a Form Element
 * @param {HTMLFormElement} formElement
 * @returns {Object}
 */
export const getDataFromForm = (formElement) => {
    const formData = new FormData(formElement);
    const entries = formData.entries();
    return Object.fromEntries(entries);
};
