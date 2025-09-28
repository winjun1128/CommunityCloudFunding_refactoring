import { useMemo, useState, MouseEvent } from 'react';
import { Navbar, Nav, Form, Button, ProgressBar, Card, Row, Col, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';
import AlarmModal from './AlarmModal';
import SellModal from './SellModal';
import EditModal from './EditModal'; // 사용 중 아니어도 보존
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import './List.css';

// ===== 타입들 =====
export interface Product {
  no: number;
  imglink: string;
  name: string;
  companyname: string;
  state: string;
  startdate: string; // 문자열 날짜
  enddate: string;   // 문자열 날짜
  percent: number;   // 0~100
  category: TabKey;  // 상품 카테고리
}

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

type SortKey = 'all' | 'open-order' | 'close-order' | 'percent';

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

const List: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const PUBLIC_URL = process.env.PUBLIC_URL ?? '';

  const { products } = useProducts() as UseProducts;

  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showAlarmModal, setShowAlarmModal] = useState(false);
  const [alarmCount, setAlarmCount] = useState<number>(0);
  const [showSellModal, setShowSellModal] = useState(false);

  const [in_SearchKeyword, in_SetSearchKeyword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [category, setCategory] = useState<SortKey>('all');

  const params = new URLSearchParams(location.search);
  const keywordParam = params.get('keyword') ?? '';

  const isLoggedIn = Boolean(localStorage.getItem('id'));
  const currentUserId = localStorage.getItem('id') ?? '로그인';

  // ===== 이벤트 핸들러 =====
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

  const onFundingApplyClick = (e?: MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    if (isLoggedIn) setShowSellModal(true);
    else setShowAlertModal(true);
  };

  const handleSearch = () => {
    const q = encodeURIComponent(in_SearchKeyword.trim());
    navigate(`/list?keyword=${q}`);
  };

  // ===== 공통 렌더 블록 =====
  const renderProductGrid = (list: Product[]) => {
    const rows: JSX.Element[] = [];
    for (let i = 0; i < list.length; i += 4) {
      const group = list.slice(i, i + 4);
      rows.push(
        <Row className="custom-row" key={`row-${i}`}>
          {group.map((item) => (
            <Col md={3} key={item.no}>
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
      );
    }
    return rows;
  };

  // ===== 검색 =====
  const effectiveKeyword = (in_SearchKeyword || keywordParam).trim();
  const keywordResult = useMemo(() => {
    if (!effectiveKeyword) return [];
    const lower = effectiveKeyword.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(lower));
  }, [effectiveKeyword, products]);

  // ===== 카테고리/정렬 =====
  const filteredByTab = useMemo(() => {
    if (activeTab === 'all') return products;
    return products.filter((p) => p.category === activeTab);
  }, [activeTab, products]);

  const sortedForTab = useMemo(() => {
    if (category === 'open-order') {
      return [...filteredByTab].sort(
        (a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
      );
    }
    if (category === 'close-order') {
      return [...filteredByTab].sort(
        (a, b) => new Date(a.enddate).getTime() - new Date(b.enddate).getTime()
      );
    }
    if (category === 'percent') {
      // 진행도 내림차순
      return [...filteredByTab].sort((a, b) => b.percent - a.percent);
    }
    return filteredByTab;
  }, [category, filteredByTab]);

  const sortedAll = useMemo(() => {
    if (category === 'open-order') {
      return [...products].sort(
        (a, b) => new Date(a.startdate).getTime() - new Date(b.startdate).getTime()
      );
    }
    if (category === 'close-order') {
      return [...products].sort(
        (a, b) => new Date(a.enddate).getTime() - new Date(b.enddate).getTime()
      );
    }
    if (category === 'percent') {
      return [...products].sort((a, b) => b.percent - a.percent);
    }
    return products;
  }, [category, products]);

  return (
    <div className="list-all-container">
      <header>
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
          <Container fluid className="list-navbar-inner">
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
                    value={in_SearchKeyword}
                    onChange={(e) => in_SetSearchKeyword(e.target.value)}
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

      <main className="list-main">
        <Container>
          {(in_SearchKeyword || keywordParam) ? (
            <>
              <h1>검색내용</h1>
              {renderProductGrid(keywordResult)}
            </>
          ) : (
            <>
              {/* 카테고리 상단 아이콘 */}
              <Row className="justify-content-center" style={{ marginTop: '50px', cursor: 'pointer' }}>
                {(Object.keys(tabMap) as TabKey[]).map((key) => (
                  <Col xs="auto" key={key}>
                    <div
                      onClick={() => setActiveTab(key)}
                      className={`category-image ${activeTab === key ? 'active' : ''}`}
                    >
                      <img
                        src={`${PUBLIC_URL}/images/${key}.jpg`}
                        style={{ width: '36px', height: '36px' }}
                      />
                      <p>{tabMap[key]}</p>
                    </div>
                  </Col>
                ))}
              </Row>

              {/* 정렬 선택 */}
              <div className="categorySelectArea">
                <h2>{tabMap[activeTab]}</h2>
                <select
                  id="categorySelect"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SortKey)}
                >
                  <option value="all">전체</option>
                  <option value="open-order">등록순</option>
                  <option value="close-order">마감임박순</option>
                  <option value="percent">진행도</option>
                </select>
              </div>

              {/* 상품 그리드 */}
              {activeTab === 'all' ? renderProductGrid(sortedAll) : renderProductGrid(sortedForTab)}
            </>
          )}
        </Container>
      </main>

      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content="로그인 먼저 하세요."
        opt={1}
      />
      <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} />
      {/* EditModal은 필요한 곳에서 열어 사용하세요 */}
      {/* <EditModal ... /> */}

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
                      onFundingApplyClick();
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

export default List;
