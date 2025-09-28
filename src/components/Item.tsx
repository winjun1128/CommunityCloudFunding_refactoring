import { useState, useMemo } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import './Item.css';

import PayModal from './PayModal';
import SellModal from './SellModal';
import AlertModal from './AlertModal';
import AlarmModal from './AlarmModal';
import { useProducts } from '../data/ProductContext';

// ===== 타입들 =====
type TabKey =
  | 'all'
  | 'food'
  | 'living'
  | 'area'
  | 'book'
  | 'learning'
  | 'environment'
  | 'pet'
  | 'travel'
  | 'beauty';

interface Product {
  no: number;
  category: TabKey;
  name: string;
  companyname: string;
  price: number;
  gainmoney: number;
  recruitmoney: number;
  startdate: string;
  enddate: string;
  state: string; // '마감' 등
  percent: number; // 0~100
  heart: string[]; // user ids
  carousellink: string[]; // [0..2]
  intro: string;
  picturelink: string;
  videolink: string;
  imglink?: string;
}

interface UseProducts {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const tabMap: Record<TabKey, string> = {
  all: '전체',
  food: '푸드',
  living: '리빙',
  area: '지역',
  book: '서적',
  learning: '교육',
  environment: '환경',
  pet: '펫',
  travel: '여행',
  beauty: '뷰티',
};

const Item: React.FC = () => {
  const [alertContent, setAlertContent] = useState('로그인 먼저 하세요.');
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [alarmCount, setAlarmCount] = useState<number>(0);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showPayModal, setShowPayModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  const navigate = useNavigate();
  const params = useParams<{ itemno: string }>();

  const { products, setProducts } = useProducts() as UseProducts;

  // 파라미터 파싱 + 상품 찾기 (안전)
  const itemno = useMemo(() => Number(params.itemno), [params.itemno]);
  const item = useMemo(() => products.find((p) => p.no === itemno), [products, itemno]);

  const isLoggedIn = Boolean(localStorage.getItem('id'));
  const userId = localStorage.getItem('id') ?? '';

  const onBellClick = () => {
    if (!isLoggedIn) {
      setShowAlertModal(true);
      return;
    }
    setAlarmCount((prev) => {
      const next = prev + 1;
      setShowAlarmModal(next % 2 === 1);
      return next;
    });
  };

  const toggleHeart = () => {
    if (!item) return;
    if (!isLoggedIn) {
      setAlertContent('로그인 먼저 하세요.');
      setShowAlertModal(true);
      return;
    }
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.no === item.no);
      if (idx < 0) return prev;
      const target = prev[idx];

      const exists = target.heart.includes(userId);
      const nextHeart = exists ? target.heart.filter((id) => id !== userId) : [...target.heart, userId];

      const next = [...prev];
      next[idx] = { ...target, heart: nextHeart };
      return next;
    });
  };

  // 상품이 없을 때 가드
  if (!Number.isFinite(itemno) || !item) {
    return (
      <div className="item-all-container">
        <header>
          <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
            <Container fluid className="item-navbar-inner">
              <Navbar.Brand as={Link} to="/" className="header-font">
                Funders
              </Navbar.Brand>
            </Container>
          </Navbar>
        </header>
        <main className="item-main">
          <Container>
            <h3>존재하지 않는 상품입니다.</h3>
            <Button variant="secondary" onClick={() => navigate('/list')}>
              목록으로 돌아가기
            </Button>
          </Container>
        </main>
      </div>
    );
  }

  const supporters = Math.max(0, Math.floor(item.gainmoney / Math.max(1, item.price)));
  const isClosed = item.state === '마감';
  const liked = item.heart.includes(userId);

  return (
    <div className="item-all-container">
      <header>
        <Navbar expand="lg" className="bg-body-terTIARY shadow-sm">
          <Container fluid className="item-navbar-inner">
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
                    navigate(`/list?keyword=${encodeURIComponent(searchKeyword.trim())}`);
                  }}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                  <Button
                    variant="outline-success"
                    onClick={() => navigate(`/list?keyword=${encodeURIComponent(searchKeyword.trim())}`)}
                  >
                    Search
                  </Button>
                </Form>
                <Nav.Link as={Link} to={isLoggedIn ? '/mypage' : '/login'}>
                  {isLoggedIn ? localStorage.getItem('id') : '로그인'}
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
                <Nav.Link
                  onClick={() => {
                    if (isLoggedIn) setShowSellModal(true);
                    else {
                      setAlertContent('로그인 먼저 하세요.');
                      setShowAlertModal(true);
                    }
                  }}
                >
                  펀딩신청
                </Nav.Link>
              </Nav>
              <AlarmModal
                show={showAlarmModal}
                onClose={() => setShowAlarmModal(false)}
                handleClose={() => setShowAlarmModal(false)}
                content="로그인 먼저 하세요."
                opt={1}
              />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className="item-main">
        <Container>
          <Row className="item-custom-row">
            <Col xs={12} md={6} style={{ height: '600px' }}>
              <Carousel style={{ width: '100%', height: '600px' }}>
                {(item.carousellink ?? []).slice(0, 3).map((src, idx) => (
                  <Carousel.Item style={{ width: '100%', height: '600px' }} key={idx}>
                    <img
                      className="d-block w-100"
                      src={src}
                      alt={`slide-${idx + 1}`}
                      style={{ width: '100%', height: '600px', objectFit: 'cover' }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col xs={12} md={6} style={{ height: '600px' }}>
              <div style={{ height: '90%' }}>
                <p>{tabMap[item.category]}</p>
                <h3 className="itemProductName">{item.name}</h3>
                <p style={{ marginTop: '15px' }}>{item.companyname}</p>
                <h4 style={{ marginTop: '15px' }}>{item.price.toLocaleString()}원</h4>

                <p style={{ marginTop: '30px' }}>
                  <strong>모인금액</strong>
                </p>
                <div className="gain-money">
                  <span>{item.gainmoney.toLocaleString()}원</span>
                  <span>{supporters}명 후원</span>
                  <span style={{ color: 'red' }}>{item.percent}%</span>
                </div>

                <table>
                  <tbody>
                    <tr>
                      <td>
                        <strong>목표금액</strong>
                      </td>
                      <td>{item.recruitmoney.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>모집시작일</strong>
                      </td>
                      <td>{item.startdate}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>모집마감일</strong>
                      </td>
                      <td>{item.enddate}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>상태여부</strong>
                      </td>
                      <td style={{ color: 'red' }}>{item.state}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="like-pay-community" style={{ height: '10%' }}>
                <Button
                  className="go_community"
                  variant="primary"
                  onClick={() => {
                    if (isLoggedIn) navigate(`/community/${itemno}`);
                    else {
                      setAlertContent('로그인 먼저 하세요.');
                      setShowAlertModal(true);
                    }
                  }}
                >
                  게시판가기
                </Button>

                <div className="like-pay">
                  <button disabled={isClosed} onClick={toggleHeart} title={liked ? '좋아요 취소' : '좋아요'}>
                    {liked ? '💘' : '🤍'}
                  </button>

                  <Button
                    size="sm"
                    disabled={isClosed}
                    onClick={() => {
                      if (!isLoggedIn) {
                        setAlertContent('로그인 먼저 하세요.');
                        setShowAlertModal(true);
                        return;
                      }
                      setShowPayModal(true);
                    }}
                  >
                    결제가기
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={12}>
              <div className="item-intro">
                <h4>{item.intro}</h4>
                {item.picturelink && <img src={item.picturelink} alt="intro" />}
                {item.videolink && (
                  <video src={item.videolink} width="100%" height="50%" controls />
                )}

                {/* 안내사항 */}
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

      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content={alertContent}
        opt={1}
      />
      <PayModal itemindex={products.findIndex((p) => p.no === item.no)} show={showPayModal} onClose={() => setShowPayModal(false)} />
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
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (isLoggedIn) setShowSellModal(true);
                      else setShowAlertModal(true);
                    }}
                  >
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

export default Item;
