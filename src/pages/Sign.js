import { Navigate, useNavigate } from 'react-router-dom';
import './Sign.css'
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap'
function Sign() {
    const navigate = useNavigate();
    return (
        <div>
            <div className='sign-header-container'>
                <Navbar expand="lg" className="bg-body-tertiary" fixed='top' style={{ boxShadow: '5px 5px 5px gray' }}>
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

                                <Nav.Link href="#action2">마이페이지</Nav.Link>
                                <Nav.Link href="#action3">펀딩신청</Nav.Link>
                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <div class="sign-container">
                <div class="form-wrapper">
                    <div class="sign-header-container">
                        <h2>회원가입</h2>
                    </div>

                    <div class="SignContainer">
                        <div class="SignInputBox">
                            <label>아이디</label>
                            <input type="text" placeholder="아이디"/>
                        </div>

                        <div class="SignInputBox">
                            <label>비밀번호</label>
                            <input type="password" placeholder="비밀번호"/>
                        </div>

                        <div class="SignInputBox">
                            <label>비밀번호 확인</label>
                            <input type="password" placeholder="비밀번호 확인"/>
                        </div>

                        <div class="SignInputBox">
                            <label>이름</label>
                            <input type="text" placeholder="이름"/>
                        </div>

                        <div class="SignInputBox">
                            <label>전화번호</label>
                            <input type="text" placeholder="전화번호"/>
                        </div>

                        <div class="SignInputBox">
                            <label>주소</label>
                            <input type="text" placeholder="주소"/>
                        </div>

                        <div class="agree-section">
                            <label><input type="checkbox"/> 개인정보 수집 및 이용 (필수)</label>
                            <label><input type="checkbox"/> 사이트 이용 약관 (필수)</label>
                            <label><input type="checkbox"/> 위치기반 서비스 이용 (선택)</label>
                        </div>

                        <div class="warning">
                            ※ 필수 약관 미 동의 시 회원가입 불가능
                        </div>

                        <div class="button-group">
                            <button class="cancel">취소</button>
                            <button onClick={()=>navigate("/login")}>가입</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sign;