
import { RootAction, RootState, isActionOf } from 'typesafe-actions';
import { Epic } from "redux-observable";
import { fromFetch } from 'rxjs/fetch';
import { filter, switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadUsersDataAsync} from './actions';

export const loadUsersDataEpic: Epic<
    RootAction,
    RootAction,
    RootState
> = (action$, state$) =>
        action$.pipe(
            filter(isActionOf(loadUsersDataAsync.request)),
            switchMap(() =>
                fromFetch('https://reqres.in/api/users', {
                    mode: "cors",
                    credentials: "include"
                }).pipe(
                    switchMap(response => {
                        if (response.ok)
                            return response.json();

                        throw new Error();
                    }),
                    map(loadUsersDataAsync.success),
                    catchError(error => of(loadUsersDataAsync.failure()))
                ),
            )
        );