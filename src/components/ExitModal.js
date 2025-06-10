import { Modal, Button } from "react-bootstrap";

function ExitModal({ show, onClose, onConfirm }) {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>회원탈퇴 유의사항</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-danger fw-bold mb-3">
                    탈퇴 후에는 복구가 불가능하며, 관련 데이터는 모두 삭제됩니다.
                </p>
                <ul className="text-muted small">
                    <li>참여한 프로젝트, 위시리스트 정보가 삭제됩니다.</li>
                    <li>후원 내역 및 배송 정보도 복원되지 않습니다.</li>
                    <li>동일 아이디로 재가입 시 정보는 이전되지 않습니다.</li>
                </ul>
                <p className="mt-3">정말 탈퇴하시겠습니까?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>취소</Button>
                <Button variant="danger" onClick={onConfirm}>회원탈퇴</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ExitModal;