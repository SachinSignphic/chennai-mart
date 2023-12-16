import { combineReducers } from "redux";
import homeSearchReducer from "./homeSearch.reducer";

const globalAppReducer = combineReducers({
    homeSearch: homeSearchReducer, 
});

export default globalAppReducer;