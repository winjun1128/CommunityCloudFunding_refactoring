import { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from 'react-bootstrap';

function BirthDayModal({ show, closeModal }) {
    const [isBirthdayPublic, setIsBirthdayPublic] = useState(true);
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    const toggleBirthdayPublic = () => setIsBirthdayPublic(prev => !prev);

    const saveBirthdaySetting = () => {
        if (month === '' || day === '') {
            alert("생일을 입력해주세요.");
            return;
        }
        console.log("생일:", `${month}월 ${day}일`);
        console.log("공개여부:", isBirthdayPublic);
        closeModal();
    };

    return (
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>내 생일</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Col>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    placeholder="월"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    min="1"
                                    max="12"
                                />
                                <InputGroup.Text>월</InputGroup.Text>
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    placeholder="일"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    min="1"
                                    max="31"
                                />
                                <InputGroup.Text>일</InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <strong>생일 공개 설정</strong>
                            <p style={{ fontSize: '14px', color: '#666' }}>내 생일을 친구에게 알려줍니다.</p>
                        </div>
                        <Form.Check
                            type="switch"
                            id="birthday-switch"
                            checked={isBirthdayPublic}
                            onChange={toggleBirthdayPublic}
                        />
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>취소</Button>
                <Button variant="primary" onClick={saveBirthdaySetting}>저장</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BirthDayModal;