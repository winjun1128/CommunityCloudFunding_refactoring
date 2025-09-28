import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './PostWriteModal.css';
import AlertModal from './AlertModal';

type PostType = '공지' | 'Q&A';

export interface Post {
  no: number;
  title: string;
  type: PostType;
  content: string;
  userId: string;     // 저장 시 null 방어하여 '익명'으로 치환
  date: string;       // toLocaleString()
  view: number;
}

type PostWriteModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (post: Post) => void;
  no: number; // 현재 게시글 수 혹은 마지막 번호. 새 글은 no+1
};

const PostWriteModal: React.FC<PostWriteModalProps> = ({ show, onClose, onSubmit, no }) => {
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [alertMsg, setAlertMsg] = useState<string>('작성 완료');

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [newType, setNewType] = useState<PostType>('공지');

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const handleSubmit = () => {
    const t = title.trim();
    const c = content.trim();

    if (t === '' || c === '') {
      setAlertMsg('제목과 본문을 입력하세요.');
      setShowAlertModal(true);
      return;
    }

    const newPost: Post = {
      no: no + 1,
      title: t,
      type: newType,
      content: c,
      userId: localStorage.getItem('id') ?? '익명',
      date: new Date().toLocaleString(),
      view: 0,
    };

    onSubmit(newPost);
    setAlertMsg('작성 완료');
    setShowAlertModal(true);

    // 폼 초기화
    setTitle('');
    setContent('');
    setNewType('공지');
  };

  return (
    <div className="postwritemodal-backdrop" onClick={onClose}>
      <div className="postwritemodal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-4 text-center">게시글 작성</h4>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="게시글 제목"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>분류</Form.Label>
            <div className="typeradioarea">
              <Form.Check
                inline
                type="radio"
                label="공지"
                name="type"
                value="공지"
                checked={newType === '공지'}
                onChange={() => setNewType('공지')}
              />
              <Form.Check
                inline
                type="radio"
                label="Q&A"
                name="type"
                value="Q&A"
                checked={newType === 'Q&A'}
                onChange={() => setNewType('Q&A')}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>본문</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              aria-label="게시글 본문"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" type="submit">
              올리기
            </Button>
            <Button variant="secondary" type="button" onClick={onClose}>
              취소
            </Button>
          </div>
        </Form>
      </div>

      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content={alertMsg}
        opt={alertMsg === '작성 완료' ? 2 : 1}
      />
    </div>
  );
};

export default PostWriteModal;
