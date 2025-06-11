import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useProducts } from '../data/ProductContext';

import { Button, Modal } from "react-bootstrap";
import { useState } from 'react';
function CheckDeleteAlertModal({ show, handleClose, content, opt, onDeleteProduct, onDeletePost }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: '8px' }} />경고
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="primary" onClick={() => {
                    if (opt === 1 && onDeleteProduct) {
                        onDeleteProduct();
                        handleClose();
                    }
                    else if (opt === 2 && onDeletePost) {
                        onDeletePost();
                        handleClose();
                    }

                }}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default CheckDeleteAlertModal;