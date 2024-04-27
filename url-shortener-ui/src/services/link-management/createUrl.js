import StatusError from "../../errors/StatusError";

export const createUrl = async (alias, url, authenticationToken) => {
    const urlRequest = `${import.meta.env.VITE_API_URL}/api/url/${alias}`;
    const res = await fetch(urlRequest, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
            Authorization: "Bearer " + authenticationToken,
        },
        body: JSON.stringify({ alias, url }),
    });
    if (!res.ok) {
        throw new StatusError(res.status);
    }
    return await res.json();
};
