/**
 * Parse a string to JSON
 * @param {String} jsonString
 * @returns {Boolean|undefined}
 */
export const getJson = (jsonString) => {
    try {
        return JSON.parse(jsonString);
    } catch (_error) {
        return undefined;
    }
};
