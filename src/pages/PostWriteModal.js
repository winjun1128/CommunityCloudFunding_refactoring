import { Button, Form } from "react-bootstrap";
import './PostWriteModal.css';
import { useEffect, useState } from "react";
import AlertModal from "./AlertModal";

function PostWriteModal({ show, onClose, onSubmit, no }) {
  const[showAlertModal,setShowAlertModal] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newType, setNewType] = useState('공지');

  const newPost = {
    no: no + 1,
    title,
    type: newType,
    content,
    userId: localStorage.getItem('id'),
    date: new Date().toLocaleString(),
    view: 0
  };

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="postwritemodal-backdrop" onClick={onClose}>
      <div className="postwritemodal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-4 text-center">게시글 작성</h4>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제목</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                onChange={(e) => setNewType(e.target.value)}
              />
              <Form.Check
                inline
                type="radio"
                label="Q&A"
                name="type"
                value="Q&A"
                checked={newType === 'Q&A'}
                onChange={(e) => setNewType(e.target.value)}
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
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" onClick={() => {
              onSubmit(newPost);
              setShowAlertModal(true);
              setTitle('');
              setNewType('');
              setContent('');
            }}>
              올리기
            </Button>
            <Button variant="secondary" onClick={onClose}>취소</Button>
          </div>
        </Form>
      </div>
      <AlertModal show={showAlertModal} handleClose={()=>setShowAlertModal(false)} content="작성 완료" opt={2}></AlertModal>
    </div>
  );
}

export default PostWriteModal;
