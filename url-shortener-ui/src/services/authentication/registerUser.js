import StatusError from "../../errors/StatusError";

export const registerUser = async (username, password) => {
    const url = import.meta.env.VITE_API_URL + "/api/auth/register";

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        throw new StatusError(res.status);
    }
    return await res.json();
};
