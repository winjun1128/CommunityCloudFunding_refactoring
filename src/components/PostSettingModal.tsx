import './PostSettingModal.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import PostUpdateModal from './PostUpdateModal';
import CheckDeleteAlertModal from './CheckDeleteAlertModal';
import AlertModal from './AlertModal';

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

type PostSettingModalProps = {
  show: boolean;
  onClose: () => void;
  post: Post | null;
  commentAr: CommentItem[];
  posts: Post[];
  onUpdate: React.Dispatch<React.SetStateAction<Post[]>>;
  onDelete: React.Dispatch<React.SetStateAction<Post[]>>;
};

const PostSettingModal: React.FC<PostSettingModalProps> = ({
  show,
  onClose,
  post,
  commentAr,
  posts,
  onUpdate,
  onDelete,
}) => {
  const [showAlertModal, setShowAlertModal] = useState<boolean>(false);
  const [showCheckDeleteAlertModal, setShowCheckDeleteAlertModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  // 스크롤 락
  useEffect(() => {
    const anyOpen = show || showAlertModal || showCheckDeleteAlertModal || showUpdateModal;
    document.body.style.overflow = anyOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show, showAlertModal, showCheckDeleteAlertModal, showUpdateModal]);

  // 부모는 닫혀도 내부 알림/확인 모달이 열려있다면 렌더 유지
  if (!show && !showAlertModal && !showCheckDeleteAlertModal && !showUpdateModal) return null;

  const handleDeletePost = () => {
    if (!post) return;
    onDelete((prev) => prev.filter((item) => item.no !== post.no));
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
          <Button
            variant="primary"
            onClick={() => setShowUpdateModal(true)}
            className="w-100 mb-3"
            disabled={!post}
            title={!post ? '수정할 게시글이 없습니다.' : undefined}
          >
            수정하기
          </Button>

          <Button
            variant="danger"
            onClick={() => setShowCheckDeleteAlertModal(true)}
            className="w-100 mb-3"
            disabled={!post}
            title={!post ? '삭제할 게시글이 없습니다.' : undefined}
          >
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
            setShowUpdateModal(false);
            onClose();
          }}
          post={post as any}          // JS 컴포넌트라면 any로 전달 (타입 선언 없을 경우)
          commentAr={commentAr as any}
          posts={posts as any}
          onUpdate={onUpdate as any}
        />
      </div>

      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content="삭제 완료"
        opt={2}
      />

      <CheckDeleteAlertModal
        show={showCheckDeleteAlertModal}
        handleClose={() => setShowCheckDeleteAlertModal(false)}
        content="삭제 하시겠습니까?"
        opt={2}
        onDeleteProduct={null}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default PostSettingModal;
