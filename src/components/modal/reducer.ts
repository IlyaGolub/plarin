import { createReducer } from "typesafe-actions";
import { loadUsersModalAsync } from "./actions";
import { RequestUser} from "Models";

const loadUsersModalReducer = createReducer({ users:{} as RequestUser, loadRequest: false, fail:""})
    .handleAction(loadUsersModalAsync.success, (state, action) => {
        return { ...state, isLoading: true, roles: [...action.payload.roles], actionButtons: [...action.payload.buttons] };
    })
    .handleAction(loadUsersModalAsync.request, (state, action) => {
        return { ...state, sendingToSm: true }
    })
  
    .handleAction(loadUsersModalAsync.failure, (state, action) => {
        return { ...state, sendingToSm: false };
    });

    export default loadUsersModalReducer;
    export type loadUsersModal = ReturnType<typeof loadUsersModalReducer>;