import './PostSettingModal.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostUpdateModal from './PostUpdateModal';

function PostSettingModal({ show, onClose, post, commentAr, posts, onUpdate, onDelete }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const handleDelete = () => {
    const updatedPosts = posts.filter(item => item.no !== post.no);
    onDelete(updatedPosts);
    onClose();
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

          <Button variant="danger" onClick={handleDelete} className="w-100 mb-3">
            삭제하기
          </Button>

          <Button variant="secondary" onClick={onClose} className="w-100">
            취소
          </Button>
        </div>

        <PostUpdateModal
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          post={post}
          commentAr={commentAr}
          posts={posts}
          onUpdate={onUpdate}
        />
      </div>
    </div>
  );
}

export default PostSettingModal;
