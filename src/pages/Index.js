import { Card, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Navbar, Nav, Form, Button, ProgressBar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Index.css';
import { useState } from 'react';
import SellModal from './SellModal';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';
// import TpsItem from './TpsItem';
import { Route, Routes } from 'react-router';
function Index() {
    const [showAlertModal, setShowAlertModal] = useState(false);

    const [isHoveredHot, setIsHoveredHot] = useState(false);
    const [isHoveredHeart, setIsHoveredHeart] = useState(false);


    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    let countSortedProducts = [...products].sort(
        (b, a) => a.count - b.count
    );
    countSortedProducts = countSortedProducts.slice(0, 4);

    let heartSortedProducts = [...products].sort(
        (b, a) => a.heart.length - b.heart.length
    );
    heartSortedProducts = heartSortedProducts.slice(0, 4);

    const [showSellModal, setShowSellModal] = useState(false);
    // const item={id:'아이디1', itemnum:13,itemname:'',itemcategory:'전체',itemprice:0,itemrecruitprice:0,itemrecruitperiodstart:'',itemrecruitperiodend:'',itemcarousellink:['','',''],itemintro:'',itempicturelink:'',itemvideolink:''}
    // const[sellItem,setSellItem]=useState({item});
    return (
        <div className='index-all-container'>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                    <Container fluid className="index-navbar-inner">
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
                                    else
                                        setShowAlertModal(true);

                                }}>펀딩신청</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className='index-main'>
                <Container>
                    <Carousel style={{ width: '100%', height: '400px' }}>
                        <Carousel.Item style={{ width: '100%', height: '400px' }}>
                            <img
                                className="d-block"
                                src="/images/event1.jpg"
                                alt="First slide"
                                style={{ width: '100%', height: '400px' }}
                            />
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '400px' }}>
                            <img
                                className="d-block"
                                src="/images/event2.jpg"
                                alt="Second slide"
                                style={{ width: '100%', height: '400px' }}
                            />
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '400px' }}>
                            <img
                                className="d-block"
                                src="/images/event3.jpg"
                                alt="Third slide"
                                style={{ width: '100%', height: '400px' }}
                            />
                        </Carousel.Item>
                    </Carousel>
                    <h2 className='hotfunding'>인기펀딩✨</h2>
                    {
                        <Row className='custom-row'>
                            {
                                countSortedProducts.map((item) => {
                                    return (
                                        <Col md={3}>
                                            <Card>
                                                <Link to={`/item/${item.no}`}>
                                                    <Card.Img variant="top" src={item.imglink} />
                                                </Link>
                                                <Card.Body>
                                                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Card.Title className='ellipsis-multiline'>{item.name}</Card.Title>
                                                    </Link>
                                                    <div className='list-card-text'>
                                                        <span className='company-text' style={{ textAlign: 'left' }}>{item.companyname}</span>
                                                        <span className='state-text' style={{ color: 'red' }}>{item.state}</span>
                                                    </div>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>시작일자:&nbsp;&nbsp;</strong>{item.startdate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>마감일자:&nbsp;&nbsp;</strong>{item.enddate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <ProgressBar now={item.percent} label={`${item.percent}%`} />
                                                </Card.Footer>
                                            </Card>
                                        </Col>

                                    )

                                })
                            }
                        </Row>
                    }
                    <h2 className='heartfunding'>좋아요 펀딩💘</h2>
                    {
                        <Row className='custom-row'>
                            {
                                heartSortedProducts.map((item) => {
                                    return (
                                        <Col md={3}>
                                            <Card>
                                                <Link to={`/item/${item.no}`}>
                                                    <Card.Img variant="top" src={item.imglink} />
                                                </Link>
                                                <Card.Body>
                                                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Card.Title className='ellipsis-multiline'>{item.name}</Card.Title>
                                                    </Link>
                                                    <div className='list-card-text'>
                                                        <span className='company-text' style={{ textAlign: 'left' }}>{item.companyname}</span>
                                                        <span className='state-text' style={{ color: 'red' }}>{item.state}</span>
                                                    </div>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>시작일자:&nbsp;&nbsp;</strong>{item.startdate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>마감일자:&nbsp;&nbsp;</strong>{item.enddate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <ProgressBar now={item.percent} label={`${item.percent}%`} />
                                                </Card.Footer>
                                            </Card>
                                        </Col>

                                    )

                                })
                            }
                        </Row>
                    }
                    <div style={{ width: '100%', height: '600px', overflow: 'hidden', marginBottom: '40px' }}>
                        <video controls loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} >
                            <source src="/videos/Funders_intro.mp4" type='video/mp4' />
                        </video>
                    </div>



                    <Carousel style={{ width: '100%', height: '500px' }}>
                        <Carousel.Item style={{ width: '100%', height: '500px' }}>
                            <Row className="ad-slide1 align-items-center" style={{ height: '100%' }}>
                                <Col md={6} className="ad-image-container">
                                    <img
                                        className="d-block w-100 zoom-in"
                                        src="/images/bam1.jpg"
                                        alt="광고 이미지"
                                        style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Col>
                                <Col md={6} className="ad-text-area">
                                    <div className="ad-text">
                                        <h1 className="slide-in">신제품 밤티라미수 등록!</h1>
                                        <h2>밤티라미수</h2>
                                        <h3>밤티라미수컴퍼니</h3>
                                        <p>지금 등록 할인가로 만나보세요!</p>
                                        <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10,000원</span>
                                        <h2 className='text-jump'>3,800원</h2>
                                        <br></br>
                                        <Button onClick={() => navigate('item/1')} className="blink-button1" variant="danger">지금 보러가기</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '500px' }}>
                            <Row className="ad-slide2 align-items-center" style={{ height: '100%' }}>
                                <Col md={6} className="ad-image-container">
                                    <img
                                        className="d-block w-100 zoom-in"
                                        src="/images/ex_item_1.jpg"
                                        alt="광고 이미지"
                                        style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Col>
                                <Col md={6} className="ad-text-area">
                                    <div className="ad-text">
                                        <h1 className="slide-in">신제품 감자튀김 등록!</h1>
                                        <h2>감자튀김</h2>
                                        <h3>감자튀김컴퍼니</h3>
                                        <p>지금 등록 할인가로 만나보세요!</p>
                                        <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10,000원</span>
                                        <h2 className='text-jump'>5,000원</h2>
                                        <br></br>
                                        <Button onClick={() => navigate('item/1')} className="blink-button1" variant="danger">지금 보러가기</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '500px' }}>
                            <Row className="ad-slide3 align-items-center" style={{ height: '100%' }}>
                                <Col md={6} className="ad-image-container">
                                    <img
                                        className="d-block w-100 zoom-in"
                                        src="/images/food1.jpg"
                                        alt="광고 이미지"
                                        style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                                    />
                                </Col>
                                <Col md={6} className="ad-text-area">
                                    <div className="ad-text">
                                        <h1 className="slide-in">신제품 케이크 등록!</h1>
                                        <h2>케이크</h2>
                                        <h3>케이크컴퍼니</h3>
                                        <p>지금 등록 할인가로 만나보세요!</p>
                                        <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10,000원</span>
                                        <h2 className='text-jump'>5,000원</h2>
                                        <br></br>
                                        <Button onClick={() => navigate('item/1')} className="blink-button1" variant="danger">지금 보러가기</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Carousel.Item>
                    </Carousel>
                </Container>
            </main>
            <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content="로그인 먼저 하세요." opt={1}></AlertModal>
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} ></SellModal>
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
export default Index;