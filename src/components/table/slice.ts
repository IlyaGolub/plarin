import {createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  Users } from "Models";


const userTableSlice = createSlice({
    name: "usersTable",
    initialState: {
        users: [] as Users[],
        dataModal:{} as Users,
        loadRequest: false,
        loadrequestfail: false,
        openModal:false
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
        },
        ToggleModal(s,a:PayloadAction<boolean>) {
            s.openModal = a.payload
        },
        SetDataModal(s,a:PayloadAction<Users>) {
            s.dataModal = a.payload
        }
    }
});
export const usersTableReducer = userTableSlice.reducer;
export const usersTableActions = userTableSlice.actions;