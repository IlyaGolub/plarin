import React, { useEffect } from 'react'
import { RootState } from 'typesafe-actions'
import { useDispatch, useSelector } from 'react-redux'
import { usersTableActions } from '../slice'
import './UserTable.css'
import { Container, Row, Col, Pagination } from 'react-bootstrap'


export const UsersTable: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((s: RootState) => s.userTable.users);


    useEffect(() => {
        dispatch(usersTableActions.Request(true));
    }, [])

    return (
        <Container>
            <Row className={"TableUsers justify-content-md-center"}>
                {users.map((elem, index) => {
                    return <Col  key={index} className={"UserCard"}>
                        <img width={64} height={64} src={`${elem.avatar}`} alt={"Loading img"} />
                        <div>{elem.first_name} {elem.last_name}</div>
                        <div>{elem.email}</div>
                    </Col>
                })}
                <Pagination>{users.length}</Pagination>
            </Row>
        </Container>
    )
}