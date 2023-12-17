// import { createStore } from "react-redux";
// import globalAppReducer from "./reducers";

// export default () => createStore(globalAppReducer);
// above is older boilerplatey code for redux


// ignore the two folders in this directory


//below is official recommended toolkit way

import { configureStore } from "@reduxjs/toolkit";
import homeSearch from "./homeSearch";
import homeCategory from "./homeCategory";

export default configureStore({
    reducer: {
        homeSearch: homeSearch,
        homeCategory: homeCategory
    }
});
