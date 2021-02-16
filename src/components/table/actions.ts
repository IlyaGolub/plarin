import { createAsyncAction } from "typesafe-actions";
import { RequestUser} from "Models";

export const loadUsersDataAsync = createAsyncAction(
    'loadUsersData/request',
    'loadUsersData/success',
    'loadUsersData/error'
)<undefined, RequestUser, undefined>();
