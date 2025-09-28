import { FC, ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';

type AlertType = 1 | 2; // 1: 경고, 2: 성공

interface AlertModalProps {
  show: boolean;
  handleClose: () => void;
  content: ReactNode;
  opt: AlertType;
}

const AlertModal: FC<AlertModalProps> = ({ show, handleClose, content, opt }) => {
  const isWarn = opt === 1;

  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="alert-modal-title" centered>
      <Modal.Header closeButton>
        <Modal.Title id="alert-modal-title">
          {isWarn ? (
            <>
              <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: 8 }} />
              경고
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: 8 }} />
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
};

export default AlertModal;
