import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestUser } from "Models";


export const loadUsersData = {
    request: createAction('loadUsersData/request'),
    success: createAction<RequestUser>('loadUsersData/success'),
    failure: createAction('loadUsersData/error')
};

const userTableSlice = createSlice({
    name: "usersTable",
    initialState: {
        users: [] as RequestUser[]
    },
    reducers: {
        listRequest(s, a) {
            s.users = a.payload.data;
        }
    }
});
export const usersTableReducer = userTableSlice.reducer;
export const usersTableActions = userTableSlice.actions;