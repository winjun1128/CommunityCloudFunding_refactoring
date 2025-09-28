import { useState, useMemo, MouseEvent } from 'react';
import { Card, Container, Row, Col, Navbar, Nav, Form, Button, ProgressBar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import './Index.css';
import SellModal from '../pages/SellModal';
import { useProducts } from '../data/ProductContext';
import AlertModal from '../pages/AlertModal';
import AlarmModal from '../pages/AlarmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

// ===== 타입 정의 =====
export interface Product {
  no: number;
  imglink: string;
  name: string;
  companyname: string;
  state: string;
  startdate: string; // 날짜 문자열 형식이면 string, Date이면 Date로 변경
  enddate: string;   // 동일
  percent: number;
  count: number;
  heart: string[];   // 좋아요 누른 사용자 id 리스트 등
}

// useProducts 훅의 반환 타입(프로젝트에 맞게 수정 가능)
interface UseProducts {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Index: React.FC = () => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [alarmCount, setAlarmCount] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [showSellModal, setShowSellModal] = useState(false);

  const navigate = useNavigate();

  // PUBLIC_URL은 string | undefined 이므로 안전하게 처리
  const PUBLIC_URL = process.env.PUBLIC_URL ?? '';

  // useProducts 타입 단언(정의가 TS라면 제네릭으로 대체 가능)
  const { products /*, setProducts*/ } = useProducts() as UseProducts;

  // 인기/좋아요 정렬은 useMemo로 메모이징
  const countSortedProducts = useMemo<Product[]>(() => {
    return [...products]
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  }, [products]);

  const heartSortedProducts = useMemo<Product[]>(() => {
    return [...products]
      .sort((a, b) => (b.heart?.length ?? 0) - (a.heart?.length ?? 0))
      .slice(0, 4);
  }, [products]);

  const isLoggedIn = Boolean(localStorage.getItem('id'));
  const currentUserId = localStorage.getItem('id') ?? '로그인';

  const handleSearch = () => {
    const q = encodeURIComponent(searchKeyword.trim());
    navigate(`/list?keyword=${q}`);
  };

  const onBellClick = () => {
    if (isLoggedIn) {
      setAlarmCount((prev) => {
        const next = prev + 1;
        // 홀수 번 클릭 시 열기, 짝수 번 클릭 시 닫기
        setShowAlarmModal(next % 2 === 1);
        return next;
      });
    } else {
      setShowAlertModal(true);
    }
  };

  const onFundingApplyClick = (e?: MouseEvent<HTMLAnchorElement>) => {
    // a 태그에 href="#"가 있을 경우 화면 점프 방지
    if (e) e.preventDefault();
    if (isLoggedIn) {
      setShowSellModal(true);
    } else {
      setShowAlertModal(true);
    }
  };

  return (
    <div className="index-all-container">
      <header>
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
          <Container fluid className="index-navbar-inner">
            <Navbar.Brand as={Link} to="/" className="header-font">
              Funders
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto align-items-center" navbarScroll>
                <Nav.Link as={Link} to="/list" className="me-3">
                  후원하기
                </Nav.Link>

                <Form
                  className="d-flex me-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSearch();
                  }}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <Button variant="outline-success" onClick={handleSearch}>
                    Search
                  </Button>
                </Form>

                <Nav.Link as={Link} to={isLoggedIn ? '/mypage' : '/login'}>
                  {isLoggedIn ? currentUserId : '로그인'}
                </Nav.Link>

                <div
                  style={{
                    height: '20px',
                    borderLeft: '1px solid #ccc',
                    margin: '0 10px',
                  }}
                />

                <FontAwesomeIcon
                  icon={faBell}
                  style={{ fontSize: '24px', cursor: 'pointer' }}
                  onClick={onBellClick}
                />

                <div
                  style={{
                    height: '20px',
                    borderLeft: '1px solid #ccc',
                    margin: '0 10px',
                  }}
                />

                <Nav.Link onClick={() => (isLoggedIn ? setShowSellModal(true) : setShowAlertModal(true))}>
                  펀딩신청
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className="index-main">
        <Container>
          {/* 메인 캐러셀 */}
          <Carousel style={{ width: '100%', height: '400px' }}>
            <Carousel.Item style={{ width: '100%', height: '400px' }}>
              <img
                className="d-block"
                src={`${PUBLIC_URL}/images/event1.jpg`}
                alt="First slide"
                style={{ width: '100%', height: '400px' }}
              />
            </Carousel.Item>

            <Carousel.Item style={{ width: '100%', height: '400px' }}>
              <img
                className="d-block"
                src={`${PUBLIC_URL}/images/event2.jpg`}
                alt="Second slide"
                style={{ width: '100%', height: '400px' }}
              />
            </Carousel.Item>

            <Carousel.Item style={{ width: '100%', height: '400px' }}>
              <img
                className="d-block"
                src={`${PUBLIC_URL}/images/event3.jpg`}
                alt="Third slide"
                style={{ width: '100%', height: '400px' }}
              />
            </Carousel.Item>
          </Carousel>

          {/* 인기 펀딩 */}
          <h2 className="hotfunding">인기펀딩✨</h2>
          <Row className="custom-row">
            {countSortedProducts.map((item) => (
              <Col md={3} key={`hot-${item.no}`}>
                <Card>
                  <Link to={`/item/${item.no}`}>
                    <Card.Img variant="top" src={item.imglink} />
                  </Link>
                  <Card.Body>
                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card.Title className="ellipsis-multiline">{item.name}</Card.Title>
                    </Link>
                    <div className="list-card-text">
                      <span className="company-text" style={{ textAlign: 'left' }}>
                        {item.companyname}
                      </span>
                      <span className="state-text" style={{ color: 'red' }}>
                        {item.state}
                      </span>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <strong>시작일자:&nbsp;&nbsp;</strong>
                      {item.startdate}
                    </small>
                  </Card.Footer>
                  <Card.Footer>
                    <small className="text-muted">
                      <strong>마감일자:&nbsp;&nbsp;</strong>
                      {item.enddate}
                    </small>
                  </Card.Footer>
                  <Card.Footer>
                    <ProgressBar now={item.percent} label={`${item.percent}%`} />
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {/* 좋아요 펀딩 */}
          <h2 className="heartfunding">좋아요 펀딩💘</h2>
          <Row className="custom-row">
            {heartSortedProducts.map((item) => (
              <Col md={3} key={`heart-${item.no}`}>
                <Card>
                  <Link to={`/item/${item.no}`}>
                    <Card.Img variant="top" src={item.imglink} />
                  </Link>
                  <Card.Body>
                    <Link to={`/item/${item.no}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card.Title className="ellipsis-multiline">{item.name}</Card.Title>
                    </Link>
                    <div className="list-card-text">
                      <span className="company-text" style={{ textAlign: 'left' }}>
                        {item.companyname}
                      </span>
                      <span className="state-text" style={{ color: 'red' }}>
                        {item.state}
                      </span>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      <strong>시작일자:&nbsp;&nbsp;</strong>
                      {item.startdate}
                    </small>
                  </Card.Footer>
                  <Card.Footer>
                    <small className="text-muted">
                      <strong>마감일자:&nbsp;&nbsp;</strong>
                      {item.enddate}
                    </small>
                  </Card.Footer>
                  <Card.Footer>
                    <ProgressBar now={item.percent} label={`${item.percent}%`} />
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>

          {/* 소개 비디오 */}
          <div style={{ width: '100%', height: '600px', overflow: 'hidden', marginBottom: '40px' }}>
            <video
              controls
              loop
              muted
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src={`${PUBLIC_URL}/videos/Funders_intro.mp4`} type="video/mp4" />
            </video>
          </div>

          {/* 광고 캐러셀 */}
          <Carousel style={{ width: '100%', height: '500px' }}>
            <Carousel.Item style={{ width: '100%', height: '500px' }}>
              <Row className="ad-slide1 align-items-center" style={{ height: '100%' }}>
                <Col md={6} className="ad-image-container">
                  <img
                    className="d-block w-100 zoom-in"
                    src={`${PUBLIC_URL}/images/bam1.jpg`}
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
                    <h2 className="text-jump">3,800원</h2>
                    <br />
                    <Button onClick={() => navigate('item/1')} className="blink-button1" variant="danger">
                      지금 보러가기
                    </Button>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>

            <Carousel.Item style={{ width: '100%', height: '500px' }}>
              <Row className="ad-slide2 align-items-center" style={{ height: '100%' }}>
                <Col md={6} className="ad-image-container">
                  <img
                    className="d-block w-100 zoom-in"
                    src={`${PUBLIC_URL}/images/item2_1.jpg`}
                    alt="광고 이미지"
                    style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                  />
                </Col>
                <Col md={6} className="ad-text-area">
                  <div className="ad-text">
                    <h1 className="slide-in">신제품 믹싱볼 등록!</h1>
                    <h2>믹싱볼</h2>
                    <h3>믹싱볼컴퍼니</h3>
                    <p>지금 등록 할인가로 만나보세요!</p>
                    <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10,000원</span>
                    <h2 className="text-jump">15,000원</h2>
                    <br />
                    <Button onClick={() => navigate('item/2')} className="blink-button1" variant="danger">
                      지금 보러가기
                    </Button>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>

            <Carousel.Item style={{ width: '100%', height: '500px' }}>
              <Row className="ad-slide3 align-items-center" style={{ height: '100%' }}>
                <Col md={6} className="ad-image-container">
                  <img
                    className="d-block w-100 zoom-in"
                    src={`${PUBLIC_URL}/images/item3_1.jpg`}
                    alt="광고 이미지"
                    style={{ height: '100%', objectFit: 'cover', borderRadius: '10px' }}
                  />
                </Col>
                <Col md={6} className="ad-text-area">
                  <div className="ad-text">
                    <h1 className="slide-in">신제품 사과주스 등록!</h1>
                    <h2>사과주스</h2>
                    <h3>사과주스컴퍼니</h3>
                    <p>지금 등록 할인가로 만나보세요!</p>
                    <span style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>10,000원</span>
                    <h2 className="text-jump">18,900원</h2>
                    <br />
                    <Button onClick={() => navigate('item/3')} className="blink-button1" variant="danger">
                      지금 보러가기
                    </Button>
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>
      </main>

      {/* 모달들 */}
      <AlarmModal
        show={showAlarmModal}
        onClose={() => setShowAlarmModal(false)}
        handleClose={() => setShowAlarmModal(false)}
        content="로그인 먼저 하세요."
        opt={1}
      />
      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content="로그인 먼저 하세요."
        opt={1}
      />
      <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} />

      <footer className="footer">
        <Container>
          <Row>
            <Col md={4}>
              <h5 className="footer-title">5판3선</h5>
              <p className="footer-text">
                천안시 동남구 대흥로 215
                <br />
                백자빌딩 7층
              </p>
              <p className="footer-text">전화: 041-561-1126</p>
            </Col>
            <Col md={4}>
              <h6 className="footer-title">고객지원</h6>
              <ul className="footer-list">
                <li>
                  <a href="#">자주 묻는 질문</a>
                </li>
                <li>
                  <a href="#">문의하기</a>
                </li>
                <li>
                  <a href="#">이용약관</a>
                </li>
                <li>
                  <a href="#">개인정보처리방침</a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h6 className="footer-title">서비스</h6>
              <ul className="footer-list">
                <li>
                  <a href="#" onClick={onFundingApplyClick}>
                    펀딩 신청
                  </a>
                </li>
                <li>
                  <Link to={isLoggedIn ? '/mypage' : '/login'}>마이페이지</Link>
                </li>
                <li>
                  <a
                    href="https://www.notion.so/20322dc2b142800f9264d7662c846fa5?source=copy_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    이용 가이드
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <hr />
          <p className="text-center small text-muted">© 2025 Funders. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
