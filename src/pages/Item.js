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
function Item() {
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
                <Navbar expand="lg" className="bg-body-tertiary w-100 h-100">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">Funders</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                <Nav.Link as={Link} to="/list" style={{ marginRight: '10px' }}>
                                    후원하기
                                </Nav.Link>
                                <Form className="d-flex">
                                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                    <Button variant="outline-success" style={{ marginRight: '10px' }} onClick={() => navigate(`/list?keyword=${encodeURIComponent(searchKeyword)}`)}>
                                        Search
                                    </Button>
                                </Form>
                                <Nav.Link as={Link} to={localStorage.getItem('id') == null ? '/login' : '/mypage'}>{localStorage.getItem('id') == null ? '로그인' : localStorage.getItem('id')}</Nav.Link>
                                <Nav.Link onClick={() => {
                                    if (localStorage.getItem('id') != null)
                                        setShowSellModal(true);
                                    else
                                        alert('로그인 하세요');

                                }} href="#action3">펀딩신청</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className='item-main'>
                <Container>
                    <Row className='item-custom-row'>
                        <Col xs={12} md={6} style={{ height: '500px' }}>
                            <Carousel style={{ width: '100%', height: '500px' }}>
                                <Carousel.Item style={{ width: '100%', height: '500px' }}>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[0]}
                                        alt="First slide"
                                        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>

                                <Carousel.Item style={{ width: '100%', height: '500px' }}>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[1]}
                                        alt="Second slide"
                                        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>

                                <Carousel.Item style={{ width: '100%', height: '500px' }}>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[2]}
                                        alt="Third slide"
                                        style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col xs={12} md={6} style={{height: '500px' }}>
                            <div style={{ height: '90%' }}>
                                <h3 className='itemProductName'>{products[itemindex].name}</h3>
                                <h4 style={{marginTop:'15px'}}>{products[itemindex].companyname}</h4>
                                <h4 style={{marginTop:'15px'}}>{products[itemindex].price.toLocaleString() + '원'}</h4>
                                <p style={{marginTop:'30px'}}><strong>모인금액</strong></p>
                                <div className='gain-money'>
                                    <span>{products[itemindex].gainmoney.toLocaleString() + '원'}</span>
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
                                        <td>진행</td>
                                    </tr>
                                </table>
                            </div>
                            <div className='like-pay-community' style={{ height: '10%' }}>
                                <Button className='go_community' variant='primary' onClick={() => {
                                    if(localStorage.getItem('id') != null){
                                        navigate('/community/' + itemno);
                                    }
                                    else{
                                        alert('로그인 먼저 하세요.!');
                                    }
                                }}>게시판가기</Button>
                                <div className='like-pay'>
                                    <button onClick={() => {
                                        if(localStorage.getItem('id') == null){
                                            alert('로그인 먼저 하세요.!');
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
                                    <Button style={{ width: '20%' }} onClick={() => {
                                            if(localStorage.getItem('id') != null){
                                                setShowPayModal(true);
                                            }
                                            else{
                                                alert('로그인 먼저 하세요.!');
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
            <PayModal itemindex={itemindex} show={showPayModal} onClose={() => setShowPayModal(false)}  ></PayModal>
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)}></SellModal>
           <hr></hr>
            <footer style={{paddingLeft:'6%'}}>
                <h5>5판3선</h5>
                <h6>주소: 천안시 동남구 대흥로 215 백자빌딩 7층</h6>
                <h6>연락처: 041-561-1126</h6>
                <h6><a href='https://www.notion.so/20322dc2b142800f9264d7662c846fa5?source=copy_link'>이용가이드</a></h6>
            </footer>
        </div>
    );
}
export default Item;