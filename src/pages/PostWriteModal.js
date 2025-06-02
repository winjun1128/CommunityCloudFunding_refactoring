import { Button, Row, Col } from "react-bootstrap";
import ReactDOM from 'react-dom';
import './PostWriteModal.css';
import { useEffect, useState } from "react";

function PostWriteModal({ show, onClose, onSubmit, no, type }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newType, setNewType] = useState('공지');

  //이건 결과를 보내줄 객체
  const newPost = {
    no: no + 1,
    title: title,
    type: newType,
    content: content,
    userId: localStorage.getItem('id'),
    date: new Date().toLocaleString()
  }

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
    <div className="postwritemodal-backdrop" onClick={onClose}>
      <div
        className="postwritemodal-content"
        onClick={(event) => event.stopPropagation()} // 내부 클릭 무시
      >
        <Row>
          <Col md={6}><h1>제목</h1></Col>
          <Col md={6}><input type="text" onChange={(event) => setTitle(event.target.value)} /></Col>
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
                  checked={newType === '공지'}
                  onChange={(e) => setNewType(e.target.value)}
                />
                공지
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="Q&A"
                  checked={newType === 'Q&A'}
                  onChange={(e) => setNewType(e.target.value)}
                />
                Q&A
              </label>
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><h2>본문</h2></Col>
          <Col md={6}><textarea type="text" onChange={(event) => setContent(event.target.value)} /></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><Button onClick={() => {
            onSubmit(newPost);    //객체담기
            onClose();
          }}>올리기</Button></Col>
          <Col md={6}><Button variant="secondary" onClick={onClose}>취소</Button></Col>
        </Row>
      </div>
    </div>
  );
}

export default PostWriteModal;
