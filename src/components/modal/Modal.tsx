import { Users } from 'Models';
import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { usersTableActions } from '../table/slice';


export const ModalUsers: React.FC = () => {
    const { openModal, dataModal } = useSelector((s: RootState) => s.userTable)
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(usersTableActions.ToggleModal(!openModal))
    };  

    return (
        <>
            <Modal show={openModal} onHide={handleClick}>
                <Modal.Header closeButton>
                    <Modal.Title>{`${dataModal.first_name} ${dataModal.last_name}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <Row>
                        <Col md={3}>
                            <label >first_name</label>
                        </Col>
                        <Col md={7}>
                            <img
                                src={`${dataModal.avatar}`}
                                width={64}
                                height={64}
                                alt={"Loadind Image"}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <label >first_name</label>
                        </Col>
                        <Col md={7}>
                            <input type="text" readOnly value={dataModal.first_name} />                            
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <label >last_name</label>
                        </Col>
                        <Col md={7}>
                            <input type="text" readOnly value={dataModal.last_name} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <label >email</label>
                        </Col>
                        <Col md={7}>
                            <input type="text" readOnly value={dataModal.email} />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClick}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}