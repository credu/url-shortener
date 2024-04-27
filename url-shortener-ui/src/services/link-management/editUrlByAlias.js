import StatusError from "../../errors/StatusError";

export const editUrlByAlias = async ({
    aliasTarget,
    aliasToChange,
    urlToChange,
    authenticationToken,
}) => {
    const urlRequest = `${import.meta.env.VITE_API_URL}/api/url/${aliasTarget}`;
    const res = await fetch(urlRequest, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
            Authorization: "Bearer " + authenticationToken,
        },
        body: JSON.stringify({ alias: aliasToChange, url: urlToChange }),
    });
    if (!res.ok) {
        throw new StatusError(res.status);
    }
    return await res.json();
};
