import React from 'react'
import {RootState} from 'typesafe-actions'
import {useSelector} from 'react-redux'
import {Users} from 'Models'
import {UserModal} from '../../modal/components/UserModal'

const style={
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
    const users = useSelector<RootState, Users[]>(s=>s.userTable.users.data)


    return (
        <div style={style.li}>
            <>

            </>
            <UserModal/>
        </div>
    )
}