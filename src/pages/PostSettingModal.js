import './PostSettingModal.css';
import { useEffect, useState } from 'react';
import PostUpdateModal from './PostUpdateModal';
function PostSettingModal({ show, onClose, post, commentAr, posts, onUpdate,onDelete }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

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
    <div className="postsettingmodal-backdrop" onClick={onClose}>
      <div
        className="postsettingmodal-content"
        onClick={(event) => event.stopPropagation()} // 내부 클릭 무시
      >
        <div className="gofixpostarea">
          <button onClick={() => setShowUpdateModal(true)}><h1>수정</h1></button>
        </div>
        <div className="deletepostarea">
          <button onClick={() => {
           const delpost = posts.filter(item=>item.no!==post.no);
            onDelete(delpost);
          }}><h1>삭제</h1></button>
        </div>
        <div className="cancelpostarea">
          <button onClick={onClose}><h1>취소</h1></button>
        </div>

        {/* <Row>
          <Col md={6}><h1>제목</h1></Col>
          <Col md={6}><input type="text" onChange={(event)=>setTitle(event.target.value)} /></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><h2>본문</h2></Col>
          <Col md={6}><input type="text" onChange={(event)=>setContent(event.target.value)}/></Col>
        </Row>
        <hr />
        <Row>
          <Col md={6}><button onClick={()=>{
            onSubmit(newPost);    //객체담기
            onClose();
          }}>올리기</button></Col>
          <Col md={6}><button onClick={onClose}>취소</button></Col>
        </Row> */}

        <PostUpdateModal show={showUpdateModal} onClose={() => setShowUpdateModal(false)} post={post} commentAr={commentAr} posts={posts} onUpdate={onUpdate}></PostUpdateModal>
      </div>
    </div>
  );
}
export default PostSettingModal;