import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

function PrivacyModal({ show, closeModal }) {
    const privacyList = [
        {
            label: "회원가입 정보 제공 동의",
            description: "본 서비스 이용을 위한 필수정보 제공 동의입니다."
        },
        {
            label: "마케팅 정보 수신 동의",
            description: "이벤트, 프로모션 정보를 수신합니다."
        },
        {
            label: "개인정보 3자 제공 동의",
            description: "제휴사 제공 동의가 포함됩니다."
        }
    ];

    const [openIndexes, setOpenIndexes] = useState([]);

    const toggleDescription = (index) => {
        setOpenIndexes(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>개인정보 이용내역</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {privacyList.map((item, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <div
                            style={{ cursor: 'pointer', fontWeight: 'bold' }}
                            onClick={() => toggleDescription(index)}
                        >
                            {item.label}
                        </div>
                        {openIndexes.includes(index) && (
                            <div style={{ marginLeft: '20px', marginTop: '5px', color: '#555' }}>
                                {item.description}
                            </div>
                        )}
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>닫기</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PrivacyModal;