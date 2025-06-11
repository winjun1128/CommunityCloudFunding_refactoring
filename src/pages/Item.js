import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import './Item.css';

import PayModal from './PayModal';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useProducts } from '../data/ProductContext';
import SellModal from './SellModal';
import AlertModal from './AlertModal';
function Item() {
    const [alertContent,setAlertContent] = useState('로그인 먼저 하세요.');
    const tabMap = {
        all: "전체",
        food: '푸드',
        living: '리빙',
        area: '지역',
        book: '서적',
        learning: '교육',
        environment: '환경',
        pet: '펫',
        travel: '여행',
        beauty: '뷰티'
    };


    const [showAlertModal, setShowAlertModal] = useState(false);

    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    let { itemno } = useParams();

    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능

    const itemindex = products.findIndex(product => product.no === Number(itemno));


    //컨슈머와 좋아요
    const [heartToggle, setHeartToggle] = useState(false);

    // const item={itemname:'상품1',itemnum:1,itemcount:0,itemprice:10000,period:'2025-05-28~2025-06-11',percent:50}
    // const [buyItem,setBuyItem]=useState(item)
    const [showPayModal, setShowPayModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    return (
        <div className='item-all-container'>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                    <Container fluid className="item-navbar-inner">
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
                                    else{
                                        setAlertContent('로그인 먼저 하세요.')
                                        setShowAlertModal(true);
                                    }
                                }}>펀딩신청</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className='item-main'>
                <Container>
                    <Row className='item-custom-row'>
                        <Col xs={12} md={6} style={{ height: '600px' }}>
                            <Carousel style={{ width: '100%', height: '600px' }}>
                                <Carousel.Item style={{ width: '100%', height: '600px' }}>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[0]}
                                        alt="First slide"
                                        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>

                                <Carousel.Item style={{ width: '100%', height: '600px' }}>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[1]}
                                        alt="Second slide"
                                        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>

                                <Carousel.Item style={{ width: '100%', height: '600px' }}>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[2]}
                                        alt="Third slide"
                                        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col xs={12} md={6} style={{ height: '600px' }}>
                            <div style={{ height: '90%' }}>
                                <p>{tabMap[products[itemindex].category]}</p>
                                <h3 className='itemProductName'>{products[itemindex].name}</h3>
                                <p style={{ marginTop: '15px' }}>{products[itemindex].companyname}</p>
                                <h4 style={{ marginTop: '15px' }}>{products[itemindex].price.toLocaleString() + '원'}</h4>
                                <p style={{ marginTop: '30px' }}><strong>모인금액</strong></p>
                                <div className='gain-money'>
                                    <span>{products[itemindex].gainmoney.toLocaleString() + '원'}</span>
                                    <span>{(products[itemindex].gainmoney / products[itemindex].price) + '명 후원'}</span>
                                    <span style={{ color: 'red' }}>{products[itemindex].percent + '%'}</span>
                                </div>
                                <table>
                                    <tr>
                                        <td><strong>목표금액</strong></td>
                                        <td>{products[itemindex].recruitmoney.toLocaleString()}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>모집시작일</strong></td>
                                        <td>{products[itemindex].startdate}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>모집마감일</strong></td>
                                        <td>{products[itemindex].enddate}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>상태여부</strong></td>
                                        <td style={{ color: 'red' }}>{products[itemindex].state}</td>
                                    </tr>
                                </table>
                            </div>
                            <div className='like-pay-community' style={{ height: '10%' }}>
                                <Button className='go_community' variant='primary' onClick={() => {
                                    if (localStorage.getItem('id') != null) {
                                        navigate('/community/' + itemno);
                                    }
                                    else {
                                        setAlertContent('로그인 먼저 하세요.');
                                        setShowAlertModal(true);
                                    }
                                }}>게시판가기</Button>
                                <div className='like-pay'>
                                    <button onClick={() => {
                                        if(products[itemindex].state==='마감'){
                                            setAlertContent('마감입니다.');
                                            setShowAlertModal(true);
                                            return;
                                        }
                                        if (localStorage.getItem('id') == null) {
                                            setAlertContent('로그인 먼저 하세요.');
                                            setShowAlertModal(true);
                                            return;
                                        }
                                        if (products[itemindex].heart.includes(localStorage.getItem('id')) == false) {
                                            let temp = [...products];
                                            temp[itemindex].heart.push(localStorage.getItem('id'));
                                            setProducts(temp);
                                            setHeartToggle(true);
                                        }
                                        else {
                                            let temp = [...products];
                                            temp[itemindex].heart = temp[itemindex].heart.filter(id => id !== localStorage.getItem('id'));
                                            setProducts(temp);
                                            setHeartToggle(false);
                                        }
                                    }} >{(products[itemindex].heart.includes(localStorage.getItem('id')) ? '💘' : '🤍')}</button>
                                    <Button size='sm' onClick={() => {
                                        if(products[itemindex].state==='마감'){
                                            setAlertContent('마감입니다.');
                                            setShowAlertModal(true);
                                            return;
                                        }
                                        if (localStorage.getItem('id') === null) {
                                            setAlertContent('로그인 먼저 하세요.');
                                            setShowAlertModal(true);
                                            return;
                                        }
                                        if (localStorage.getItem('id') != null) {
                                            setShowPayModal(true);
                                        }
                                    }}>결제가기</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <div className='item-intro'>
                                <h4>{products[itemindex].intro}</h4>
                                <img src={products[itemindex].picturelink}></img>
                                <video src={products[itemindex].videolink} width="100%" height="50%" controls></video>
                                {/* 안내사항 추가 */}
                                <div className="notice-box">
                                    <h5>📌 안내사항</h5>
                                    <ul>
                                        <li>후원은 결제 후 취소가 어렵습니다. 신중히 참여해 주세요.</li>
                                        <li>상품은 프로젝트 종료 후 순차적으로 발송됩니다.</li>
                                        <li>문의사항은 게시판 또는 고객센터로 연락 바랍니다.</li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
            <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content={alertContent} opt={1}></AlertModal>
            <PayModal itemindex={itemindex} show={showPayModal} onClose={() => setShowPayModal(false)}  ></PayModal>
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)}></SellModal>
            <footer className="footer">
                <Container>
                    <Row>
                        <Col md={4}>
                            <h5 className="footer-title">5판3선</h5>
                            <p className="footer-text">천안시 동남구 대흥로 215<br />백자빌딩 7층</p>
                            <p className="footer-text">전화: 041-561-1126</p>
                        </Col>
                        <Col md={4}>
                            <h6 className="footer-title">고객지원</h6>
                            <ul className="footer-list">
                                <li><a href="#">자주 묻는 질문</a></li>
                                <li><a href="#">문의하기</a></li>
                                <li><a href="#">이용약관</a></li>
                                <li><a href="#">개인정보처리방침</a></li>
                            </ul>
                        </Col>
                        <Col md={4}>
                            <h6 className="footer-title">서비스</h6>
                            <ul className="footer-list">
                                <li><a href="#" onClick={() => {
                                    if (localStorage.getItem('id') != null)
                                        setShowSellModal(true);
                                    else
                                        setShowAlertModal(true);
                                }}>펀딩 신청</a></li>
                                <li><a href={localStorage.getItem('id') != null ? '/mypage' : '/login'}>마이페이지</a></li>
                                <li><a href="https://www.notion.so/20322dc2b142800f9264d7662c846fa5?source=copy_link" target="_blank" rel="noopener noreferrer">이용 가이드</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <hr />
                    <p className="text-center small text-muted">© 2025 Funders. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
}
export default Item;