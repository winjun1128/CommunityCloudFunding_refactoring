// 부트스트랩이 안되네 헤더랑
import { Navbar, Nav, Form, Button, ProgressBar } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

//import './Index.css';
import './List.css';
import SellModal from './SellModal';
import EditModal from './EditModal';
// import TpsItem  from './TpsItem';
import { Routes, Route, useNavigate } from 'react-router';
import AlarmModal from './AlarmModal';
// 추가했을때 전체 탭에서만 뜸
function List() {
     const tabMap = {
        all: "전체",
        food: '푸드',
        living: '리빙',
        area: '지역',
        book: '서적',
        learning: '교육',
        environment: '환경',
        pet:'펫',
        travel:'여행',
        beauty:'뷰티'
    };

    const [showAlertModal, setShowAlertModal] = useState(false);

    const navigate = useNavigate();
    const [in_SearchKeyword, in_SetSearchKeyword] = useState('');

    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const keyword = params.get('keyword');

    const [showAlarmModal, setShowAlarmModal] = useState(false);
    let [alarmCount, setAlarmCount] = useState(0);

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
                            return (
                                <Col md={3} key={item.no}>
                                    <Card>
                                        <Link to={`/item/${item.no}`}>
                                            <Card.Img variant="top" src={item.imglink} />
                                        </Link>
                                        <Card.Body>
                                            <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <Card.Title className='ellipsis-multiline'>{item.name}</Card.Title>
                                            </Link>
                                            <div className='list-card-text'>
                                                <Card.Text style={{ textAlign: 'left' }}>{item.companyname}</Card.Text>
                                                <Card.Text style={{ color: 'red' }}>{item.state}</Card.Text>
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
                                        <small className="text-muted"><strong>마감일자:&nbsp;&nbsp;</strong>{item.enddate}</small>
                                    </Card.Footer>
                                    <Card.Footer>
                                        <ProgressBar now={item.percent} label={`${item.percent}%`} />
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
                    ))}
                </Row>
            );
        }
        return rows;
    }


    return (
        <div className='list-all-container'>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                    <Container fluid className="list-navbar-inner">
                        <Navbar.Brand as={Link} to="/" className='header-font'>Funders</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto align-items-center" navbarScroll>
                                <Nav.Link as={Link} to="/list" className='me-3'>
                                    후원하기
                                </Nav.Link>
                                <Form className="d-flex me-3">
                                    <Form.Control type="search" placeholder="Search" className="me-2" value={in_SearchKeyword} onChange={(e) => in_SetSearchKeyword(e.target.value)} />
                                    <Button variant="outline-success" onClick={() => navigate(`/list?keyword=${encodeURIComponent(in_SearchKeyword)}`)}>
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
                                    else
                                        setShowAlertModal(true);

                                }}>펀딩신청</Nav.Link>
                            </Nav>
                            <AlarmModal show={showAlarmModal} onClose={() => setShowAlarmModal(false)} handleClose={() => setShowAlarmModal(false)} content="로그인 먼저 하세요." opt={1}></AlarmModal>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <main className='list-main'>
                <Container>
                    {(in_SearchKeyword || searchKeyword) &&
                        <>
                            <h1>검색내용</h1>
                            {keywordContent()}
                        </>
                    }
                    {!(in_SearchKeyword || searchKeyword) &&
                        <>
                            <Row className='justify-content-center' style={{ marginTop: '50px', cursor: 'pointer' }}>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('all')} active={activeTab === 'all'} className={`category-image ${activeTab === 'all' ? 'active' : ''}`}>
                                        <div>
                                            <img src={process.env.PUBLIC_URL+'/images/all.jpg'} style={{ width: '36px', height: '36px' }} ></img>
                                            <p>전체</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('food')} active={activeTab === 'food'} className={`category-image ${activeTab === 'food' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/food.jpg'} style={{ width: '36px' }} ></img>
                                        <p>푸드</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('living')} active={activeTab === 'living'} className={`category-image ${activeTab === 'living' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/living.jpg'} style={{ width: '36px' }} ></img>
                                        <p>리빙</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('area')} active={activeTab === 'area'} className={`category-image ${activeTab === 'area' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/area.jpg'} style={{ width: '36px' }} ></img>
                                        <p>지역</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('book')} active={activeTab === 'book'} className={`category-image ${activeTab === 'book' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/book.jpg'} style={{ width: '36px' }} ></img>
                                        <p>서적</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('learning')} active={activeTab === 'learning'} className={`category-image ${activeTab === 'learning' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/learning.jpg'} style={{ width: '36px' }} ></img>
                                        <p>교육</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('environment')} active={activeTab === 'environment'} className={`category-image ${activeTab === 'environment' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/environment.jpg'} style={{ width: '36px' }} ></img>
                                        <p>환경</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('pet')} active={activeTab === 'pet'} className={`category-image ${activeTab === 'pet' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/pet.jpg'} style={{ width: '36px' }} ></img>
                                        <p>펫</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('travel')} active={activeTab === 'travel'} className={`category-image ${activeTab === 'travel' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/travel.jpg'} style={{ width: '36px' }} ></img>
                                        <p>여행</p>
                                    </div>
                                </Col>
                                <Col xs="auto">
                                    <div onClick={() => setActiveTab('beauty')} active={activeTab === 'beauty'} className={`category-image ${activeTab === 'beauty' ? 'active' : ''}`}>
                                        <img src={process.env.PUBLIC_URL+'/images/beauty.jpg'} style={{ width: '36px' }} ></img>
                                        <p>뷰티</p>
                                    </div>
                                </Col>

                                {/* <Nav.Item>
                                    <Nav.Link onClick={() => setActiveTab('area')} active={activeTab === 'area'}><img src='/images/area.jpg' style={{height:'42px'}}></img></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={() => setActiveTab('book')} active={activeTab === 'book'}><img src='/images/book.jpg' style={{height:'42px'}}></img></Nav.Link>
                                </Nav.Item>
                                 <Nav.Item>
                                    <Nav.Link onClick={() => setActiveTab('learning')} active={activeTab === 'learning'}><img src='/images/learning.jpg' style={{height:'42px'}}></img></Nav.Link>
                                </Nav.Item>
                                 <Nav.Item>
                                    <Nav.Link onClick={() => setActiveTab('environment')} active={activeTab === 'environment'}><img src='/images/environment.jpg' style={{height:'42px'}}></img></Nav.Link>
                                </Nav.Item>
                                 <Nav.Item>
                                    <Nav.Link onClick={() => setActiveTab('pet')} active={activeTab === 'pet'}><img src='/images/pet.jpg' style={{height:'42px'}}></img></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={() => setActiveTab('travel')} active={activeTab === 'travel'}><img src='/images/travel.jpg' style={{height:'42px'}}></img></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={() => setActiveTab('beauty')} active={activeTab === 'beauty'}><img src='/images/beauty.jpg' style={{height:'42px'}}></img></Nav.Link>
                                </Nav.Item> */}
                            </Row>
                            {/* 윗카테고리 */}
                            {/* 선택한 값을 알아내지 않고 누르면 직접 값을 지정해서 넘겨줘야하므로 매개변수 필요없음 */}
                            {/* 이벤트객체를 넘겨주면  지금 네브들은 밸류속성이 없어서 undefined 뜸 */}


                            {/* 셀렉트에서 선택한 값을 알기 위해 이벤트 객체를 받아야 함 */}

                            <div className='categorySelectArea'>
                                <h2>{tabMap[activeTab]}</h2>
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
                        </>
                    }
                </Container>
            </main>
            <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content="로그인 먼저 하세요." opt={1}></AlertModal>
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
                                <li><a href={localStorage.getItem('id') != null ? process.env.PUBLIC_URL+'/mypage' : process.env.PUBLIC_URL+'/login'}>마이페이지</a></li>
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
export default List;