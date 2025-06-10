import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './PostUpdateModal.css';

function PostUpdateModal({ show, onClose, post, commentAr, posts, onUpdate }) {
    const [getTitle, setGetTitle] = useState('');
    const [getContent, setGetContent] = useState('');
    const [getType, setGetType] = useState(post.type);

    useEffect(() => {
        if (post) {
            setGetTitle(post.title);
            setGetContent(post.content);
        }
    }, [post]);

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    return (
        <div className="postupdatemodal-backdrop" onClick={onClose}>
            <div
                className="postupdatemodal-content"
                onClick={(event) => event.stopPropagation()}
            >
                <h4 className="mb-4 text-center">게시글 수정</h4>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>제목</Form.Label>
                        <Form.Control
                            type="text"
                            value={getTitle}
                            onChange={(e) => setGetTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>분류</Form.Label>
                        <div className="typeradioarea">
                            <Form.Check
                                inline
                                label="공지"
                                name="type"
                                type="radio"
                                value="공지"
                                checked={getType === '공지'}
                                onChange={(e) => setGetType(e.target.value)}
                            />
                            <Form.Check
                                inline
                                label="Q&A"
                                name="type"
                                type="radio"
                                value="Q&A"
                                checked={getType === 'Q&A'}
                                onChange={(e) => setGetType(e.target.value)}
                            />
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>본문</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={getContent}
                            onChange={(e) => setGetContent(e.target.value)}
                        />
                    </Form.Group>

                    <div className="mb-4">
                        <h5 className="mb-3">댓글</h5>
                        {commentAr.length === 0 ? (
                            <p className="text-muted">댓글이 없습니다.</p>
                        ) : (
                            commentAr.map((item, index) => (
                                <div key={index} className="mb-2 border-bottom pb-2">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <strong>[{item.id}]</strong>
                                        <small className="text-muted">{item.date}</small>
                                    </div>
                                    <div>{item.comment}</div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <Button
                            variant="primary"
                            onClick={() => {
                                const updatedPosts = posts.map((item) =>
                                    item.no === post.no
                                        ? { ...item, title: getTitle, content: getContent, type: getType }
                                        : item
                                );
                                onUpdate(updatedPosts);
                                onClose();
                            }}
                        >
                            수정하기
                        </Button>
                        <Button variant="secondary" onClick={onClose}>
                            취소
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default PostUpdateModal;
