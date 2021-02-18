import { createReducer } from "typesafe-actions";
import { loadUsersData } from "./slice";
import { RequestUser} from "Models";


const loadUsersDataReducer = createReducer({ users:{} as RequestUser, loadRequest: false})
    .handleAction(loadUsersData.success, (state, action) => {
        return { ...state, users:{...action.payload}};
    })
    .handleAction(loadUsersData.request, (state) => {
        return { ...state, loadRequest: true }
    })   
    .handleAction(loadUsersData.failure, (state) => {
        return { ...state, loadRequest: false };
    }); 

    export default loadUsersDataReducer;
    export type loadUsersData = ReturnType<typeof loadUsersDataReducer>;