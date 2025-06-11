import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { Button, Modal } from "react-bootstrap";
function AlertModal({ show, handleClose, content, opt }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {opt == 1 ? (
                        <>
                            <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: '8px' }} />
                            경고
                        </>
                    ) : (
                        <>
                            <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '8px' }} />
                            성공
                        </>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    확인
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AlertModal;