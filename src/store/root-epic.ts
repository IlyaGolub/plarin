import { combineEpics } from 'redux-observable';

import * as loadUsersDataEpic from '../components/table/epics';


export default combineEpics(
  ...Object.values(loadUsersDataEpic), 
);
