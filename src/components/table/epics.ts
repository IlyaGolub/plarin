
import { RootAction, RootState } from 'typesafe-actions';
import { Epic } from "redux-observable";
import { fromFetch } from 'rxjs/fetch';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { usersTableActions } from './slice';


export const loadUsersDataEpic: Epic<
    RootAction,
    RootAction,
    RootState
> = (action$, state$) =>
        action$.pipe(
            filter(usersTableActions.Request.match),
            switchMap(() =>
                fromFetch('https://reqres.in/api/users', {   
                    method: "GET"
                }).pipe(
                    switchMap(response => {                    
                        if (response.ok) 
                            return response.json();
                                                    
                        throw new Error();
                    }),
                    map(usersTableActions.listSuccess),
                    catchError(error => of(usersTableActions.Fail))
                ),
            )
        );

