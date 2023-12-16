const initialState = {
    searchKey: "",
};

export default reducer = (state = initialState, { type, value }) => {
    switch (type) {
        case 'SEARCH_INPUT':
            return { ...state, searchKey: value };

        default:
            return state;
    }
};
