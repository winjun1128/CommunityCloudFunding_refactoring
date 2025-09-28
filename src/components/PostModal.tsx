import { useState, useEffect, KeyboardEvent } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import './PostModal.css';

type CommentItem = {
  id: string;
  date: string;     // toLocaleString() 등 문자열로 관리
  comment: string;
};

type PostModalProps = {
  show: boolean;
  onClose: () => void;
  commentAr: CommentItem[];
  setCommentAr: React.Dispatch<React.SetStateAction<CommentItem[]>>;
  id: string | null;     // localStorage.getItem('id')가 null일 수 있음
  date: string;
  title: string;
  content: string;
};

const PostModal: React.FC<PostModalProps> = ({
  show,
  onClose,
  commentAr,
  setCommentAr,
  id,
  date,
  title,
  content,
}) => {
  const [getCmt, setGetCmt] = useState<string>('');

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const handleAddComment = () => {
    const writer = id ?? '익명';
    const text = getCmt.trim();
    if (text === '') return;

    const temp: CommentItem = { id: writer, date, comment: text };
    setCommentAr((prev) => [temp, ...prev]);
    setGetCmt('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddComment();
    }
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
              <div key={`${item.id}-${index}`} className="mb-2 border-bottom pb-2">
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
          <InputGroup.Text>[{id ?? '익명'}]</InputGroup.Text>
          <Form.Control
            placeholder="댓글을 입력하세요"
            value={getCmt}
            onChange={(e) => setGetCmt(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="댓글 입력"
          />
          <Button variant="primary" onClick={handleAddComment} disabled={getCmt.trim() === ''}>
            달기
          </Button>
        </InputGroup>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
