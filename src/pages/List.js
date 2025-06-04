// 부트스트랩이 안되네 헤더랑
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Link,useLocation } from 'react-router-dom';
import { useProducts } from '../data/ProductContext';

//import './Index.css';
import './List.css';
import SellModal from './SellModal';
import EditModal from './EditModal';
// import TpsItem  from './TpsItem';
import {Routes,Route, useNavigate} from 'react-router';
// 추가했을때 전체 탭에서만 뜸
function List() {
    const navigate = useNavigate();
    const [in_SearchKeyword,in_SetSearchKeyword] = useState('');

    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword');

    const [showEditModal, setShowEditModal] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(0);
    const [showSellModal, setShowSellModal] = useState(false);
    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    const [activeTab, setActiveTab] = useState('all'); // 초기 선택 탭

    const searchKeyword = keyword;
    const keywordResult = products.filter(product =>
        product.name.includes(searchKeyword)
    );
    const keywordContent = () => {
        const keywordRows = [];
        for (let i = 0; i < keywordResult.length; i += 4) {
            const keywordGroup = keywordResult.slice(i, i + 4); // 4개씩 묶기
            keywordRows.push(
                <Row className="custom-row" key={i}>
                    {
                        keywordGroup.map((item) => {
                            return(
                            <Col md={3} key={item.no}>
                                <Card>
                                    <Link to={`/item/${item.no}`}>
                                        <Card.Img variant="top" src={item.imglink} />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
            )
        }
        return keywordRows;
    }

    const [category, setCategory] = useState('all');


    //전체가 아닐떄
    const getContent = () => {
        if (category === 'open-order') {
            const setCategoryProducts = products.filter(item => item.category === activeTab);
            const openSortedProducts = [...setCategoryProducts].sort(
                (a, b) => new Date(a.startdate) - new Date(b.startdate)
            );
            const openRows = [];

            for (let i = 0; i < openSortedProducts.length; i += 4) {
                const group = openSortedProducts.slice(i, i + 4);
                openRows.push(
                    <Row className="custom-row" key={i}>
                        {group.map((item) => (
                            <Col md={3} key={item.no}>
                                <Card>
                                    <Link to={`/item/${item.no}`}>
                                        <Card.Img variant="top" src={item.imglink} />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        ))}
                    </Row>
                );
            }
            return openRows;
        }
        if (category === 'close-order') {
            const setCategoryProducts = products.filter(item => item.category === activeTab);
            const closeSortedProducts = [...setCategoryProducts].sort(
                (a, b) => new Date(a.enddate) - new Date(b.enddate)
            );
            const closeRows = [];

            for (let i = 0; i < closeSortedProducts.length; i += 4) {
                const group = closeSortedProducts.slice(i, i + 4);
                closeRows.push(
                    <Row className="custom-row" key={i}>
                        {group.map((item) => (
                            <Col md={3} key={item.no}>
                                <Card>
                                    <Link to={`/item/${item.no}`}>
                                        <Card.Img variant="top" src={item.imglink} />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        ))}
                    </Row>
                );
            }
            return closeRows;
        }
        if (category === 'percent') {
            const setCategoryProducts = products.filter(item => item.category === activeTab);
            const percentSortedProducts = [...setCategoryProducts].sort(
                (b, a) => new Date(a.percent) - new Date(b.percent)
            );
            const percentRows = [];

            for (let i = 0; i < percentSortedProducts.length; i += 4) {
                const group = percentSortedProducts.slice(i, i + 4);
                percentRows.push(
                    <Row className="custom-row" key={i}>
                        {group.map((item) => (
                            <Col md={3} key={item.no}>
                                <Card>
                                    <Link to={`/item/${item.no}`}>
                                        <Card.Img variant="top" src={item.imglink} />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        ))}
                    </Row>
                );
            }
            return percentRows;
        }
        const setCategoryProducts = products.filter(item => item.category === activeTab);
        const rows = [];
        for (let i = 0; i < setCategoryProducts.length; i += 4) {
            const group = setCategoryProducts.slice(i, i + 4); // 4개씩 묶기
            rows.push(
                <Row className="custom-row" key={i}>
                    {group.map((item) => (
                        <Col md={3} key={item.no}>
                            <Card>
                                <Link to={`/item/${item.no}`}>
                                    <Card.Img variant="top" src={item.imglink} />
                                </Link>
                                <Card.Body>
                                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    ))}
                </Row>
            );
        }
        return rows;
    }

    const getAllContent = () => {
        if (category === 'open-order') {
            const openSortedProducts = [...products].sort(
                (a, b) => new Date(a.startdate) - new Date(b.startdate)
            );
            const openRows = [];

            for (let i = 0; i < openSortedProducts.length; i += 4) {
                const group = openSortedProducts.slice(i, i + 4);
                openRows.push(
                    <Row className="custom-row" key={i}>
                        {group.map((item) => (
                            <Col md={3} key={item.no}>
                                <Card>
                                    <Link to={`/item/${item.no}`}>
                                        <Card.Img variant="top" src={item.imglink} />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        ))}
                    </Row>
                );
            }
            return openRows;
        }
        if (category === 'close-order') {
            const closeSortedProducts = [...products].sort(
                (a, b) => new Date(a.enddate) - new Date(b.enddate)
            );
            const closeRows = [];

            for (let i = 0; i < closeSortedProducts.length; i += 4) {
                const group = closeSortedProducts.slice(i, i + 4);
                closeRows.push(
                    <Row className="custom-row" key={i}>
                        {group.map((item) => (
                            <Col md={3} key={item.no}>
                                <Card>
                                    <Link to={`/item/${item.no}`}>
                                        <Card.Img variant="top" src={item.imglink} />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        ))}
                    </Row>
                );
            }
            return closeRows;
        }
        if (category === 'percent') {
            const percentSortedProducts = [...products].sort(
                (b, a) => new Date(a.percent) - new Date(b.percent)
            );
            const percentRows = [];

            for (let i = 0; i < percentSortedProducts.length; i += 4) {
                const group = percentSortedProducts.slice(i, i + 4);
                percentRows.push(
                    <Row className="custom-row" key={i}>
                        {group.map((item) => (
                            <Col md={3} key={item.no}>
                                <Card>
                                    <Link to={`/item/${item.no}`}>
                                        <Card.Img variant="top" src={item.imglink} />
                                    </Link>
                                    <Card.Body>
                                        <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                        ))}
                    </Row>
                );
            }
            return percentRows;
        }
        const rows = [];
        for (let i = 0; i < products.length; i += 4) {
            const group = products.slice(i, i + 4); // 4개씩 묶기
            rows.push(
                <Row className="custom-row" key={i}>
                    {group.map((item) => (
                        <Col md={3} key={item.no}>
                            <Card>
                                <Link to={`/item/${item.no}`}>
                                    <Card.Img variant="top" src={item.imglink} />
                                </Link>
                                <Card.Body>
                                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    ))}
                </Row>
            );
        }
        return rows;
    }
    const sellproducts = products.filter(item => item.seller === localStorage.getItem('id'));

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
                                    <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={in_SearchKeyword} onChange={(e) => in_SetSearchKeyword(e.target.value)} />
                                    <Button variant="outline-success" style={{ marginRight: '10px' }} onClick={()=>navigate(`/list?keyword=${encodeURIComponent(in_SearchKeyword)}`)}>
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
            <main className='list-main'>
                <Container>
                    <h1>검색내용</h1>
                    {keywordContent()}
                    <Nav fill variant="tabs">
                        <Nav.Item>
                            <Nav.Link onClick={() => setActiveTab('all')} active={activeTab === 'all'}>전체</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => setActiveTab('food')} active={activeTab === 'food'}>푸드</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => setActiveTab('living')} active={activeTab === 'living'}>리빙</Nav.Link>
                        </Nav.Item>

                    </Nav>
                    {/* 윗카테고리 */}
                    {/* 선택한 값을 알아내지 않고 누르면 직접 값을 지정해서 넘겨줘야하므로 매개변수 필요없음 */}
                    {/* 이벤트객체를 넘겨주면  지금 네브들은 밸류속성이 없어서 undefined 뜸 */}


                    {/* 셀렉트에서 선택한 값을 알기 위해 이벤트 객체를 받아야 함 */}
                    <div className='categorySelectArea'>
                        <select id="categorySelect" onChange={(e) => setCategory(e.target.value)}>
                            <option value="all">전체</option>
                            <option value="open-order">등록순</option>
                            <option value="close-order">마감임박순</option>
                            <option value="percent">진행도</option>
                        </select>
                    </div>
                    {/* {(activeTab === "all" || activeTab === 'food' || activeTab === 'living') && renderContent()} */}
                    {/* 아랫카테고리 */}
                    {(activeTab === 'all') ? getAllContent() : getContent()}
                    {/* 필터링 된거 보이도록 */}
                </Container>
            </main>
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)}></SellModal>
            <footer>
                <h2>5판3선</h2>
            </footer>
        </div>
    );
}
export default List;