import StatusError from "../errors/StatusError";

export const getData = async (url, authorization) => {
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
            Authorization: "Bearer " + authorization,
        },
    });

    if (!res.ok) {
        throw new StatusError(res.status);
    }

    return await res.json();
};
