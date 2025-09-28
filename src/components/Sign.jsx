import { useState, FormEvent, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sign.css';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import SellModal from './SellModal';
import AlertModal from './AlertModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AlarmModal from './AlarmModal';

const Sign: React.FC = () => {
  const [alertContent, setAlertContent] = useState<string>('로그인 먼저 하세요.');
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);
  const [agree2, setAgree2] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>('');
  const [userPass, setUserPass] = useState<string>('');
  const [userPassChk, setUserPassChk] = useState<string>('');

  const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const [alarmCount, setAlarmCount] = useState<number>(0);

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [showSellModal, setShowSellModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const isLoggedIn = Boolean(localStorage.getItem('id'));
  const currentUserId = localStorage.getItem('id') ?? '로그인';

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = searchKeyword.trim();
    navigate(`/list?keyword=${encodeURIComponent(q)}`);
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

  const onCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  const onSubmitSignUp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userId.trim() === '' || userPass.trim() === '') {
      setAlertContent('아이디와 비밀번호를 입력해주세요!');
      setShowAlertModal(true);
      return;
    }
    if (userPass.trim() !== userPassChk.trim()) {
      setAlertContent('비밀번호가 다릅니다.!');
      setShowAlertModal(true);
      return;
    }
    if (!agree || !agree2) {
      setAlertContent('필수약관 동의해주세요.!');
      setShowAlertModal(true);
      return;
    }
    navigate('/login');
  };

  return (
    <div>
      <div className="sign-header-container">
        <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
          <Container fluid className="sign-navbar-inner">
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
      </div>

      <div className="sign-container">
        <h1 className="header-font">Funders</h1>

        <div className="form-wrapper">
          <div className="sign-header-container">
            <h2>회원가입</h2>
          </div>

          <div className="SignContainer">
            <div className="SignInputBox">
              <label htmlFor="userId">아이디</label>
              <input
                id="userId"
                type="text"
                placeholder="아이디"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div className="SignInputBox">
              <label htmlFor="userPw">비밀번호</label>
              <input
                id="userPw"
                type="password"
                placeholder="비밀번호"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
                required
              />
            </div>

            <div className="SignInputBox">
              <label htmlFor="userPwChk">비밀번호 확인</label>
              <input
                id="userPwChk"
                type="password"
                placeholder="비밀번호 확인"
                value={userPassChk}
                onChange={(e) => setUserPassChk(e.target.value)}
                required
              />
            </div>

            <div className="SignInputBox">
              <label htmlFor="userName">이름</label>
              <input id="userName" type="text" placeholder="이름" />
            </div>

            <div className="SignInputBox">
              <label htmlFor="userPn">전화번호</label>
              <input
                id="userPn"
                type="tel"
                value={phone}
                onChange={(e) => {
                  const onlyNumber = e.target.value.replace(/[^0-9-]/g, '');
                  setPhone(onlyNumber);
                }}
                placeholder="010-1234-5678"
                inputMode="numeric"
                pattern="[0-9\-]*"
              />
            </div>

            <div className="SignInputBox">
              <label htmlFor="userAddr">주소</label>
              <input id="userAddr" type="text" placeholder="주소" />
            </div>

            <div className="agree-section">
              <label>
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />{' '}
                개인정보 수집 및 이용 (필수)
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={agree2}
                  onChange={(e) => setAgree2(e.target.checked)}
                />{' '}
                사이트 이용 약관 (필수)
              </label>
              <label>
                <input type="checkbox" /> 위치기반 서비스 이용 (선택)
              </label>
            </div>

            <div className="warning">※ 필수 약관 미 동의 시 회원가입 불가능</div>

            <div className="button-group">
              <button className="cancel" onClick={onCancel}>
                취소
              </button>
              <button onClick={onSubmitSignUp}>가입</button>
            </div>
          </div>
        </div>
      </div>

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

export default Sign;
