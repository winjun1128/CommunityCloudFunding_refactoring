import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import './PostModal.css';

function PostModal({ show, onClose, commentAr, setCommentAr, id, date, title, content }) {
    const [getCmt, setGetCmt] = useState('');

    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [show]);

    if (!show) return null;

    const handleAddComment = () => {
        const temp = { id, date, comment: getCmt };
        setCommentAr([temp, ...commentAr]);
        setGetCmt('');
    };

    return (
        <div className="postmodal-backdrop" onClick={onClose}>
            <div className="postmodal-content" onClick={(e) => e.stopPropagation()}>
                <h4 className="mb-3">{title}</h4>
                <p className="mb-4">{content}</p>

                <div className="mb-4">
                    <h6>댓글</h6>
                    {commentAr.length === 0 ? (
                        <p className="text-muted">아직 댓글이 없습니다.</p>
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

                <InputGroup className="mb-3">
                    <InputGroup.Text>[{id}]</InputGroup.Text>
                    <Form.Control
                        placeholder="댓글을 입력하세요"
                        value={getCmt}
                        onChange={(e) => setGetCmt(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleAddComment}>달기</Button>
                </InputGroup>

                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={onClose}>닫기</Button>
                </div>
            </div>
        </div>
    );
}

export default PostModal;
