import {
    Container, Navbar, Nav, Button, Form, Row, Col, Image
} from 'react-bootstrap';
import './Mypage.css';
import basic from '../../images/basic.JPG';
import { useState } from "react";
import ProjectCard from './ProjectCard';
import tumbler from '../../images/tumbler.jpg';
import standingDesk from '../..//images/standingDesk.jpg';
import earPhone from '../../images/earPhone.jpg';
import InfomationModal from './InfomationModal';
import BirthDayModal from './BirthDayModal';
import { Route, Routes, useNavigate } from 'react-router-dom';


const projects = [
    { title: '텀블러 프로젝트', description: '친환경 텀블러 제작', progress: 70, img: tumbler },
    { title: '스탠딩 데스크', description: '건강을 위한 책상', progress: 40, img: standingDesk },
    { title: '펀딩 이어폰', description: '노이즈 캔슬링 지원', progress: 90, img: earPhone },
];

function Mypage() {
    const [view, setView] = useState('Profile');
    const [showInfo, setShowInfo] = useState(false);


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

            <div>
                <Container fluid className="mypage">
                    <Row>
                        <Col md={3} className="sidebar p-4 border-end">
                            <div className="text-center mb-4">
                                <Image src={basic} roundedCircle width={100} height={100} />
                                <h5 className="mt-3">한주승</h5>
                                <p className="text-muted">abcd****@naver.com</p>
                            </div>
                            <Nav className="flex-column">
                                <Nav.Link onClick={() => { setView("Profile") }}>프로필</Nav.Link>
                                <Nav.Link onClick={() => { setView("Myproject") }}>내 프로젝트</Nav.Link>
                                <Nav.Link onClick={() => { setView("Spon") }}>후원한 프로젝트</Nav.Link>
                                <Nav.Link onClick={() => { setView("Wishlist") }}>위시리스트</Nav.Link>
                            </Nav>
                            <br />
                            <Button variant="danger">로그아웃</Button>
                        </Col>
                        {view == 'Profile' && <Profile showInfo={showInfo} setShowInfo={setShowInfo} />}
                        {view == 'Myproject' && <MyProject />}
                        {view == 'Spon' && <Spon />}
                        {view == 'Wishlist' && <Wishlist />}
                    </Row>
                </Container>
            </div>
        </div>

    );

    function Profile({ showInfo, setShowInfo }) {
        const [showPhoneModal, setShowPhoneModal] = useState(false);
        const [infomation, setInfomation] = useState(['010-1234-5678', 'asdf1234@naver.com']);
        const [asd, setAsd] = useState('');
        return (
            <Col md={9} className="p-4">
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
                        <div>
                            <span>📞 {infomation[0]}</span>
                            <Button className='profile-numEmailChange' variant="secondary" onClick={() => {
                                setShowPhoneModal(true);
                                setAsd('전화번호');
                            }}>수정</Button>
                            <InfomationModal show={showPhoneModal} asd={asd} onClose={() => setShowPhoneModal(false)} infomation={infomation} setInfomation={setInfomation} />
                        </div>
                        <br />
                        <div>
                            <span>✉ {infomation[1]}</span>
                            <Button className='profile-numEmailChange' variant="secondary" onClick={() => {
                                setShowPhoneModal(true);
                                setAsd('이메일');
                            }}>수정</Button>
                            <InfomationModal show={showPhoneModal} asd={asd} onClose={() => setShowPhoneModal(false)} infomation={infomation} setInfomation={setInfomation} />
                        </div>
                    </div>
                    <br />
                    <div className='profileBox'>
                        <p>부가 정보 관리</p>
                        <hr />
                        <div>
                            <span>생일 관리</span>
                            <Button className='profile-numEmailChange' variant="secondary" onClick={() => setShowInfo(true)}>확인</Button>
                            <BirthDayModal show={showInfo} setShowInfo={setShowInfo} closeModal={() => setShowInfo(false)} />
                        </div>
                        <br />
                        <div>
                            <span>배송지 관리</span>
                            <Button className='profile-numEmailChange' variant="secondary">확인</Button>
                        </div>
                        <br />
                        <div>
                            <span>개인정보 이용내역</span>
                            <Button className='profile-numEmailChange' variant="secondary">확인</Button>
                        </div>
                    </div>
                    <br />
                    <Button className='exit-member' variant="danger" onClick={() => {
                        prompt("정말 회원탈퇴 하시겠습니까? (원하시면 '회원탈퇴'를 입력해주세요)");
                    }}>회원탈퇴</Button>
                </div>
            </Col>
        );
    }
    function MyProject() {
        return (
            <Col md={9} className="p-4">
                <h1>내 프로젝트 페이지</h1>
            </Col>
        );
    }

    function Spon() {
        return (
            <Col md={9} className="p-4">
                <h3 className="mb-4">후원한 프로젝트</h3>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {projects.map((project, index) => (
                        <Col key={index}>
                            <ProjectCard project={project} />
                        </Col>
                    ))}
                </Row>
            </Col>
        );
    }

    function Wishlist() {
        return (
            <Col md={9} className="p-4">
                <h1>위시리스트 페이지</h1>
            </Col>
        );
    }
}

export default Mypage;
