import { createReducer } from "typesafe-actions";
import { loadUsersDataAsync } from "./actions";
import { RequestUser} from "Models";


const loadUsersDataReducer = createReducer({ users:{} as RequestUser, loadRequest: false, fail:""})
    .handleAction(loadUsersDataAsync.success, (state, action) => {
        return { ...state, users:{...action.payload}};
    })
    .handleAction(loadUsersDataAsync.request, (state) => {
        return { ...state, loadRequest: true }
    })   
    .handleAction(loadUsersDataAsync.failure, (state: any) => {
        return { ...state, loadRequest: false };
    });

    export default loadUsersDataReducer;
    export type loadUsersData = ReturnType<typeof loadUsersDataReducer>;