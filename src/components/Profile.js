import { useState } from "react";
import { Col, Image, Button } from "react-bootstrap";
import basic from '../images/basic.JPG';
import InfomationModal from "./InfomationModal";
import BirthDayModal from "./BirthDayModal";
import DeliveryModal from "./DeliveryModal";
import PrivacyModal from "./PrivacyModal";

function Profile({ showInfo, setShowInfo }) {
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [infomation, setInfomation] = useState(['010-1234-5678', 'asdf1234@naver.com']);
    const [asd, setAsd] = useState('');

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    return (
        <div>
            <div className='profileBox'>
                <p className="text-muted">기본정보</p>
                <hr />
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex gap-3 align-items-center'>
                        <Image src={basic} roundedCircle width={60} height={60} />
                        <div>
                            <h5>한주승</h5>
                            <p className="text-muted">{infomation[1]}</p>
                        </div>
                    </div>
                    <Button className='profile-imgChange' variant="secondary">사진 수정</Button>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>📞 {infomation[0]}</span>
                    <Button variant="secondary" onClick={() => { setShowPhoneModal(true); setAsd('전화번호'); }}>수정</Button>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>✉ {infomation[1]}</span>
                    <Button variant="secondary" onClick={() => { setShowPhoneModal(true); setAsd('이메일'); }}>수정</Button>
                </div>
                <InfomationModal show={showPhoneModal} asd={asd} onClose={() => setShowPhoneModal(false)} infomation={infomation} setInfomation={setInfomation} />
            </div>

            <br />
            <div className='profileBox'>
                <p>부가 정보 관리</p>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>생일 관리</span>
                    <Button variant="secondary" onClick={() => setShowInfo(true)}>확인</Button>
                    <BirthDayModal show={showInfo} setShowInfo={setShowInfo} closeModal={() => setShowInfo(false)} />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>배송지 관리</span>
                    <Button variant="secondary" onClick={() => setShowAddressModal(true)}>확인</Button>
                    <DeliveryModal
                        show={showAddressModal}
                        closeModal={() => setShowAddressModal(false)}
                        title="배송지 관리"
                        list={[
                            "서울시 강남구 역삼동 123-45",
                            "서울시 송파구 잠실동 456-78",
                            "서울시 서초구 서초동 789-12"
                        ]}
                    />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span>개인정보 이용내역</span>
                    <Button variant="secondary" onClick={() => setShowPrivacyModal(true)}>확인</Button>
                    <PrivacyModal
                        show={showPrivacyModal}
                        closeModal={() => setShowPrivacyModal(false)}
                    />
                </div>
            </div>
            <br />
            <Button className='exit-member' variant="danger" onClick={() => {
                prompt("정말 회원탈퇴 하시겠습니까? (원하시면 '회원탈퇴'를 입력해주세요)");
            }}>회원탈퇴</Button>
        </div>
    );
}

export default Profile;