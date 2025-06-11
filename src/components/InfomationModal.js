import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import './InfomationModal.css';
import AlertModal from '../pages/AlertModal';

function InfomationModal({ show, onClose, infomation, setInfomation, asd }) {
    const [chkCount,setChkCount] = useState(0);
    const [alertOpt,setAlertOpt] = useState(1);
    const [showAlertModal,setShowAlertModal] = useState(false);
    const [alertContent,setAlertContent] = useState('전화번호를 입력하세요.');
    const [content, setContent] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [isAuthSent, setIsAuthSent] = useState(false);

    useEffect(() => {
        if (show) {
            setContent('');
            setAuthCode('');
            setIsAuthSent(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    const handleSendAuth = () => {
        if (content.trim() === '') {
            //alert(`${asd}를 입력해주세요.`);
            setAlertContent(`${asd}를 입력해주세요.`);
            setAlertOpt(1);
             setChkCount(1);
            setShowAlertModal(true);
            return;
        }
        setIsAuthSent(true);
        //alert('인증번호가 전송되었습니다.');
        setAlertContent('인증번호가 전송되었습니다.');
        setAlertOpt(2);
    
        setShowAlertModal(true);
    };

    const handleChange = () => {
        if (authCode.trim() === '') {
            //alert('인증번호를 입력해주세요.');
            setAlertContent('인증번호를 입력하세요.');
            setAlertOpt(1);
            setChkCount(3);
            setShowAlertModal(true);
            return;
        }
        const index = asd === '전화번호' ? 0 : 1;
        const updated = [...infomation];
        updated[index] = content.trim();
        setInfomation(updated);
        
        setAlertContent('수정 되었습니다.');
        setAlertOpt(2);
        setChkCount(4);
        setShowAlertModal(true);
    
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title as="div" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                    <strong>{localStorage.getItem('id')}님</strong>의 회원정보 중&nbsp;
                    <span style={{ color: '#198754', fontWeight: '500' }}>{asd}</span>를
                    <div>수정하기 위해 인증 절차가 필요합니다.</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><i className="bi bi-phone" /> 현재: {infomation[asd === '전화번호' ? 0 : 1]}</p>
                <Form.Group className="mb-3">
                    <Form.Label>{asd}</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="tel"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`${asd} 입력`}
                        />
                        <Button onClick={handleSendAuth}>인증</Button>
                    </InputGroup>
                </Form.Group>
                {isAuthSent && (
                    <Form.Group>
                        <Form.Label>인증번호 입력</Form.Label>
                        <Form.Control
                            type="text"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            placeholder="인증번호 입력"
                        />
                    </Form.Group>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>취소</Button>
                <Button variant="primary" onClick={handleChange}>변경</Button>
            </Modal.Footer>
            <AlertModal show={showAlertModal} handleClose={()=>{
                    if(chkCount<4){
                       setShowAlertModal(false);
                    }
                    else{
                        setShowAlertModal(false);
                        setChkCount(0);
                        onClose();
                    } 
            }} content={alertContent} opt={alertOpt}></AlertModal>
        </Modal>
    );
}

export default InfomationModal;