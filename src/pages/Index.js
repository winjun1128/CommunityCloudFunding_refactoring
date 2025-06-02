import { Card, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Index.css';
import { useState } from 'react';
import TpsSellModal from './TpsSellModal';
import { useProducts } from './TpsProductContext';
import TpsItem from './TpsItem';
import {Route,Routes} from 'react-router';
function Index() {
    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    let countSortedProducts = [...products].sort(
        (a, b) => a.count - b.count
    );
    countSortedProducts = countSortedProducts.slice(0, 4);

    const [ShowSellModal, setShowSellModal] = useState(false);
    // const item={id:'아이디1', itemnum:13,itemname:'',itemcategory:'전체',itemprice:0,itemrecruitprice:0,itemrecruitperiodstart:'',itemrecruitperiodend:'',itemcarousellink:['','',''],itemintro:'',itempicturelink:'',itemvideolink:''}
    // const[sellItem,setSellItem]=useState({item});
    return (
        <div>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary w-100 h-100">
                    <Container fluid>
                        <Navbar.Brand href="#">로고</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="ms-auto my-2 my-lg-0"
                                // me-auto 왼쪽정렬 ms-auto 오른쪽정렬
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="#action1" style={{ marginRight: '10px' }}>후원하기</Nav.Link>
                                <Form className="d-flex">
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success" style={{ marginRight: '10px' }}>Search</Button>
                                </Form>

                                <Nav.Link href="#action2">{localStorage.getItem('id') == null ? '로그인' : localStorage.getItem('id')}</Nav.Link>
                                <Nav.Link onClick={() => {
                                    if (localStorage.getItem('id') != null)
                                        setShowSellModal(true);
                                    else
                                        alert('로그인 하세요');

                                }} href="#action3">펀딩신청</Nav.Link>
                                {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown> */}
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>

                <Routes>
                    <Route path="/item/:itemindex" element={<TpsItem/>}></Route>
                </Routes>
            </header>
            <main>
                <Container>
                    <Carousel style={{ width: '100%', height: '600px' }}>
                        <Carousel.Item style={{ width: '100%', height: '600px' }}>
                            <img
                                className="d-block"
                                src="/basketball1.jpeg"
                                alt="First slide"
                                style={{ width: '100%', height: '600px' }}
                            />
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '600px' }}>
                            <img
                                className="d-block"
                                src="/soccerball1.jpg"
                                alt="Second slide"
                                style={{ width: '100%', height: '600px' }}
                            />
                        </Carousel.Item>

                        <Carousel.Item style={{ width: '100%', height: '600px' }}>
                            <img
                                className="d-block"
                                src="/food1.jpg"
                                alt="Third slide"
                                style={{ width: '100%', height: '600px' }}
                            />
                        </Carousel.Item>
                    </Carousel>
                    <h2 className='hotfunding'>인기펀딩</h2>
                    {
                        <Row className='custom-row'>
                            {
                                countSortedProducts.map((item, count) => {
                                    return (
                                        <Col md={3}>
                                            <Card>
                                                <Link to=".">
                                                    <Card.Img variant="top" src={item.imglink} />
                                                </Link>
                                                <Card.Body>
                                                    <Link to="." style={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Card.Title>{item.name}</Card.Title>
                                                    </Link>
                                                    <Card.Text>{item.companyname}</Card.Text>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>시작일자:</strong>{item.startdate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>마감일자:</strong>{item.enddate}</small>
                                                </Card.Footer>
                                                <Card.Footer>
                                                    <small className="text-muted"><strong>진행도:</strong>{item.percent + '%'}</small>
                                                </Card.Footer>
                                            </Card>
                                        </Col>

                                    )

                                })
                            }
                        </Row>
                    }
                </Container>
            </main>
            <TpsSellModal show={ShowSellModal} onClose={() => setShowSellModal(false)} ></TpsSellModal>
            <footer>
                <h2>5판3선</h2>
            </footer>
        </div>
    );
}
export default Index;