import './PostSettingModal.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostUpdateModal from './PostUpdateModal';
import CheckDeleteAlertModal from './CheckDeleteAlertModal';
import AlertModal from './AlertModal';

function PostSettingModal({ show, onClose, post, commentAr, posts, onUpdate, onDelete }) {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showCheckDeleteAlertModal, setShowCheckDeleteAlertModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);



  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show && !showAlertModal) return null;


  const handleDeletePost = () => {
    const updatedPosts = posts.filter(item => item.no !== post.no);
    onDelete(updatedPosts);
    // ✅ 먼저 삭제 확인 모달 닫고
    setShowCheckDeleteAlertModal(false);
    setShowAlertModal(true);
  };

  return (
    <div className="postsettingmodal-backdrop" onClick={onClose}>
      <div
        className="postsettingmodal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <h4 className="text-center mb-4">게시글 설정</h4>

        <div className="setting-btn-area">
          <Button variant="primary" onClick={() => setShowUpdateModal(true)} className="w-100 mb-3">
            수정하기
          </Button>

          <Button variant="danger" onClick={() => {
            setShowCheckDeleteAlertModal(true);
          }} className="w-100 mb-3">
            삭제하기
          </Button>

          <Button variant="secondary" onClick={onClose} className="w-100">
            취소
          </Button>
        </div>

        <PostUpdateModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onAllClose={() => {
            setShowUpdateModal(false);      // UpdateModal 닫기
            onClose();                      // SettingModal 닫기 (부모에서 받음)
          }}
          post={post}
          commentAr={commentAr}
          posts={posts}
          onUpdate={onUpdate}
        />
      </div>
      <AlertModal show={showAlertModal} handleClose={() => setShowAlertModal(false)} content="삭제 완료" opt={2}></AlertModal>
      <CheckDeleteAlertModal show={showCheckDeleteAlertModal} handleClose={() => setShowCheckDeleteAlertModal(false)} content="삭제 하시겠습니까?" opt={2} onDeleteProduct={null} onDeletePost={handleDeletePost} ></CheckDeleteAlertModal>
    </div>
  );
}

export default PostSettingModal;
