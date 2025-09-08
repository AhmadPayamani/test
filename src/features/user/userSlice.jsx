import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    user: null,
    token: (localStorage.getItem("token") !== null) ? localStorage.getItem("token") : null,
    access_routes: [],
    app_name: (localStorage.getItem("name") !== null) ? localStorage.getItem("name") : null,
    app_active: (localStorage.getItem("active") !== null) ? localStorage.getItem("active") : null
}; 
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload.user;
            state.access_routes = action.payload.access_routes;
            state.token = action.payload.token;
        },
        createUser: (state, action) => {
            state.user = action.payload.user;
            state.access_routes = action.payload.access_routes;
            state.token = action.payload.token;
        },
        deleteUser: (state) => {
            
            state.user = null;
            state.access_routes = null;
            state.token = null; 

        },
        // updatePageSize: (state, action) => {
        //     state.page_size = action.payload.page_size;
        // },
    },
});
// export const { createUser, deleteUser, getUser,updatePageSize } = userSlice.actions; 
export const { createUser, deleteUser, getUser } = userSlice.actions;
export default userSlice.reducer;