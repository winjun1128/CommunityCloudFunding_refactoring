import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'react-bootstrap';

type AlertKind = 1 | 2; // 1: Product 삭제, 2: Post 삭제

interface CheckDeleteAlertModalProps {
  show: boolean;
  handleClose: () => void;
  content: React.ReactNode;
  opt: AlertKind;
  onDeleteProduct?: () => void;
  onDeletePost?: () => void;
}

const CheckDeleteAlertModal: FC<CheckDeleteAlertModalProps> = ({
  show,
  handleClose,
  content,
  opt,
  onDeleteProduct,
  onDeletePost,
}) => {
  const handleConfirm = () => {
    if (opt === 1 && onDeleteProduct) onDeleteProduct();
    else if (opt === 2 && onDeletePost) onDeletePost();
    handleClose();
  };

  const confirmDisabled =
    (opt === 1 && !onDeleteProduct) || (opt === 2 && !onDeletePost);

  return (
    <Modal show={show} onHide={handleClose} centered aria-labelledby="confirm-delete-title">
      <Modal.Header closeButton>
        <Modal.Title id="confirm-delete-title">
          <FontAwesomeIcon icon={faTriangleExclamation} style={{ marginRight: 8 }} />
          경고
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{content}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="primary" onClick={handleConfirm} disabled={confirmDisabled}>
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckDeleteAlertModal;
