import { combineReducers } from "redux";
import { usersTableReducer } from "../components/table/slice";

// import loadUsersModalReducer from "../components/modal/reducer";


const rootReducer = combineReducers({
  userTable: usersTableReducer  
});

export default rootReducer;
