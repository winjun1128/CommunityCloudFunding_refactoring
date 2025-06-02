import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import './Item.css';

import PayModal from './PayModal';
import { useState } from 'react';
import {useNavigate, useParams} from 'react-router';
import { useProducts } from '../data/ProductContext';
import SellModal from './SellModal';
function Item() {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    let { itemno } = useParams();
   
    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능

     const itemindex = products.findIndex(product => product.no===Number(itemno));
    //컨슈머와 좋아요
    const [heartToggle,setHeartToggle] = useState(false);
    const [heartIndex,setHeartIndex] = useState(0);
    const heartproducts = products.filter(item => item.heart.includes(localStorage.getItem('id')));
    const [consumerIndex, setConsumerIndex] = useState(0);
    const consumerproducts = products.filter(item => item.consumer.includes(localStorage.getItem('id')));
    // const item={itemname:'상품1',itemnum:1,itemcount:0,itemprice:10000,period:'2025-05-28~2025-06-11',percent:50}
    // const [buyItem,setBuyItem]=useState(item)
    const [showPayModal, setShowPayModal] = useState(false);
    const [showSellModal, setShowSellModal] = useState(false);
    return (
        <div>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary w-100 h-100">
                    <Container fluid>
                        <Navbar.Brand as={Link} to="/">로고</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                <Nav.Link as={Link} to="/list" style={{ marginRight: '10px' }}>
                                    후원하기
                                </Nav.Link>
                                <Form className="d-flex">
                                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                    <Button variant="outline-success" style={{ marginRight: '10px' }} onClick={()=>navigate(`/list?keyword=${encodeURIComponent(searchKeyword)}`)}>
                                        Search
                                    </Button>
                                </Form>
                                <Nav.Link as={Link} to={localStorage.getItem('id')==null?'/login' : '/mypage'}>{localStorage.getItem('id') == null ? '로그인' : localStorage.getItem('id')}</Nav.Link>
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
                    <Row className='custom-row'>
                        <Col md={6}>
                            <Carousel style={{ width: '100%', height: '600px' }}>
                                <Carousel.Item style={{ width: '100%', height: '600px' }}>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[0]}
                                        alt="First slide"
                                        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[1]}
                                        alt="Second slide"
                                        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>

                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={products[itemindex].carousellink[2]}
                                        alt="Third slide"
                                        style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                                    />
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                        <Col md={6}>
                            <h4>{products[itemindex].category}</h4>
                            <h3>{products[itemindex].name}</h3>
                            <h4>{products[itemindex].companyname}</h4>
                            <h4>{products[itemindex].price + '원'}</h4>
                            <p>모인금액</p>
                            <div className='gain-money'>
                                <span>{products[itemindex].gainmoney + '원'}</span>
                                <span>{products[itemindex].percent + '%'}</span>
                            </div>
                            <table>
                                <tr>
                                    <td>목표금액</td>
                                    <td>{products[itemindex].recruitmoney}</td>
                                </tr>
                                <tr>
                                    <td>모집시작일</td>
                                    <td>{products[itemindex].startdate}</td>
                                </tr>
                                <tr>
                                    <td>모집마감일</td>
                                    <td>{products[itemindex].enddate}</td>
                                </tr>
                                <tr>
                                    <td>상태여부</td>
                                    <td>진행</td>
                                </tr>
                            </table>
                            <div className='like-pay'>
                                <button onClick={() => {
                                    if(heartToggle==false){
                                        let temp = [...products];
                                        temp[itemindex].heart.push(localStorage.getItem('id'));
                                        setProducts(temp);
                                        setHeartToggle(true);
                                    }
                                    else{
                                        let temp = [...products];
                                        temp[itemindex].heart = temp[itemindex].heart.filter(id=>id!==localStorage.getItem('id'));
                                        setProducts(temp);
                                        setHeartToggle(false);
                                    }
                                }} style={(heartToggle?{backgroundColor:'black'}:{backgroundColor:'white'})}>❤</button>
                                <Link to="."><Button onClick={() => setShowPayModal(true)}>결제가기</Button></Link>
                            </div>
                            <Button variant='primary' style={{ marginTop: '10%' }} onClick={()=>navigate('/community')}>게시판가기</Button>
                        </Col>
                    </Row>
                    {/* 컨슈머와 좋아요 */}
                    {
                        consumerproducts.map((item, index) => {
                            return (
                                <div>
                                    <p onClick={() => setConsumerIndex(index)}>{item.name}</p>
                                </div>
                            )
                        })
                    }
                    <p>{consumerIndex}</p>
                    {
                        heartproducts.map((item, index) => {
                            return (
                                <div>
                                    <p onClick={() => setHeartIndex(index)}>{item.name}</p>
                                </div>
                            )
                        })
                    }
                    <p>{heartIndex}</p>
                    <div className='item-intro'>
                        <h3>제품소개</h3>
                        <h4>{products[itemindex].intro}</h4>
                        <h4>제품사진</h4>
                        <img src={products[itemindex].picturelink}></img>
                        <h4>제품영상</h4>
                        <video src={products[itemindex].videolink} width="100%" height="50%" controls></video>
                    </div>
                </Container>
            </main>
            <PayModal itemindex={itemindex} show={showPayModal} onClose={() => setShowPayModal(false)}  ></PayModal>
            <SellModal show={showSellModal} onClose={()=>setShowSellModal(false)}></SellModal>
            <footer>
                5판3선
                {/* <p>{buyItem.itemname}</p>
                <p>{buyItem.itemcount}</p> */}
            </footer>
        </div>
    );
}
export default Item;