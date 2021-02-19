import React, { useEffect, useState } from 'react'
import { RootState } from 'typesafe-actions'
import { useDispatch, useSelector } from 'react-redux'
import { usersTableActions } from '../slice'
import './UserTable.css'
import { Container, Row, Col } from 'react-bootstrap'
import Pagination from '../../../feachers/Pagination'
import { ReactComponent as Plus } from '../../../feachers/plus.svg';
import { Users } from 'Models'
import { ModalUsers } from '../../modal/Modal'



export const UsersTable: React.FC = () => {
    const dispatch = useDispatch();
    const users = useSelector((s: RootState) => s.userTable.users);

    useEffect(() => {
        dispatch(usersTableActions.Request(true));
    }, [])

    const openModal = (user: Users) => {
        fetch(`https://reqres.in/api/users/${user.id}`, {
            method: "GET"
        })
            .then(res => res.json().then(
                (result) => {
                    dispatch(usersTableActions.SetDataModal((result.data)))
                }
            ))
            .then(() => {
                console.log()
                dispatch(usersTableActions.ToggleModal(true));
            });
    };

    return (
        <Container>
            <Row className={"TableUsers justify-content-md-center"}>
                {users.map((elem, index) => {
                    return <Col key={index} className={"UserCard"} onClick={() => openModal(elem)}>
                        <img width={64} height={64} src={`${elem.avatar}`} alt={"Loading img"} />
                        <div>{elem.first_name} {elem.last_name}</div>
                        <div>{elem.email}</div>
                    </Col>
                })}
            </Row>
            <Pagination
                totalRecords={users.length}
                pageLimit={15}
                pageNeighbours={2}
            ></Pagination>            
            <ModalUsers />
        </Container>
    )
}