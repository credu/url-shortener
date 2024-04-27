import { useEffect, useState } from "react";
import { getData } from "../utils/getData";

/**
 * @param {String} url
 * @param {String} authorization
 */
export const useFetch = (url, authorization) => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        setState({
            data: null,
            isLoading: true,
            error: null,
        });

        getData(url, authorization)
            .then((data) => {
                setState({
                    data: data,
                    isLoading: false,
                    error: null,
                });
            })
            .catch((error) => {
                setState({
                    data: null,
                    isLoading: false,
                    error: { status: error.status, message: error.statusText },
                });
            });
    }, [url, authorization]);

    const setData = (data) => {
        setState({ ...state, data });
    };

    return { ...state, setData };
};
