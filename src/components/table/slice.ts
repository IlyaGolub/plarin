import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestUser } from "Models";


const userTableSlice = createSlice({
    name: "usersTable",
    initialState: {
        users: [] as RequestUser[],
        loadRequest: false,
        loadrequestfail: false
    },
    reducers: {
        listSuccess(s, a) {
            s.users = a.payload.data;
        },
        Request(s, a:PayloadAction<boolean>) {
            s.loadRequest = a.payload;
        },
        Fail(s, a) {
            s.loadrequestfail = true;
        }
    }
});
export const usersTableReducer = userTableSlice.reducer;
export const usersTableActions = userTableSlice.actions;