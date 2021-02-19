import React, { useEffect } from 'react'
import { RootState } from 'typesafe-actions'
import { useDispatch, useSelector } from 'react-redux'
import { usersTableActions } from '../slice'

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

    const func = () =>{
        {console.log(users)}
        return <div></div>    
    }
    useEffect(()=>{
        console.log("test1");
        dispatch(usersTableActions.Request(true));
    },[])
  

    return (
        <div style={style.li}>
           {func()}
        </div>
    )
}