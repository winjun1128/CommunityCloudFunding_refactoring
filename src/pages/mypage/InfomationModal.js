import { Button, Row, Col } from "react-bootstrap";
import './InfomationModal.css';
import { useEffect, useState } from "react";

function InfomationModal({ show, onClose, infomation, setInfomation, asd }) {
    const [content, setContent] = useState('');

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    const handleChange = () => {
        const index = asd === '전화번호' ? 0 : 1;
        const updated = [...infomation];
        updated[index] = content;
        setInfomation(updated);
        onClose();
    };

    return (
        <div className="postwritemodal-backdrop" onClick={onClose}>
            <div className="postwritemodal-content" onClick={(e) => e.stopPropagation()}>
                <Row className="mb-3">
                    <Col md={6}><h5>현재 {asd}</h5></Col>
                    <Col md={6}><p>{infomation[asd === '전화번호' ? 0 : 1]}</p></Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}><h5>변경할 {asd}</h5></Col>
                    <Col md={6}>
                        <input
                            type="text"
                            className="form-control"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Button variant="primary" onClick={handleChange}>변경하기</Button>
                    </Col>
                    <Col md={6}>
                        <Button variant="secondary" onClick={onClose}>취소</Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default InfomationModal;