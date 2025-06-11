import { Container, Navbar, Nav, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import './Mypage.css';
import basic from '../images/basic.JPG';
import Profile from './Profile';
import MyProject from './MyProject';
import Spon from './Spon';
import Wishlist from './Wishlist';
import { useState } from 'react';
import SellModal from '../pages/SellModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'
import AlarmModal from '../pages/AlarmModal';
import AlertModal from '../pages/AlertModal';

function Mypage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showInfo, setShowInfo] = useState(false);
    const currentPath = location.pathname;

    const [searchKeyword, setSearchKeyword] = useState('');
    const [showSellModal, setShowSellModal] = useState(false);
    const [showId, setShowId] = useState(false);

    const [showAlertModal, setShowAlertModal] = useState(false);

    const [showAlarmModal, setShowAlarmModal] = useState(false);
    let [alarmCount, setAlarmCount] = useState(0);

    return (
        <div className='all-container'>
            <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                <Container fluid className="mypage-navbar-inner">
                    <Navbar.Brand as={Link} to="/" className='header-font'>Funders</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="ms-auto align-items-center" navbarScroll>
                            <Nav.Link as={Link} to="/list" className="me-3">후원하기</Nav.Link>
                            <Form className="d-flex me-3">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <Button variant="outline-success" onClick={() => navigate(`/list?keyword=${encodeURIComponent(searchKeyword)}`)}>
                                    Search
                                </Button>
                            </Form>
                            <Nav.Link as={Link} to={localStorage.getItem('id') ? '/mypage' : '/login'}>
                                {localStorage.getItem('id') || '로그인'}
                            </Nav.Link>
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
                                if (localStorage.getItem('id')) setShowSellModal(true);
                                else alert('로그인 하세요');
                            }}>펀딩신청</Nav.Link>
                        </Nav>
                        <AlarmModal show={showAlarmModal} onClose={() => setShowAlarmModal(false)} handleClose={() => setShowAlarmModal(false)} content="로그인 먼저 하세요." opt={1}></AlarmModal>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                <Container className='mypage-main-container'>
                    <Row>
                        <Col md={3} className="sidebar p-4">
                            <div className="text-center mb-4">
                                <Image src={basic} roundedCircle width={100} height={100} />
                                <h5 className="mt-3">{localStorage.getItem('id')}</h5>
                                <p className="text-muted">abcd****@naver.com</p>
                            </div>
                            <Nav className="flex-column">
                                <Nav.Link onClick={() => navigate("/mypage/profile")} className={currentPath === '/profile' ? 'active-menu' : ''}>프로필</Nav.Link>
                                <Nav.Link onClick={() => navigate("/mypage/myproject")} className={currentPath === '/myproject' ? 'active-menu' : ''}>내 프로젝트</Nav.Link>
                                <Nav.Link onClick={() => navigate("/mypage/spon")} className={currentPath === '/spon' ? 'active-menu' : ''}>후원한 프로젝트</Nav.Link>
                                <Nav.Link onClick={() => navigate("/mypage/wishlist")} className={currentPath === '/wishlist' ? 'active-menu' : ''}>위시리스트</Nav.Link>
                            </Nav>
                            <Button variant="danger" className="logout-btn" onClick={() => {
                                localStorage.removeItem("id");
                                setShowId(true);
                                navigate("/");
                            }}>로그아웃</Button>
                        </Col>
                        <Col md={9} className="p-4">
                            <Routes>
                                <Route path="/profile" element={<Profile showInfo={showInfo} setShowInfo={setShowInfo} />} />
                                <Route path="/myproject" element={<MyProject />} />
                                <Route path="/spon" element={<Spon />} />
                                <Route path="/wishlist" element={<Wishlist />} />
                                <Route path="*" element={<Profile showInfo={showInfo} setShowInfo={setShowInfo} />} />
                            </Routes>
                        </Col>
                    </Row>
                </Container>
            </main>

            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} />
        </div>
    );
}

export default Mypage;
