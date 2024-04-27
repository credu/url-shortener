import { ItemToEdit, ItemView } from "./";
import { useState } from "react";
import PropTypes from "prop-types";

export const Item = ({ alias, url, isCopied, editUrl }) => {
    const [editMode, setEditMode] = useState(false);

    return editMode ? (
        <ItemToEdit
            alias={alias}
            url={url}
            editUrl={editUrl}
            setEditMode={setEditMode}
        />
    ) : (
        <ItemView
            alias={alias}
            url={url}
            isCopied={isCopied}
            setEditMode={setEditMode}
        />
    );
};

Item.propTypes = {
    alias: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isCopied: PropTypes.bool,
    editUrl: PropTypes.func.isRequired,
};
