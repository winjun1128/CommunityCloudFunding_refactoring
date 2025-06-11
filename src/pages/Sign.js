import { Navigate, useNavigate, Link } from 'react-router-dom';
import './Sign.css'
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import SellModal from './SellModal';
import AlertModal from './AlertModal';
function Sign() {
    const [alertContent, setAlertContent] = useState('로그인 먼저 하세요.');

    const [showAlertModal, setShowAlertModal] = useState(false);
    const [phone, setPhone] = useState('');
    const [agree, setAgree] = useState(false);
    const [agree2, setAgree2] = useState(false);

    const [userId, setUserId] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userPassChk, setUserPassChk] = useState('');

    const [searchKeyword, setSearchKeyword] = useState('');
    const [showSellModal, setShowSellModal] = useState(false);
    const navigate = useNavigate();
    return (
        <div>
            <div className='sign-header-container'>
                <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                    <Container fluid className="sign-navbar-inner">
                        <Navbar.Brand as={Link} to="/" className='header-font'>Funders</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto align-items-center" navbarScroll>
                                <Nav.Link as={Link} to="/list" className='me-3'>
                                    후원하기
                                </Nav.Link>
                                <Form className="d-flex me-3">
                                    <Form.Control type="search" placeholder="Search" className="me-2" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                    <Button variant="outline-success" onClick={() => navigate(`/list?keyword=${encodeURIComponent(searchKeyword)}`)}>
                                        Search
                                    </Button>
                                </Form>
                                <Nav.Link as={Link} to={localStorage.getItem('id') == null ? '/login' : '/mypage'}>{localStorage.getItem('id') == null ? '로그인' : localStorage.getItem('id')}</Nav.Link>
                                <Nav.Link onClick={() => {
                                    if (localStorage.getItem('id') != null)
                                        setShowSellModal(true);
                                    else {
                                        setAlertContent('로그인 먼저 하세요.');
                                        setShowAlertModal(true);
                                    }

                                }}>펀딩신청</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div class="sign-container">
            <h1 className='header-font'>Funders</h1>
                <div class="form-wrapper">
                    <div class="sign-header-container">
                        <h2>회원가입</h2>
                    </div>

                    <div class="SignContainer">
                        <div class="SignInputBox">
                            <label for='userId'>아이디</label>
                            <input
                                id='userId'
                                type="text"
                                placeholder="아이디"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>

                        <div class="SignInputBox">
                            <label for='userPw'>비밀번호</label>
                            <input
                                id='userPw'
                                type="password"
                                placeholder="비밀번호"
                                value={userPass}
                                onChange={(e) => setUserPass(e.target.value)}
                                required
                            />
                        </div>

                        <div class="SignInputBox">
                            <label for='userPwChk'>비밀번호 확인</label>
                            <input
                                id='userPwChk'
                                type="password"
                                placeholder="비밀번호 확인"
                                value={userPassChk}
                                onChange={(e) => setUserPassChk(e.target.value)}
                                required
                            />
                        </div>

                        <div class="SignInputBox">
                            <label for='userName'>이름</label>
                            <input id='userName' type="text" placeholder="이름" />
                        </div>

                        <div class="SignInputBox">
                            <label for='userPn'>전화번호</label>
                            <input id='userPn' type="tel" value={phone} onChange={(e) => {
                                const onlyNumber = e.target.value.replace(/[^0-9\-]/g, '');
                                setPhone(onlyNumber);
                            }} placeholder='010-1234-5678' />
                        </div>

                        <div class="SignInputBox">
                            <label for='userAddr'>주소</label>
                            <input id='userAddr' type="text" placeholder="주소" />
                        </div>

                        <div class="agree-section">
                            <label><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} /> 개인정보 수집 및 이용 (필수)</label>
                            <label><input type="checkbox" checked={agree2} onChange={(e) => setAgree2(e.target.checked)} /> 사이트 이용 약관 (필수)</label>
                            <label><input type="checkbox" /> 위치기반 서비스 이용 (선택)</label>
                        </div>

                        <div class="warning">
                            ※ 필수 약관 미 동의 시 회원가입 불가능
                        </div>

                        <div class="button-group">
                            <button class="cancel">취소</button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                if (userId.trim() === '' || userPass.trim() === '') {
                                    setAlertContent('아이디와 비밀번호를 입력해주세요!');
                                    setShowAlertModal(true);
                                    return;
                                }
                                if (userPass.trim() !== userPassChk.trim()) {
                                    setAlertContent('비밀번호가 다릅니다.!');
                                    setShowAlertModal(true);
                                    return;
                                }
                                if (!agree || !agree2) {
                                    setAlertContent('필수약관 동의해주세요.!');
                                    setShowAlertModal(true);
                                    return;
                                }
                                navigate("/login");
                            }}>가입</button>
                        </div>
                    </div>
                </div>
            </div>
            <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content={alertContent} opt={1}></AlertModal>
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} ></SellModal>
        </div>
    );
}

export default Sign;