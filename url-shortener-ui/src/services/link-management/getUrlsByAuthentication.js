import StatusError from "../../errors/StatusError";

export const getUrlsByAuthentication = async (authenticationToken) => {
    const urlRequest = import.meta.env.VITE_API_URL + "/api/url";
    const res = await fetch(urlRequest, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
            Authorization: "Bearer " + authenticationToken,
        },
    });
    if (!res.ok) {
        throw new StatusError(res.status);
    }
    return await res.json();
};
