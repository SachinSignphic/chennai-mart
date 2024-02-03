import React from "react";
import { useSelector } from "react-redux";

const categoriesData = () => {
    const categoriesData = useSelector((state) => state.categories.categories);
    return (
        categoriesData
    );
};

export default categoriesData;
