import { combineReducers } from "redux";
import  loadUsersDataReducer from "../components/table/reducer";
import loadUsersModalReducer from "../components/modal/reducer";


const rootReducer = combineReducers({
  userTable: loadUsersDataReducer,
  currentUser: loadUsersModalReducer,  
});

export default rootReducer;
