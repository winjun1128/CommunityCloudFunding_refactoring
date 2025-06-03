import { Container, Navbar, Nav, Button, Form, Row, Col, Image } from 'react-bootstrap';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './Mypage.css';
import basic from '../images/basic.JPG';
import Profile from './Profile';
import MyProject from './MyProject';
import Spon from './Spon';
import Wishlist from './Wishlist';
import { useState } from 'react';

function Mypage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showInfo, setShowInfo] = useState(false);
    const currentPath = location.pathname;

    return (
        <div className='all-container'>
            <Navbar expand="lg" className="bg-body-tertiary" fixed='top' style={{ boxShadow: '5px 5px 5px gray' }}>
                <Container fluid>
                    <Navbar.Brand href="#">로고</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                            <Nav.Link href="#action1">후원하기</Nav.Link>
                            <Form className="d-flex mx-2">
                                <Form.Control type="search" placeholder="Search" className="me-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Nav.Link href="#action2">마이페이지</Nav.Link>
                            <Nav.Link href="#action3">펀딩신청</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid className="mypage">
                <Row>
                    <Col md={3} className="sidebar p-4 border-end position-relative">
                        <div className="text-center mb-4">
                            <Image src={basic} roundedCircle width={100} height={100} />
                            <h5 className="mt-3">한주승</h5>
                            <p className="text-muted">abcd****@naver.com</p>
                        </div>

                        <Nav className="flex-column">
                            <Nav.Link onClick={() => navigate("/profile")} className={currentPath === '/profile' ? 'active-menu' : ''}>프로필</Nav.Link>
                            <Nav.Link onClick={() => navigate("/myproject")} className={currentPath === '/myproject' ? 'active-menu' : ''}>내 프로젝트</Nav.Link>
                            <Nav.Link onClick={() => navigate("/spon")} className={currentPath === '/spon' ? 'active-menu' : ''}>후원한 프로젝트</Nav.Link>
                            <Nav.Link onClick={() => navigate("/wishlist")} className={currentPath === '/wishlist' ? 'active-menu' : ''}>위시리스트</Nav.Link>
                        </Nav>

                        <Button variant="danger" className="logout-btn">로그아웃</Button>
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
        </div>
    );
}

export default Mypage;