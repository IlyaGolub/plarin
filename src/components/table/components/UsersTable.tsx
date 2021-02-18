import React, { useEffect } from 'react'
import { RootState } from 'typesafe-actions'
import { useDispatch, useSelector } from 'react-redux'
import { Users } from 'Models'

import { loadUsersData, usersTableActions } from '../slice'
import { fromFetch } from 'rxjs/fetch'

const style = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '.5rem'
    }
}
export const UsersTable: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((s:RootState) => s.userTable.users);
    //  fromFetch();
    
    useEffect(()=>{
        dispatch(loadUsersData.request)
    },[])
  

    return (
        <div style={style.li}>
            <div>{users}</div>       
        </div>
    )
}