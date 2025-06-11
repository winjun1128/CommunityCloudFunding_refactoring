import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
function AlarmModal({ show, handleClose, content, opt, onClose }) {

    const navigate = useNavigate();

    if (!show) return null;
    
    return (
        <div style={{
            position: 'absolute',
            right: 0,
            top: '40px',
            width: '300px',
            height: '400px',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            zIndex: 999,
            padding: '20px',
        }}>
            <h5 style={{ marginBottom: '20px' }}>알림</h5>
            <div>
                <div style={{cursor:'pointer'}} onClick={()=>navigate("/community/15")}>
                    🔔국내산 수박을 그대로 짜낸 수박 100% 주스의 공지가 추가되었습니다.
                </div>
                <hr></hr>
                <div style={{cursor:'pointer'}} onClick={()=>navigate("/community/13")}>
                    🔔특허받은 떡볶이! 맛없으면 환불하세요! 쫀득한 특허 쉐킷 떡볶이의 공지가 추가되었습니다.
                </div>
                <hr></hr>
                <div style={{cursor:'pointer'}} onClick={()=>navigate("/community/2")}>
                    🔔벗겨지지 않아 믿고 쓸 수 있는 #쿠자 믹싱볼 세트의 공지가 추가되었습니다.
                </div>
            </div>
        </div>
    );
}

export default AlarmModal;