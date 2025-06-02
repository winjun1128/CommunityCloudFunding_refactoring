import { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    { no: 1, imglink: "/images/basketball1.jpeg", name: '농구공1', companyname: '농구공회사1', startdate: '2025-05-28', enddate: '2025-06-11', percent: 50, price: 10000, gainmoney: 10000, recruitmoney: 20000, category: 'food', count: 1, carousellink:['/images/basketball1.jpeg','/images/basketball1.jpeg','/images/basketball1.jpeg'], intro:'농구공소개', picturelink:'/images/basketball1.jpeg', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 2, imglink: "/images/basketball1.jpeg", name: '농구공2', companyname: '농구공회사2', startdate: '2025-05-29', enddate: '2025-06-11', percent: 50, price: 10500, gainmoney: 10500, recruitmoney: 21000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 3, imglink: "/images/basketball1.jpeg", name: '농구공3', companyname: '농구공회사3', startdate: '2025-05-30', enddate: '2025-06-11', percent: 33, price: 11000, gainmoney: 11000, recruitmoney: 33000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 4, imglink: "/images/basketball1.jpeg", name: '농구공4', companyname: '농구공회사1', startdate: '2025-05-31', enddate: '2025-06-11', percent: 50, price: 11500, gainmoney: 11500, recruitmoney: 23000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 5, imglink: "/images/basketball1.jpeg", name: '농구공5', companyname: '농구공회사2', startdate: '2025-06-01', enddate: '2025-06-11', percent: 50, price: 12000, gainmoney: 12000, recruitmoney: 24000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 6, imglink: "/images/basketball1.jpeg", name: '농구공6', companyname: '농구공회사3', startdate: '2025-06-02', enddate: '2025-06-11', percent: 50, price: 12500, gainmoney: 12500, recruitmoney: 25000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 7, imglink: "/images/basketball1.jpeg", name: '농구공7', companyname: '농구공회사1', startdate: '2025-06-03', enddate: '2025-06-11', percent: 100, price: 13000, gainmoney: 26000, recruitmoney: 26000, category: 'food', count: 2, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 8, imglink: "/images/basketball1.jpeg", name: '농구공8', companyname: '농구공회사2', startdate: '2025-06-04', enddate: '2025-06-11', percent: 100, price: 13500, gainmoney: 27000, recruitmoney: 27000, category: 'living', count: 2, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 9, imglink: "/images/basketball1.jpeg", name: '농구공9', companyname: '농구공회사3', startdate: '2025-06-05', enddate: '2025-06-11', percent: 50, price: 14000, gainmoney:14000, recruitmoney: 28000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 10, imglink: "/images/basketball1.jpeg", name: '농구공10', companyname: '농구공회사1', startdate: '2025-06-06', enddate: '2025-06-11', percent: 50, price: 14500, gainmoney:14500, recruitmoney: 29000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 11, imglink: "/images/basketball1.jpeg", name: '농구공11', companyname: '농구공회사2', startdate: '2025-06-07', enddate: '2025-06-11', percent: 25, price: 15000, gainmoney:15000, recruitmoney: 60000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 12, imglink: "/images/basketball1.jpeg", name: '농구공12', companyname: '농구공회사3', startdate: '2025-06-08', enddate: '2025-06-11', percent: 50, price: 15500, gainmoney:15500, recruitmoney: 31000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 13, imglink: "/images/basketball1.jpeg", name: '농구공13', companyname: '농구공회사1', startdate: '2025-06-09', enddate: '2025-06-11', percent: 33, price: 16000, gainmoney:16000, recruitmoney: 48000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 14, imglink: "/images/basketball1.jpeg", name: '농구공14', companyname: '농구공회사2', startdate: '2025-06-10', enddate: '2025-06-11', percent: 50, price: 16500, gainmoney:16500, recruitmoney: 33000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 15, imglink: "/images/basketball1.jpeg", name: '농구공15', companyname: '농구공회사3', startdate: '2025-06-11', enddate: '2025-06-11', percent: 20, price: 17000, gainmoney:17000, recruitmoney: 85000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 16, imglink: "/images/basketball1.jpeg", name: '농구공16', companyname: '농구공회사1', startdate: '2025-05-28', enddate: '2025-06-11', percent: 50, price: 17500, gainmoney:17500, recruitmoney: 35000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 17, imglink: "/images/basketball1.jpeg", name: '농구공17', companyname: '농구공회사2', startdate: '2025-05-29', enddate: '2025-06-11', percent: 33, price: 18000, gainmoney:18000, recruitmoney: 54000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 18, imglink: "/images/basketball1.jpeg", name: '농구공18', companyname: '농구공회사3', startdate: '2025-05-30', enddate: '2025-06-11', percent: 50, price: 18500, gainmoney:18500, recruitmoney: 37000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 19, imglink: "/images/basketball1.jpeg", name: '농구공19', companyname: '농구공회사1', startdate: '2025-05-31', enddate: '2025-06-11', percent: 200, price: 19000, gainmoney:38000, recruitmoney: 19000, category: 'food', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' },
    { no: 20, imglink: "/images/basketball1.jpeg", name: '농구공20', companyname: '농구공회사2', startdate: '2025-06-01', enddate: '2025-06-11', percent: 50, price: 19500, gainmoney:19500, recruitmoney: 39000, category: 'living', count: 1, carousellink:['','',''], intro:'', picturelink:'', videolink:'',heart:[''],consumer:[''],seller:'' }
  ]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
