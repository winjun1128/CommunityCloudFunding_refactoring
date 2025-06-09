import { useState, useEffect } from 'react';
import './PostUpdateModal.css';
import { Row, Col, Button } from 'react-bootstrap';
function PostUpdateModal({ show, onClose, post, commentAr, posts, onUpdate }) {
    const [getTitle, setGetTitle] = useState('');
    const [getContent, setGetContent] = useState('');
    const [getType,setGetType] = useState(post.type);
    useEffect(() => {
        if (post) {
            setGetTitle(post.title);
            setGetContent(post.content);
        }
    }, [post]);
    //모달 열릴떄 바디 스크롤 막기
    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'auto';
        }
        //컴포넌트가 언마운트될떄 원래대로
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;


    return (
        <div className="postupdatemodal-backdrop" onClick={onClose}>
            <div
                className="postupdatemodal-content"
                onClick={(event) => event.stopPropagation()} // 내부 클릭 무시
            >


                <Row>
                    <Col md={12}><input type="text" onChange={(event) => setGetTitle(event.target.value)} value={getTitle} /></Col>
                </Row>
                <hr />

                <Row>
                    <Col md={12}>
                        <div className="typeradioarea">
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="공지"
                                    checked={getType === '공지'}
                                    onChange={(e) => setGetType(e.target.value)}
                                />
                                공지
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="Q&A"
                                    checked={getType === 'Q&A'}
                                    onChange={(e) => setGetType(e.target.value)}
                                />
                                Q&A
                            </label>
                        </div>
                    </Col>
                </Row>
                <hr />

                <Row>
                    <Col md={12}><textarea onChange={(event) => setGetContent(event.target.value)} value={getContent} /></Col>
                </Row>
                <hr />
                {
                    commentAr.map((item, index) => {
                        return (
                            <>
                                <Row>
                                    <Col md={2}><h6>[{item.id}]</h6></Col>
                                    <Col md={2}><span style={{ fontSize: '0.7rem' }}>({item.date})</span></Col>
                                    <Col md={8}><h6>{item.comment}</h6></Col>
                                </Row>
                                <hr />
                            </>
                        )
                    })
                }
                <Row>
                    <div className='updateareapostmodal'>
                        <Col md={12}><Button onClick={() => {
                            const updatedPosts = posts.map(item =>
                                item.no === post.no
                                    ? { ...item, title: getTitle, content: getContent, type: getType }
                                    : item
                            );
                            onUpdate(updatedPosts);
                            onClose();
                        }}>수정하기</Button></Col>
                    </div>
                </Row>
                <hr></hr>
                <Row>
                    <div className='cancelareapostmodal'>
                        <Col md={12}><Button variant='secondary' onClick={onClose}>취소</Button></Col>
                    </div>
                </Row>
            </div>
        </div>
    );
}
export default PostUpdateModal;