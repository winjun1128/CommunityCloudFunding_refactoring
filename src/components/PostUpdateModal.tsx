import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './PostUpdateModal.css';
import AlertModal from './AlertModal';

// ===== 타입들 =====
type PostType = '공지' | 'Q&A';

export interface Post {
  no: number;
  type: PostType;
  title: string;
  content: string;
  userId: string;
  date: string;
  view: number;
}

export interface CommentItem {
  id: string;
  date: string;
  comment: string;
}

type PostUpdateModalProps = {
  show: boolean;
  onClose: () => void;
  post: Post | null;
  commentAr: CommentItem[];
  posts: Post[];
  onUpdate: React.Dispatch<React.SetStateAction<Post[]>>;
  onAllClose?: () => void; // 선택적 전체 닫기 콜백
};

const PostUpdateModal: React.FC<PostUpdateModalProps> = ({
  show,
  onClose,
  post,
  commentAr,
  posts,
  onUpdate,
  onAllClose,
}) => {
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);

  const [getTitle, setGetTitle] = useState<string>('');
  const [getContent, setGetContent] = useState<string>('');
  const [getType, setGetType] = useState<PostType>('공지');

  // 선택된 게시글 로드
  useEffect(() => {
    if (post) {
      setGetTitle(post.title);
      setGetContent(post.content);
      setGetType(post.type);
    }
  }, [post]);

  // 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const handleSubmit = () => {
    if (!post) return;
    onUpdate((prev) =>
      prev.map((item) =>
        item.no === post.no ? { ...item, title: getTitle, content: getContent, type: getType } : item
      )
    );
    setShowAlertModal(true);
  };

  return (
    <div className="postupdatemodal-backdrop" onClick={onClose}>
      <div className="postupdatemodal-content" onClick={(event) => event.stopPropagation()}>
        <h4 className="mb-4 text-center">게시글 수정</h4>

        {!post ? (
          <div className="text-center">
            <p>수정할 게시글이 없습니다.</p>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={onClose}>
                닫기
              </Button>
            </div>
          </div>
        ) : (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                value={getTitle}
                onChange={(e) => setGetTitle(e.target.value)}
                aria-label="게시글 제목"
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
                  onChange={() => setGetType('공지')}
                />
                <Form.Check
                  inline
                  label="Q&A"
                  name="type"
                  type="radio"
                  value="Q&A"
                  checked={getType === 'Q&A'}
                  onChange={() => setGetType('Q&A')}
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
                aria-label="게시글 본문"
              />
            </Form.Group>

            <div className="mb-4">
              <h5 className="mb-3">댓글</h5>
              {commentAr.length === 0 ? (
                <p className="text-muted">댓글이 없습니다.</p>
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

            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary" type="submit" disabled={!getTitle.trim()}>
                수정하기
              </Button>
              <Button variant="secondary" type="button" onClick={onClose}>
                취소
              </Button>
            </div>
          </Form>
        )}
      </div>

      <AlertModal
        show={showAlertModal}
        handleClose={() => {
          setShowAlertModal(false);
          onAllClose?.(); // 알림 닫히면 전체 닫기(선택)
        }}
        content="수정 완료"
        opt={2}
      />
    </div>
  );
};

export default PostUpdateModal;
