import { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import './ErrPage.css';
import AlarmModal from './AlarmModal';
import AlertModal from './AlertModal';
import SellModal from './SellModal';

const ErrPage: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [showSellModal, setShowSellModal] = useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const [alarmCount, setAlarmCount] = useState<number>(0);

  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('id') !== null;

  const handleBellClick = () => {
    if (isLoggedIn) {
      setAlarmCount((c) => c + 1);
      setShowAlarmModal((prev) => !prev);
    } else {
      setShowAlertModal(true);
    }
  };

  const handleSellClick = () => {
    if (isLoggedIn) setShowSellModal(true);
    else setShowAlertModal(true);
  };

  return (
    <div className="err-all-container">
      <header>
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
          <Container fluid className="err-navbar-inner">
            <Navbar.Brand as={Link} to="/" className="header-font">
              Funders
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto align-items-center" navbarScroll>
                <Nav.Link as={Link} to="/list" className="me-3">
                  후원하기
                </Nav.Link>
                <Form className="d-flex me-3" role="search" onSubmit={(e) => e.preventDefault()}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    aria-label="검색어"
                  />
                  <Button
                    variant="outline-success"
                    onClick={() => navigate(`/list?keyword=${encodeURIComponent(searchKeyword)}`)}
                  >
                    Search
                  </Button>
                </Form>
                <Nav.Link as={Link} to={isLoggedIn ? '/mypage' : '/login'}>
                  {isLoggedIn ? localStorage.getItem('id') : '로그인'}
                </Nav.Link>
                <div
                  style={{ height: '20px', borderLeft: '1px solid #ccc', margin: '0 10px' }}
                  aria-hidden
                />
                <FontAwesomeIcon
                  icon={faBell}
                  style={{ fontSize: '24px', cursor: 'pointer' }}
                  onClick={handleBellClick}
                  title={`알림 (${alarmCount})`}
                />
                <div
                  style={{ height: '20px', borderLeft: '1px solid #ccc', margin: '0 10px' }}
                  aria-hidden
                />
                <Nav.Link onClick={handleSellClick}>펀딩신청</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <main className="err-main" role="main" aria-labelledby="error-title">
        <Container>
          <div className="err-div">
            <h1>💬</h1>
            <h1 id="error-title" className="header-font">
              404 ERROR
            </h1>
            <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
            <p>존재하지 않는 주소를 입력하셨거나,</p>
            <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
            <Button onClick={() => navigate('/')}>홈으로</Button>
          </div>
        </Container>
      </main>

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
                      handleSellClick();
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
    </div>
  );
};

export default ErrPage;
