import { useFetch } from "../../../hooks/useFetch";
import {
    createUrl,
    deleteUrlByAlias,
    editUrlByAlias,
} from "../../../services/link-management";

export const useDashboard = (authenticationToken) => {
    const url = import.meta.env.VITE_API_URL + "/api/url";
    /**
     * @type {{
     *  data: import("../../../models/link.model").Link[],
     *  setData: (value) => void,
     *  isLoading: boolean
     * }}
     */
    const { data, setData, isLoading } = useFetch(url, authenticationToken);

    const addNewUrl = async (alias, url) => {
        const tempData = [...data];
        const resultData = [...data, { id: crypto.randomUUID(), alias, url }];

        try {
            const res = await createUrl(alias, url, authenticationToken);
            setData(resultData);
            return res;
        } catch (error) {
            setData(tempData);
            throw error;
        }
    };

    const editUrl = async (aliasTarget, aliasToChange, urlToChange) => {
        const tempData = [...data];
        const resultData = data.map((link) => {
            if (link.alias === aliasTarget) {
                return { ...link, alias: aliasToChange, url: urlToChange };
            }
            return link;
        });

        setData(resultData);
        try {
            return await editUrlByAlias({
                aliasTarget,
                aliasToChange,
                urlToChange,
                authenticationToken,
            });
        } catch (error) {
            setData(tempData);
            throw error;
        }
    };

    const removeUrlByAlias = async (alias) => {
        const tempData = [...data];
        const resultData = data.filter((link) => link.alias != alias);

        try {
            const res = await deleteUrlByAlias(alias, authenticationToken);
            setData(resultData);
            return res;
        } catch (error) {
            setData(tempData);
            throw error;
        }
    };

    return {
        linkList: data,
        addNewUrl,
        editUrl,
        isLoading,
        removeUrlByAlias,
    };
};
