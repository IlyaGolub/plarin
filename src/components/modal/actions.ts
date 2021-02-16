import { createAsyncAction } from "typesafe-actions";
import { RequestUserModal } from "Models";

export const loadUsersModalAsync = createAsyncAction(
    'loadUsersModal/request',
    'loadUsersModal/success',
    'loadUsersModal/error'
)<undefined, RequestUserModal, undefined>();
