import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type AlarmModalProps = {
  show: boolean;
  onClose?: () => void;        // 외부에서 닫기 핸들러 전달 시
  handleClose?: () => void;    // 기존 API 호환용 (선택)
  content?: string;            // 미사용: 호환용
  opt?: number;                // 미사용: 호환용
};

const AlarmModal: React.FC<AlarmModalProps> = ({ show, onClose, handleClose }) => {
  const navigate = useNavigate();

  const close = () => {
    onClose?.();
    handleClose?.();
  };

  useEffect(() => {
    if (!show) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [show]);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="알림"
      aria-modal="false"
      style={{
        position: 'absolute',
        right: 0,
        top: '40px',
        width: '300px',
        height: '400px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        zIndex: 999,
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <h5 style={{ margin: 0 }}>알림</h5>
        <button
          aria-label="알림 닫기"
          onClick={close}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/community/15');
            close();
          }}
        >
          🔔 국내산 수박을 그대로 짜낸 수박 100% 주스의 공지가 추가되었습니다.
        </div>
        <hr />
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/community/13');
            close();
          }}
        >
          🔔 특허받은 떡볶이! 맛없으면 환불하세요! 쫀득한 특허 쉐킷 떡볶이의 공지가 추가되었습니다.
        </div>
        <hr />
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/community/2');
            close();
          }}
        >
          🔔 벗겨지지 않아 믿고 쓸 수 있는 #쿠자 믹싱볼 세트의 공지가 추가되었습니다.
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;
