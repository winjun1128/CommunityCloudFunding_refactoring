import { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import './PayModal.css';
import { useProducts } from '../data/ProductContext';

function PayModal({ show, onClose, itemindex }) {
  const { products, setProducts } = useProducts();
  const item = products[itemindex];
  const [buyItemCount, setBuyItemCount] = useState(1);
  const [buyItemPrice, setBuyItemPrice] = useState(item.price);
  const [address, setAddress] = useState('');

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const updateBuyItemCount = (newCount) => {
    setBuyItemCount(newCount);
    setBuyItemPrice(newCount * item.price);
  };

  const handlePayment = () => {
    let temp = [...products];
    temp[itemindex].count += buyItemCount;
    temp[itemindex].gainmoney += buyItemCount * item.price;
    temp[itemindex].consumer.push(localStorage.getItem('id'));
    temp[itemindex].percent = ((temp[itemindex].gainmoney / temp[itemindex].recruitmoney) * 100).toFixed(1);
    setProducts(temp);
    alert('결제 완료!');
    onClose();
  };

  return (
    <div className="paymodal-backdrop" onClick={onClose}>
      <div className="paymodal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="text-center mb-4">결제 확인</h4>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>제품명</Form.Label>
            <Form.Control value={item.name} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>수량</Form.Label>
            <InputGroup>
              <Button
                variant="outline-secondary"
                onClick={() => buyItemCount > 1 && updateBuyItemCount(buyItemCount - 1)}
              >-</Button>
              <Form.Control value={buyItemCount} readOnly className="text-center" />
              <Button
                variant="outline-secondary"
                onClick={() => updateBuyItemCount(buyItemCount + 1)}
              >+</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>주소</Form.Label>
            <Form.Control
              type="text"
              placeholder="배송 받을 주소를 입력하세요"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>총 결제 금액</Form.Label>
            <Form.Control value={`${buyItemPrice.toLocaleString()} 원`} readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 기간</Form.Label>
            <Form.Control
              value={`${item.startdate} ~ ${item.enddate}`}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>현재 달성률</Form.Label>
            <Form.Control value={`${item.percent}%`} readOnly />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" onClick={handlePayment}>결제하기</Button>
            <Button variant="secondary" onClick={onClose}>취소</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default PayModal;
