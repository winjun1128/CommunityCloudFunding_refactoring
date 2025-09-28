import { useState, useEffect, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import './EditModal.css';
import { useProducts } from '../data/ProductContext';
import AlertModal from './AlertModal';

type Category =
  | 'all'
  | 'food'
  | 'living'
  | 'area'
  | 'book'
  | 'learning'
  | 'environment'
  | 'pet'
  | 'travel'
  | 'beauty';

type State = '진행중' | '마감';

export interface Product {
  no: number;
  imglink: string;
  companyname: string;
  name: string;
  category: Category;
  price: number;
  gainmoney: number;
  recruitmoney: number;
  startdate: string; // YYYY-MM-DD
  enddate: string;   // YYYY-MM-DD
  carousellink: string[]; // 길이 3 가정
  intro: string;
  picturelink: string;
  videolink: string;
  percent: number;   // 0~100
  count: number;
  heart: string[];
  consumer: string[];
  seller: string | null;
  state: State;
}

interface UseProducts {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

type EditModalProps = {
  show: boolean;
  onClose: () => void;
  product: Product | null;
};

const EditModal: React.FC<EditModalProps> = ({ show, onClose, product }) => {
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('수정 완료');

  const { products, setProducts } = useProducts() as UseProducts;

  const [getName, setGetName] = useState('');
  const [getCompanyName, setGetCompanyName] = useState('');
  const [getImgLink, setGetImgLink] = useState('');
  const [getCategory, setGetCategory] = useState<Category>('food');
  const [getPrice, setGetPrice] = useState<number>(0);
  const [getRecruitMoney, setGetRecruitMoney] = useState<number>(0);
  const [getStartDate, setGetStartDate] = useState('');
  const [getEndDate, setGetEndDate] = useState('');
  const [getCarouselLink, setGetCarouselLink] = useState<[string, string, string]>(['', '', '']);
  const [getIntro, setGetIntro] = useState('');
  const [getPictureLink, setGetPictureLink] = useState('');
  const [getVideoLink, setGetVideoLink] = useState('');

  // 초기값 로드
  useEffect(() => {
    if (product) {
      setGetName(product.name);
      setGetCompanyName(product.companyname);
      setGetImgLink(product.imglink);
      setGetCategory(product.category);
      setGetPrice(product.price);
      setGetRecruitMoney(product.recruitmoney);
      setGetStartDate(product.startdate);
      setGetEndDate(product.enddate);
      setGetCarouselLink([
        product.carousellink[0] ?? '',
        product.carousellink[1] ?? '',
        product.carousellink[2] ?? '',
      ]);
      setGetIntro(product.intro);
      setGetPictureLink(product.picturelink);
      setGetVideoLink(product.videolink);
    }
  }, [product]);

  // 스크롤 락
  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  if (!show) return null;

  const parseNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.currentTarget.value);
    return Number.isFinite(n) ? n : 0;
    };

  const prefix = (path: string) =>
    path && !/^https?:\/\//.test(path) ? `${process.env.PUBLIC_URL}${path}` : path;

  const computeState = (endDateStr: string): State => {
    const end = new Date(endDateStr);
    if (Number.isNaN(end.getTime())) return '진행중';
    const now = new Date();
    return end.getTime() - now.getTime() <= 0 ? '마감' : '진행중';
  };

  const handleCarouselChange = (index: 0 | 1 | 2, value: string) => {
    const updated = [...getCarouselLink] as [string, string, string];
    updated[index] = value;
    setGetCarouselLink(updated);
  };

  const validate = (): string | null => {
    if (!product) return '수정할 상품이 없습니다.';
    if (!getName.trim() || !getCompanyName.trim()) return '제품명과 회사명을 입력하세요.';
    if (!getStartDate || !getEndDate) return '모집 시작일과 마감일을 선택하세요.';
    const s = new Date(getStartDate);
    const e = new Date(getEndDate);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return '날짜 형식이 올바르지 않습니다.';
    if (s.getTime() > e.getTime()) return '마감일은 시작일 이후여야 합니다.';
    if (getPrice <= 0) return '가격은 0보다 커야 합니다.';
    if (getRecruitMoney <= 0) return '모집 금액은 0보다 커야 합니다.';
    return null;
  };

  const handleUpdate = () => {
    const error = validate();
    if (error) {
      setAlertMsg(error);
      setShowAlertModal(true);
      return;
    }
    if (!product) return;

    const nextState = computeState(getEndDate);

    setProducts(prev =>
      prev.map(item =>
        item.no === product.no
          ? {
              ...item,
              name: getName.trim(),
              companyname: getCompanyName.trim(),
              imglink: prefix(getImgLink),
              category: getCategory,
              price: getPrice,
              recruitmoney: getRecruitMoney,
              startdate: getStartDate,
              enddate: getEndDate,
              carousellink: getCarouselLink.map(prefix),
              intro: getIntro,
              picturelink: prefix(getPictureLink),
              videolink: prefix(getVideoLink),
              state: nextState,
            }
          : item
      )
    );

    setAlertMsg('수정 완료');
    setShowAlertModal(true);
  };

  return (
    <div className="editmodal-backdrop" onClick={onClose}>
      <div className="editmodal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-4 text-center">상품 수정</h4>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>제품명</Form.Label>
            <Form.Control
              value={getName}
              onChange={(e) => setGetName(e.target.value)}
              aria-label="제품명"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>회사명</Form.Label>
            <Form.Control
              value={getCompanyName}
              onChange={(e) => setGetCompanyName(e.target.value)}
              aria-label="회사명"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>대표 이미지 링크</Form.Label>
            <Form.Control
              value={getImgLink}
              onChange={(e) => setGetImgLink(e.target.value)}
              placeholder="/images/xxx.jpg 또는 https://..."
              aria-label="대표 이미지 링크"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>카테고리</Form.Label>
            <Form.Select
              value={getCategory}
              onChange={(e) => setGetCategory(e.target.value as Category)}
              aria-label="카테고리"
            >
              <option value="living">리빙</option>
              <option value="food">푸드</option>
              <option value="area">지역</option>
              <option value="book">서적</option>
              <option value="learning">교육</option>
              <option value="environment">환경</option>
              <option value="pet">펫</option>
              <option value="travel">여행</option>
              <option value="beauty">뷰티</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>가격</Form.Label>
            <Form.Control
              type="number"
              value={getPrice}
              onChange={(e) => setGetPrice(parseNumber(e))}
              min={0}
              aria-label="가격"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 금액</Form.Label>
            <Form.Control
              type="number"
              value={getRecruitMoney}
              onChange={(e) => setGetRecruitMoney(parseNumber(e))}
              min={0}
              aria-label="모집 금액"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 시작일</Form.Label>
            <Form.Control
              type="date"
              value={getStartDate}
              onChange={(e) => setGetStartDate(e.target.value)}
              aria-label="모집 시작일"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>모집 마감일</Form.Label>
            <Form.Control
              type="date"
              value={getEndDate}
              onChange={(e) => setGetEndDate(e.target.value)}
              aria-label="모집 마감일"
            />
          </Form.Group>

          {[0, 1, 2].map((i) => (
            <Form.Group className="mb-3" key={i}>
              <Form.Label>캐러셀 이미지 링크 {i + 1}</Form.Label>
              <Form.Control
                type="text"
                value={getCarouselLink[i] || ''}
                onChange={(e) => handleCarouselChange(i as 0 | 1 | 2, e.target.value)}
                placeholder="/images/xxx.jpg 또는 https://..."
                aria-label={`캐러셀 이미지 링크 ${i + 1}`}
              />
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>소개글</Form.Label>
            <Form.Control
              value={getIntro}
              onChange={(e) => setGetIntro(e.target.value)}
              aria-label="소개글"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>상세 이미지 링크</Form.Label>
            <Form.Control
              value={getPictureLink}
              onChange={(e) => setGetPictureLink(e.target.value)}
              placeholder="/images/xxx.jpg 또는 https://..."
              aria-label="상세 이미지 링크"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>영상 링크</Form.Label>
            <Form.Control
              value={getVideoLink}
              onChange={(e) => setGetVideoLink(e.target.value)}
              placeholder="/videos/xxx.mp4 또는 https://..."
              aria-label="영상 링크"
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="primary" type="submit">
              수정하기
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
        opt={alertMsg === '수정 완료' ? 2 : 1}
      />
    </div>
  );
};

export default EditModal;
