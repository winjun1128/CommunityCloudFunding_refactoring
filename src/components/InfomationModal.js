import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";

function InfomationModal({ show, onClose, infomation, setInfomation, asd }) {
    const [content, setContent] = useState('');

    useEffect(() => {
    if (show) {
        setContent(''); // 항상 빈칸으로 초기화
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => {
        document.body.style.overflow = 'auto';
    };
}, [show]);

    if (!show) return null;

    const handleChange = () => {
        if (content.trim() === '') {
            alert(`${asd}를 입력해주세요.`);
            return;
        }
        const index = asd === '전화번호' ? 0 : 1;
        const updated = [...infomation];
        updated[index] = content.trim();
        setInfomation(updated);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{asd} 수정</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>현재 {asd}</Form.Label>
                    <Form.Control value={infomation[asd === '전화번호' ? 0 : 1]} readOnly />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>변경할 {asd}</Form.Label>
                    <Form.Control
                        type={asd === '전화번호' ? "tel" : "email"}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={`${asd}를 입력하세요`}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>취소</Button>
                <Button variant="primary" onClick={handleChange}>변경하기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default InfomationModal;

