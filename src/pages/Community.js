import { Container, Navbar, Nav, Form, Button, InputGroup,Row,Col } from "react-bootstrap";
import './Community.css';
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PostWriteModal from './PostWriteModal';
import PostSettingModal from "./PostSettingModal";
import PostModal from "./PostModal";
import SellModal from "./SellModal";
import { useProducts } from "../data/ProductContext";
import AlertModal from "./AlertModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import AlarmModal from './AlarmModal';

function Community() {
    const [showAlertModal,setShowAlertModal] = useState(false);
    const { products, setProducts } = useProducts(); //이제 products 배열 사용 가능
    let { itemno } = useParams();
    const itemindex = products.findIndex(product => product.no === Number(itemno));
    const [filteredPostKeyword, setFilteredPostKeyword] = useState('');
    const [searchPost, setSearchPost] = useState('');

    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');

    const [selectedPost, setSelectedPost] = useState(null);
    const [updatePost, setUpdatePost] = useState(null);
    const [showAlarmModal, setShowAlarmModal] = useState(false);

    useEffect(() => {
        if (itemindex === -1) {
            alert("잘못된 상품 번호입니다.");
            navigate("/list");
        }
    }, [itemindex]);

    const originCmtAr = [
        { id: '아이디1', date: new Date().toLocaleDateString(), comment: '댓글' },
        { id: '아이디2', date: new Date().toLocaleDateString(), comment: '댓글2' }
    ];

    const [commentAr, setCommentAr] = useState(originCmtAr);

    // const handleAddCommentAr = (newCmt) =>{
    //     setCommentAr([newCmt,...commentAr]);
    // }


    const [postNum, setPostNum] = useState([6, 6]);

    const postContents = [
        "포인트 사용에 대한 내용입니다.",
        "서비스 개선 안내에 대한 내용입니다.",
        "이벤트 참여 방법에 대한 내용입니다.",
        "시스템 점검 안내에 대한 내용입니다.",
        "주소 변경 방법에 대한 내용입니다.",
        "계정 삭제 방법에 대한 내용입니다.",
        "약관 변경 안내에 대한 내용입니다.",
        "결제 취소 관련 내용입니다.",
        "상품 미도착 관련 내용입니다.",
        "서버 점검 완료 안내에 대한 내용입니다.",
        "비밀번호 변경 방법에 대한 내용입니다.",
        "개인정보 보호 강화에 대한 내용입니다.",
        "이메일 수신 설정에 대한 내용입니다.",
        "업데이트 내역에 대한 내용입니다.",
        "이미지 업로드 오류에 대한 내용입니다.",
        "서비스 정책 변경에 대한 내용입니다.",
        "재가입 관련 내용입니다.",
        "공지사항 시스템 개편에 대한 내용입니다.",
        "후원 내역 관련 내용입니다.",
        "긴급 공지 사항에 대한 내용입니다.",
        "마이페이지 오류에 대한 내용입니다.",
        "결제 수단 추가에 대한 내용입니다.",
        "모바일 UI 업데이트에 대한 내용입니다.",
        "다크모드 관련 내용입니다.",
        "카테고리 정비에 대한 내용입니다.",
        "후원 취소 가능 여부에 대한 내용입니다.",
        "공지사항 테스트에 대한 내용입니다.",
        "프로필 편집 방법에 대한 내용입니다.",
        "초기 셋업 안내에 대한 내용입니다.",
        "첫 글입니다에 대한 내용입니다."
    ];


    const [posts, setPosts] = useState([
        { no: 30, type: 'Q&A', title: '포인트는 어떻게 사용하나요?', content: postContents[0], userId: 'user30', date: '2025-05-30 14:10', view: 1 },
        { no: 29, type: '공지', title: '서비스 개선 안내', content: postContents[1], userId: 'admin', date: '2025-05-30 12:45', view: 2 },
        { no: 28, type: 'Q&A', title: '이벤트 참여 방법은?', content: postContents[2], userId: 'user28', date: '2025-05-30 11:33', view: 3 },
        { no: 27, type: '공지', title: '시스템 점검 안내', content: postContents[3], userId: 'admin', date: '2025-05-29 18:50', view: 4 },
        { no: 26, type: 'Q&A', title: '주소 변경은 어디서 하나요?', content: postContents[4], userId: 'user26', date: '2025-05-29 17:20', view: 5 },
        { no: 25, type: 'Q&A', title: '계정 삭제는 어떻게 하나요?', content: postContents[5], userId: 'user25', date: '2025-05-29 16:05', view: 6 },
        { no: 24, type: '공지', title: '약관 변경 안내', userId: 'admin', content: postContents[6], date: '2025-05-29 09:00', view: 7 },
        { no: 23, type: 'Q&A', title: '결제 취소는 언제까지 되나요?', content: postContents[7], userId: 'user23', date: '2025-05-28 21:30', view: 8 },
        { no: 22, type: 'Q&A', title: '상품이 도착하지 않았어요', content: postContents[8], userId: 'user22', date: '2025-05-28 18:12', view: 9 },
        { no: 21, type: '공지', title: '서버 점검 완료 안내', content: postContents[9], userId: 'admin', date: '2025-05-28 15:45', view: 10 },
        { no: 20, type: 'Q&A', title: '비밀번호는 어떻게 바꾸나요?', content: postContents[10], userId: 'user20', date: '2025-05-27 22:10', view: 11 },
        { no: 19, type: '공지', title: '개인정보 보호 강화', content: postContents[11], userId: 'admin', date: '2025-05-27 17:25', view: 12 },
        { no: 18, type: 'Q&A', title: '이메일 수신 설정은?', content: postContents[12], userId: 'user18', date: '2025-05-27 15:05', view: 13 },
        { no: 17, type: '공지', title: '업데이트 내역 안내', content: postContents[13], userId: 'admin', date: '2025-05-27 10:00', view: 14 },
        { no: 16, type: 'Q&A', title: '이미지 업로드가 안돼요', content: postContents[14], userId: 'user16', date: '2025-05-26 19:30', view: 15 },
        { no: 15, type: '공지', title: '서비스 정책 변경', content: postContents[15], userId: 'admin', date: '2025-05-26 13:10', view: 16 },
        { no: 14, type: 'Q&A', title: '탈퇴 후 재가입은?', content: postContents[16], userId: 'user14', date: '2025-05-26 09:50', view: 17 },
        { no: 13, type: '공지', title: '공지사항 시스템 개편', content: postContents[17], userId: 'admin', date: '2025-05-25 18:00', view: 18 },
        { no: 12, type: 'Q&A', title: '후원 내역이 안 보여요', content: postContents[18], userId: 'user12', date: '2025-05-25 14:55', view: 19 },
        { no: 11, type: '공지', title: '긴급 공지', content: postContents[19], userId: 'admin', date: '2025-05-25 08:40', view: 20 },
        { no: 10, type: 'Q&A', title: '마이페이지 오류', content: postContents[20], userId: 'user10', date: '2025-05-24 20:10', view: 21 },
        { no: 9, type: 'Q&A', title: '결제 수단 추가는?', content: postContents[21], userId: 'user09', date: '2025-05-24 15:35', view: 22 },
        { no: 8, type: '공지', title: '모바일 UI 업데이트', content: postContents[22], userId: 'admin', date: '2025-05-24 13:00', view: 23 },
        { no: 7, type: 'Q&A', title: '다크모드는 없나요?', content: postContents[23], userId: 'user07', date: '2025-05-23 19:45', view: 24 },
        { no: 6, type: '공지', title: '카테고리 정비 안내', content: postContents[24], userId: 'admin', date: '2025-05-23 12:30', view: 25 },
        { no: 5, type: 'Q&A', title: '후원 취소 가능한가요?', content: postContents[25], userId: 'user05', date: '2025-05-22 21:10', view: 26 },
        { no: 4, type: '공지', title: '공지사항 테스트', content: postContents[26], userId: 'admin', date: '2025-05-22 17:25', view: 27 },
        { no: 3, type: 'Q&A', title: '프로필 편집 방법', content: postContents[27], userId: 'user03', date: '2025-05-21 13:15', view: 28 },
        { no: 2, type: '공지', title: '초기 셋업 안내', content: postContents[28], userId: 'admin', date: '2025-05-21 10:00', view: 29 },
        { no: 1, type: 'Q&A', title: '첫 글입니다', content: postContents[29], userId: 'user01', date: '2025-05-20 08:45', view: 30 }
    ]);


    let idName = '아이디1';             //로그인 된 아이디를 넣기
    const [tableIndex, setTableIndex] = useState(0);
    // const [count, setCount] = useState(2);  // 배열 길이를 나타내는 값 / 배열 푸시했을때 셋카운트 호출하기
    const [showSetting, setShowSetting] = useState(false);

    // useEffect(() => {
    //     const temp = [];
    //     for (let i = 0; i < count; i++) {
    //         temp.push(false);
    //     }
    //     setShowSetting(temp);
    // }, [count]); // count가 바뀔 때마다 재실행

    const [showSellModal, setShowSellModal] = useState(false);
    const [showPostModal, setShowPostModal] = useState(false);
    const [showSettingModal, setShowSettingModal] = useState(false);
    let [alarmCount, setAlarmCount] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [showTableTab, setShowTableTab] = useState('전체');

    const handleAddPostIndex = (newPost) => {
        let temp = [...posts];
        temp.unshift(newPost);
        setPosts(temp);
    }
    const filteredPosts = filteredPostKeyword ? posts.filter(post => post.title.includes(filteredPostKeyword)) : posts;

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const currentPosts = filteredPosts.slice(firstIndex, lastIndex);
    const totalPages = filteredPostKeyword ? Math.ceil(filteredPosts.length / postsPerPage) : Math.ceil(posts.length / postsPerPage);
    const getContent = () => {
        return (
            <table className="table table-bordered text-center centered-cell hover-table">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>유형</th>
                        <th>제목</th>
                        <th>아이디</th>
                        <th>작성일</th>
                        <th>조회수</th>
                        <th>설정</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPosts.map((row) => {
                        return (
                            <tr key={row.no}>
                                <td>{row.no}</td>
                                <td>{row.type}</td>
                                <td onClick={() => {
                                    let selectIndex = posts.findIndex(item => item.no === row.no);
                                    let temp = [...posts];
                                    temp[selectIndex].view += 1;
                                    setPosts(temp);
                                    setSelectedPost({ no: row.no, type: row.type, id: row.userId, date: row.date, title: row.title, content: row.content }); // 선택된 게시글 정보 저장
                                    setShowPostModal(true);
                                }}><Link to='#' style={{ textDecoration: 'none' }}>{row.title}</Link></td>
                                <td>{row.userId}</td>
                                <td>{row.date}</td>
                                <td>{row.view}</td>
                                <td>
                                    {/* 아이디가 "아이디1"이고, 현재 hover된 유저일 때만 버튼 보이기 */}
                                    {row.userId === localStorage.getItem('id') && (
                                        <Button variant="light" onClick={() => {
                                            setShowSettingModal(true);
                                            setUpdatePost({
                                                no: row.no,
                                                type: row.type,
                                                id: row.userId,
                                                date: row.date,
                                                title: row.title,
                                                content: row.content
                                            });
                                        }}>
                                            수정
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
    const noticePosts = posts.filter(post => post.type === '공지');
    const filteredNoticePosts = filteredPostKeyword ? noticePosts.filter(post => post.title.includes(filteredPostKeyword)) : noticePosts;
    const [currentNoticePage, setCurrentNoticePage] = useState(1);
    const noticePostsPerPage = 6;
    const noticeLastIndex = currentNoticePage * noticePostsPerPage;
    const noticeFirstIndex = noticeLastIndex - noticePostsPerPage;
    const currentNoticePosts = filteredNoticePosts.slice(noticeFirstIndex, noticeLastIndex);
    const noticeTotalPages = filteredPostKeyword ? Math.ceil(filteredNoticePosts.length / noticePostsPerPage) : Math.ceil(noticePosts.length / noticePostsPerPage);

    const getContentNotice = () => {
        return (
            <table className="table table-bordered text-center centered-cell hover-table">
                <thead className="table-light">
                    <tr>
                        <th>번호</th>
                        <th>유형</th>
                        <th>제목</th>
                        <th>아이디</th>
                        <th>작성일</th>
                        <th>조회수</th>
                        <th>설정</th>
                    </tr>
                </thead>
                <tbody>
                    {currentNoticePosts.map((row) => {
                        const contentIndex = 30 - row.no;
                        return (
                            <tr key={row.no}>
                                <td>{row.no}</td>
                                <td>{row.type}</td>
                                <td onClick={() => {
                                    let selectIndex = posts.findIndex(item => item.no === row.no);
                                    let temp = [...posts];
                                    temp[selectIndex].view += 1;
                                    setPosts(temp);
                                    setSelectedPost({ no: row.no, type: row.type, id: row.userId, date: row.date, title: row.title, content: row.content }); // 선택된 게시글 정보 저장
                                    setShowPostModal(true);
                                }}><Link to='#' className="text-decoration-none text-dark">{row.title}</Link></td>
                                <td>{row.userId}</td>
                                <td>{row.date}</td>
                                <td>{row.view}</td>
                                <td>
                                    {/* 아이디가 "아이디1"이고, 현재 hover된 유저일 때만 버튼 보이기 */}
                                    {row.userId === localStorage.getItem('id') && (
                                        <Button variant="light" onClick={() => {
                                            setShowSettingModal(true);
                                            setUpdatePost({
                                                no: row.no,
                                                type: row.type,
                                                id: row.userId,
                                                date: row.date,
                                                title: row.title,
                                                content: row.content
                                            });
                                        }}>
                                            수정
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    const QnaPosts = posts.filter(post => post.type === 'Q&A');
    const filteredQnaPosts = filteredPostKeyword ? QnaPosts.filter(post => post.title.includes(filteredPostKeyword)) : QnaPosts;
    const [currentQnaPage, setCurrentQnaPage] = useState(1);
    const QnaPostsPerPage = 6;
    const QnaLastIndex = currentQnaPage * QnaPostsPerPage;
    const QnaFirstIndex = QnaLastIndex - QnaPostsPerPage;
    const currentQnaPosts = filteredQnaPosts.slice(QnaFirstIndex, QnaLastIndex);
    const QnaTotalPages = filteredPostKeyword ? Math.ceil(filteredQnaPosts.length / QnaPostsPerPage) : Math.ceil(QnaPosts.length / QnaPostsPerPage);

    const getContentQna = () => {
        
        return (
            <table className="table table-bordered text-center centered-cell hover-table">
                <thead className="table-light">
                    <tr>
                        <th>번호</th>
                        <th>유형</th>
                        <th>제목</th>
                        <th>아이디</th>
                        <th>작성일</th>
                        <th>조회수</th>
                        <th>설정</th>
                    </tr>
                </thead>
                <tbody>
                    {currentQnaPosts.map((row) => {
                        const contentIndex = 30 - row.no;
                        return (
                            <tr key={row.no}>
                                <td>{row.no}</td>
                                <td>{row.type}</td>
                                <td onClick={() => {
                                    let selectIndex = posts.findIndex(item => item.no === row.no);
                                    let temp = [...posts];
                                    temp[selectIndex].view += 1;
                                    setPosts(temp);
                                    setSelectedPost({ no: row.no, type: row.type, id: row.userId, date: row.date, title: row.title, content: row.content }); // 선택된 게시글 정보 저장
                                    setShowPostModal(true);
                                }}><Link to='#' className="text-decoration-none text-dark">{row.title}</Link></td>
                                <td>{row.userId}</td>
                                <td>{row.date}</td>
                                <td>{row.view}</td>
                                <td>
                                    {/* 아이디가 "아이디1"이고, 현재 hover된 유저일 때만 버튼 보이기 */}
                                    {row.userId === localStorage.getItem('id') && (
                                        <Button variant="light" onClick={() => {
                                            setShowSettingModal(true);
                                            setUpdatePost({
                                                no: row.no,
                                                type: row.type,
                                                id: row.userId,
                                                date: row.date,
                                                title: row.title,
                                                content: row.content
                                            });
                                        }}>
                                            수정
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return (
        <div className="community-all-container">
            <header>
                <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
                    <Container fluid className="community-navbar-inner">
                        <Navbar.Brand as={Link} to="/" className='header-font'>Funders</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav className="ms-auto align-items-center" navbarScroll>
                                <Nav.Link as={Link} to="/list" className='me-3'>
                                    후원하기
                                </Nav.Link>
                                <Form className="d-flex me-3">
                                    <Form.Control type="search" placeholder="Search" className="me-2" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
                                    <Button variant="outline-success" onClick={() => navigate(`/list?keyword=${encodeURIComponent(searchKeyword)}`)}>
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
            <main className="community-main">
                <Container>
                    <div className="community-title-area">
                        <h2>{products[itemindex].name + '의 게시판'}</h2>
                    </div>
                    <Nav fill variant="tabs" className="bg-white">
                        <Nav.Item style={{ border: '1px solid #ddd' }}>
                            <Nav.Link onClick={() => setShowTableTab('전체')} active={showTableTab === '전체'}>전체</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ border: '1px solid #ddd' }}>
                            <Nav.Link onClick={() => setShowTableTab('공지')} active={showTableTab === '공지'}>공지</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ border: '1px solid #ddd' }}>
                            <Nav.Link onClick={() => setShowTableTab('Q&A')} active={showTableTab === 'Q&A'}>Q&A</Nav.Link>
                        </Nav.Item>
                        <Button variant="success" onClick={() => setShowModal(true)}>글쓰기</Button>
                    </Nav>



                    <div className="board">
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <InputGroup className="mb-3" style={{ width: '50%' }}>
                                <Form.Control
                                    placeholder="제목 입력"
                                    value={searchPost}
                                    onChange={(e) => setSearchPost(e.target.value)}
                                />
                                <Button variant="outline-secondary" onClick={() => {
                                    setCurrentPage(1);
                                    setCurrentNoticePage(1);
                                    setCurrentQnaPage(1);
                                    setFilteredPostKeyword(searchPost);
                                    setSearchPost('')
                                }}>
                                    검색
                                </Button>
                            </InputGroup>
                        </div>

                        {showTableTab == '전체' ? getContent() : showTableTab == '공지' ? getContentNotice() : getContentQna()}

                        {showTableTab === '공지' ? (
                            <div className="d-flex justify-content-center mt-3">
                                <Button style={{marginRight:'5%'}}
                                    disabled={currentNoticePage === 1}
                                    onClick={() => setCurrentNoticePage(currentNoticePage - 1)}
                                >이전</Button>
                                <span>{currentNoticePage} / {noticeTotalPages}</span>
                                <Button style={{marginLeft:'5%'}}
                                    disabled={currentNoticePage === noticeTotalPages}
                                    onClick={() => setCurrentNoticePage(currentNoticePage + 1)}
                                >다음</Button>
                            </div>
                        ) : showTableTab === 'Q&A' ? (
                            <div className="d-flex justify-content-center mt-3">
                                <Button style={{marginRight:'5%'}}
                                    disabled={currentQnaPage === 1}
                                    onClick={() => setCurrentQnaPage(currentQnaPage - 1)}
                                >이전</Button>
                                <span>{currentQnaPage} / {QnaTotalPages}</span>
                                <Button style={{marginLeft:'5%'}}
                                    disabled={currentQnaPage === QnaTotalPages}
                                    onClick={() => setCurrentQnaPage(currentQnaPage + 1)}
                                >다음</Button>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center mt-3">
                                <Button style={{marginRight:'5%'}}
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                >이전</Button>
                                <span>{currentPage} / {totalPages}</span>
                                <Button style={{marginLeft:'5%'}}
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                >다음</Button>
                            </div>
                        )}

                    </div>
                </Container>

            </main>
            <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content="로그인 먼저 하세요." opt={1}></AlertModal>
            <PostModal show={showPostModal} onClose={() => setShowPostModal(false)} commentAr={commentAr} setCommentAr={setCommentAr} id={localStorage.getItem('id')} date={new Date().toLocaleString()} title={selectedPost?.title || ''} content={selectedPost?.content || ''}></PostModal>
            <PostWriteModal show={showModal} onClose={() => setShowModal(false)} onSubmit={handleAddPostIndex} type={showTableTab} no={posts.length} />
            <PostSettingModal show={showSettingModal} onClose={() => setShowSettingModal(false)} post={updatePost} commentAr={commentAr} posts={posts} onUpdate={setPosts} onDelete={setPosts} />
            <SellModal show={showSellModal} onClose={() => setShowSellModal(false)} ></SellModal>
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
                                <li><a href="#" onClick={()=>{
                                    if (localStorage.getItem('id') != null)
                                        setShowSellModal(true);
                                    else
                                        setShowAlertModal(true);
                                }}>펀딩 신청</a></li>
                                <li><a href={localStorage.getItem('id') != null?'/mypage':'/login'}>마이페이지</a></li>
                                <li><a href="https://www.notion.so/20322dc2b142800f9264d7662c846fa5?source=copy_link" target="_blank" rel="noopener noreferrer">이용 가이드</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <hr />
                    <p className="text-center small text-muted">© 2025 Funders. All rights reserved.</p>
                </Container>
            </footer>

        </div>
    )
}
export default Community;