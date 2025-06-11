import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';

import SellModal from './SellModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AlarmModal from './AlarmModal';

import './LogIn.css';
function LogIn() {
    const [alertContent,setAlertContent] = useState('로그인 먼저 하세요.');

    const [showAlertModal,setShowAlertModal] = useState(false);
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const [showSellModal, setShowSellModal] = useState(false);


    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [showAlarmModal, setShowAlarmModal] = useState(false);
    let [alarmCount, setAlarmCount] = useState(0);


    return (
        <div>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                    <Container fluid className="login-navbar-inner">
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
                                <div style={{
                                    height: '20px',
                                    borderLeft: '1px solid #ccc',
                                    margin: '0 10px'
                                }} />
                                <FontAwesomeIcon icon={faBell} style={{
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                }} onClick={() => {
                                    if (localStorage.getItem('id') != null) {
                                        alarmCount = alarmCount + 1;
                                        setAlarmCount(alarmCount);
                                        if (alarmCount % 2 == 1) {
                                            setShowAlarmModal(true);
                                        } else {
                                            setShowAlarmModal(false);
                                        }
                                    }
                                    else
                                        setShowAlertModal(true);
                                }} />
                                <div style={{
                                    height: '20px',
                                    borderLeft: '1px solid #ccc',
                                    margin: '0 10px'
                                }} />
                                <Nav.Link onClick={() => {
                                    if (localStorage.getItem('id') != null)
                                        setShowSellModal(true);
                                    else{
                                        setAlertContent('로그인 먼저 하세요.');
                                        setShowAlertModal(true);
                                    }
                                }}>펀딩신청</Nav.Link>
                            </Nav>
                            <AlarmModal show={showAlarmModal} onClose={() => setShowAlarmModal(false)} handleClose={() => setShowAlarmModal(false)} content="로그인 먼저 하세요." opt={1}></AlarmModal>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className='login-main'>
                <div className='login_container'>
                    <div>
                        <div className='login-title'>
                            <h1>Funders</h1>
                        </div>
                        <form className='login_form'>
                            <h2>로그인</h2>
                            <div className="form-group">
                                <label htmlFor="userid">아이디</label>
                                <input
                                    type="text"
                                    id="userid"
                                    name="userid"
                                    value={userid}
                                    onChange={(e) => setUserid(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">비밀번호</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="buttons">
                                <button type="button" onClick={() => navigate("/sign")}>
                                    회원가입
                                </button>
                               <button type="submit" onClick={(e) => {
                                    e.preventDefault();
                                    if(userid.trim()===''||password.trim()===''){
                                        setAlertContent('아이디와 비밀번호를 입력하세요!');
                                        setShowAlertModal(true);
                                        return;
                                    }
                                    localStorage.setItem('id', userid);
                                    setMessage('로그인 성공');
                                    navigate("/");
                                }}>로그인</button>
                            </div>
                        </form>
                    </div>
                    <p className="login-p" style={{ color: message === '로그인 성공' ? 'green' : 'red' }}>{message}</p>
                </div>
            </main>
            <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content={alertContent} opt={1}></AlertModal>
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} ></SellModal>
        </div>
    )
}
export default LogIn;