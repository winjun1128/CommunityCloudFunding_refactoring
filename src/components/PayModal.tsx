import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import './PayModal.css';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';

type PayModalProps = {
  show: boolean;
  onClose: () => void;
  itemindex: number; // products 배열 인덱스
};

type Product = {
  no: number;
  name: string;
  price: number;
  startdate: string;
  enddate: string;
  percent: number;       // 0~100
  count: number;
  gainmoney: number;
  recruitmoney: number;
  consumer: string[];    // user ids
};

interface UseProducts {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const PayModal: React.FC<PayModalProps> = ({ show, onClose, itemindex }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);

  const { products, setProducts } = useProducts() as UseProducts;

  // 인덱스/아이템 가드
  const item = products[itemindex];
  const isValid = Boolean(item);

  const [buyItemCount, setBuyItemCount] = useState<number>(1);
  const [buyItemPrice, setBuyItemPrice] = useState<number>(item ? item.price : 0);
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  useEffect(() => {
    // 아이템/가격이 바뀔 수 있는 경우(다른 아이템으로 열림) 대비
    if (item) {
      setBuyItemCount(1);
      setBuyItemPrice(item.price);
      setAddress('');
    }
  }, [itemindex]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!show) return null;
  if (!isValid) {
    // 방어적 처리: 잘못된 인덱스면 닫고 종료
    return (
      <div className="paymodal-backdrop" onClick={onClose}>
        <div className="paymodal-content" onClick={(e) => e.stopPropagation()}>
          <h5>유효하지 않은 상품입니다.</h5>
          <div className="d-flex justify-content-end mt-3">
            <Button variant="secondary" onClick={onClose}>
              닫기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const updateBuyItemCount = (newCount: number) => {
    setBuyItemCount(newCount);
    setBuyItemPrice(newCount * item.price);
  };

  const handlePayment = () => {
    // 간단한 유효성 체크: 주소 입력
    if (address.trim() === '') {
      setShowAlertModal(true);
      return;
    }

    setProducts((prev) => {
      const next = [...prev];
      const target = next[itemindex];

      // 방어
      if (!target) return prev;

      const nextCount = target.count + buyItemCount;
      const addedMoney = buyItemCount * target.price;
      const nextGain = target.gainmoney + addedMoney;
      const nextPercent =
        target.recruitmoney > 0
          ? parseFloat(((nextGain / target.recruitmoney) * 100).toFixed(1))
          : target.percent;

      const userId = localStorage.getItem('id') ?? '';
      const nextConsumer = userId ? [...target.consumer, userId] : target.consumer;

      next[itemindex] = {
        ...target,
        count: nextCount,
        gainmoney: nextGain,
        percent: nextPercent,
        consumer: nextConsumer,
      };

      return next;
    });

    setShowAlertModal(true);
  };

  return (
    <div className="paymodal-backdrop" onClick={onClose}>
      <div className="paymodal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="text-center mb-4">결제 확인</h4>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>제품명</Form.Label>
            <Form.Control value={item.name} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>수량</Form.Label>
            <InputGroup>
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => buyItemCount > 1 && updateBuyItemCount(buyItemCount - 1)}
              >
                -
              </Button>
              <Form.Control value={buyItemCount} readOnly className="text-center" />
              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => updateBuyItemCount(buyItemCount + 1)}
              >
                +
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>주소</Form.Label>
            <Form.Control
              type="text"
              placeholder="배송 받을 주소를 입력하세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="배송지 주소"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>총 결제 금액</Form.Label>
            <Form.Control value={`${buyItemPrice.toLocaleString()} 원`} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 기간</Form.Label>
            <Form.Control value={`${item.startdate} ~ ${item.enddate}`} readOnly />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>현재 달성률</Form.Label>
            <Form.Control value={`${item.percent}%`} readOnly />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" type="submit">
              결제하기
            </Button>
            <Button variant="secondary" type="button" onClick={onClose}>
              취소
            </Button>
          </div>
        </Form>
      </div>

      {/* 결제 완료/주소 미입력 등 안내 */}
      <AlertModal
        show={showAlertModal}
        handleClose={() => setShowAlertModal(false)}
        content={address.trim() === '' ? '주소를 입력하세요.' : '결제 완료'}
        opt={address.trim() === '' ? 1 : 2}
      />
    </div>
  );
};

export default PayModal;
