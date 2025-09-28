import { useState, FormEvent } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';
import SellModal from './SellModal';
import AlarmModal from './AlarmModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import './LogIn.css';

const LogIn: React.FC = () => {
  const [alertContent, setAlertContent] = useState<string>('로그인 먼저 하세요.');
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const [showSellModal, setShowSellModal] = useState<boolean>(false);

  const [userid, setUserid] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const [alarmCount, setAlarmCount] = useState<number>(0);

  const isLoggedIn = Boolean(localStorage.getItem('id'));
  const currentUserId = localStorage.getItem('id') ?? '로그인';

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = searchKeyword.trim();
    navigate(`/list?keyword=${encodeURIComponent(q)}`);
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userid.trim() === '' || password.trim() === '') {
      setAlertContent('아이디와 비밀번호를 입력하세요!');
      setShowAlertModal(true);
      return;
    }
    localStorage.setItem('id', userid);
    setMessage('로그인 성공');
    navigate('/');
  };

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

  const onClickFundingApply = () => {
    if (isLoggedIn) setShowSellModal(true);
    else {
      setAlertContent('로그인 먼저 하세요.');
      setShowAlertModal(true);
    }
  };

  return (
    <div>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
          <Container fluid className="login-navbar-inner">
            <Navbar.Brand as={Link} to="/" className="header-font">
              Funders
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto align-items-center" navbarScroll>
                <Nav.Link as={Link} to="/list" className="me-3">
                  후원하기
                </Nav.Link>

                <Form className="d-flex me-3" onSubmit={handleSearchSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    aria-label="검색어"
                  />
                  <Button variant="outline-success" type="submit">
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

                <Nav.Link onClick={onClickFundingApply}>펀딩신청</Nav.Link>
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

      <main className="login-main">
        <div className="login_container">
          <div>
            <div className="login-title">
              <h1>Funders</h1>
            </div>

            <form className="login_form" onSubmit={handleLoginSubmit}>
              <h2>로그인</h2>

              <div className="form-group">
                <label htmlFor="userid">아이디</label>
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  value={userid}
                  onChange={(e) => setUserid(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="buttons">
                <button type="button" onClick={() => navigate('/sign')}>
                  회원가입
                </button>
                <button type="submit">로그인</button>
              </div>
            </form>
          </div>

          <p className="login-p" style={{ color: message === '로그인 성공' ? 'green' : 'red' }}>
            {message}
          </p>
        </div>
      </main>

      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content={alertContent}
        opt={1}
      />
      <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} />
    </div>
  );
};

export default LogIn;
