
import { RootAction, RootState, isActionOf } from 'typesafe-actions';
import { Epic } from "redux-observable";
import { fromFetch } from 'rxjs/fetch';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadUsersModalAsync } from './actions';


export const loadUsersModalEpic: Epic<
    RootAction,
    RootAction,
    RootState
> = (action$, state$) =>
        action$.pipe(
            filter(isActionOf(loadUsersModalAsync.request)),
            switchMap(() =>
                fromFetch('https://reqres.in/api/users/${id}', {
                    mode: "cors",
                    credentials: "include"
                }).pipe(
                    switchMap(response => {
                        if (response.ok)
                            return response.json();

                        throw new Error();
                    }),
                    map(loadUsersModalAsync.success),
                    catchError(error => of(loadUsersModalAsync.failure()))
                ),
            )
        );