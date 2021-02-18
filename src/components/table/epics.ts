
import { RootAction, RootState, isActionOf } from 'typesafe-actions';
import { Epic } from "redux-observable";
import { fromFetch } from 'rxjs/fetch';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadUsersData, usersTableActions } from './slice';


export const loadUsersDataEpic: Epic<
    RootAction,
    RootAction,
    RootState
> = (action$, state$) =>
        action$.pipe(
            filter(loadUsersData.request.match),
            switchMap(() =>
                fromFetch('https://reqres.in/api/users', {
                    mode: "cors",
                    credentials: "include",
                    method: "GET"
                }).pipe(
                    switchMap(response => {
                        if (response.ok)                     
                            return response.json();
                        
                        throw new Error();
                    }),
                    map(loadUsersData.success),
                    catchError(error => of(loadUsersData.failure()))
                ),
            )
        );