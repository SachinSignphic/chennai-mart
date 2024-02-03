import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        userId: '',
        userName: '',
    },
    reducers: {
        setUser: (state, action) => {
            state.userId = action.payload.userId;
            state.userName = action.payload.userName;
        },
        removeUser: (state, action) => {
            state = null;
        }
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;