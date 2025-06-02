import './BirthDayModal.css';
import { useEffect, useState } from "react";
import {Button} from 'react-bootstrap'

function BirthDayModal({ show, closeModal }) {
    const [isBirthdayPublic, setIsBirthdayPublic] = useState(true);

    const toggleBirthdayPublic = () => setIsBirthdayPublic(prev => !prev);

    const saveBirthdaySetting = () => {
        // 저장 로직 추가
        console.log("공개여부:", isBirthdayPublic);
        // closeModal(); // 모달 닫기
    };

    // 모달 열릴 때 body 스크롤 막기
    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;


    return (
        <div className="modal">
            <div className="modal-content">

                {/* 생일 입력 안내 */}
                <label>내 생일</label>

                {/* 생일 입력 (예: 01월 19일) */}
                <h2 style={{ fontSize: '24px', marginTop: '10px' }}>01월 19일</h2>

                {/* 생일 공개 설정 */}
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <strong>생일 공개 설정</strong>
                        <p style={{ fontSize: '14px', color: '#666' }}>내 생일을 친구에게 알려줍니다.</p>
                    </div>
                    <label className="switch">
                        <input type="checkbox" checked={isBirthdayPublic} onChange={toggleBirthdayPublic} />
                        <span className="slider round"></span>
                    </label>
                </div>

                {/* 확인 버튼 누르면 닫기*/}
                <Button variant="secondary" onClick={closeModal}>확인</Button>
            </div>
        </div>
    );
}

export default BirthDayModal;