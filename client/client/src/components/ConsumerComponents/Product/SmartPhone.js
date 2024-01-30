import React, { useState, useEffect } from 'react';

import { Breadcrumbs, Footer, Nav, SideBanner } from '../Common';

import './styles/product-client.css';
import { FillterByPrice, handleLoadingPage } from '../../Common';

const SmartPhone = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Clinic Online | Điện thoại - Sale ngập tràn';
    const fetchAPIs = () => {
      fetch('https://localhost:7096/api/products')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        });
    };
    fetchAPIs();
  }, []);

  useEffect(() => {
    // show tất cả những điện thoại di dộng
    products.map((product, index) => {
      const infoProductFeaturedSmartphone = document.querySelectorAll(
        '.product-client__item',
      )[index];
      if (product.product_type === 'Medical') {
        infoProductFeaturedSmartphone.style.display = 'block';
      }
    });
  }, [products]);

  window.onload = () => {
    handleChangeBanner();
  };

  const handleChangeBanner = () => {
    const arrayBanner = [
      'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg',
      'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg',
      'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg',
      'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg',
    ];
    var index = 0;
    setInterval(function () {
      if (index === arrayBanner.length) {
        index = 0;
      }
      document.querySelector('.product-client__event-primary').src =
        arrayBanner[index];
      index++;
    }, 3000);
  };

  const arrayPromote = [
    'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703991118_1376x333_6.png',
    'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/TET_913x280%20(x1.5)%20opt2%20(2)-1704944470001.jpg',
    'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/392x134px-1691463642426.png',
  ];
  var indexPromote = 0;
  const handleNextPromote = () => {
    if (indexPromote >= arrayPromote.length - 1) {
      indexPromote = 0;
    }
    indexPromote++;
    document.querySelector(
      '.product-client__event-col-right-item',
    ).style.animation = 'slideInLeft ease .3s';
    document.querySelector('.product-client__event-col-right-item').src =
      arrayPromote[indexPromote];
  };

  const handlePrevPromote = (event) => {
    if (indexPromote <= 0) {
      indexPromote = arrayPromote.length;
    }
    indexPromote--;
    document.querySelector(
      '.product-client__event-col-right-item',
    ).style.animation = 'slideInLeft ease .3s';
    document.querySelector('.product-client__event-col-right-item').src =
      arrayPromote[indexPromote];
  };

  const handleFormatStarProduct = (starOfProduct) => {
    if (starOfProduct < 1) {
      return `☆☆☆☆☆`;
    } else if (starOfProduct < 2) {
      return `★☆☆☆☆`;
    } else if (starOfProduct < 3) {
      return `★★☆☆☆`;
    } else if (starOfProduct < 4) {
      return `★★★☆☆`;
    } else if (starOfProduct < 5) {
      return `★★★★☆`;
    } else {
      return `★★★★★`;
    }
  };

  const handleFilterChange = (minPrice, maxPrice) => {
    const filteredProducts = products.filter(
      (product) =>
        Number(product.product_price) >= minPrice &&
        Number(product.product_price) <= maxPrice &&
        product.enType === 'smartphone',
    );
    setProducts(filteredProducts);
  };

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div
        className="container"
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          marginTop: '60px',
          padding: '50px 0 40px',
        }}
      >
        <div className="grid wide">
          <SideBanner />
          <div className="product-client__event">
            <img
              src="hhttps://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703991118_1376x333_6.png"
              alt=""
              className="product-client__event-primary"
            ></img>

            <div className="product-client__event-list">
              <div className="product-client__event-col-left">
                <img
                  src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg"
                  className="product-client__event-col-left-item"
                ></img>
                <img
                  src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/tuivai_913x280x1.5-1703672872315.jpg"
                  className="product-client__event-col-left-item"
                ></img>
              </div>

              <div className="product-client__event-col-right">
                <button
                  className="product-client__event-btn--prev"
                  onClick={handlePrevPromote}
                >
                  <i className="fa fa-arrow-left"></i>
                </button>
                <img
                  src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/TET_913x280%20(x1.5)%20opt2%20(2)-1704944470001.jpg"
                  className="product-client__event-col-right-item"
                ></img>
                <button
                  className="product-client__event-btn--next"
                  onClick={handleNextPromote}
                >
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
            {/* <img
              className="product-client__event-gif"
              src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/event-item-gif.gif"
              alt="ảnh gif"
            ></img> */}
          </div>

          {/* <label className="product-client__title-brand">
          TOP BRAND
          </label>
          <div className="product-brand-list">
            <div className="product-client__brand">
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-iphone.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-samsung.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-xiaomi.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-oppo.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-realme.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-nokia.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-masstel.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/smartphone-img/logo-vivo.png"
              ></img>
            </div>
          </div> */}

          <label className="product-client__title-brand">Filter products</label>
          <FillterByPrice
            minPrice={0}
            maxPrice={100000000}
            onFilterChange={handleFilterChange}
          />
          <ul className="product-client__list">
            {products.map((product, index) => (
              <li
                className="product-client__item"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  handleLoadingPage(1);
                  window.setTimeout(() => {
                    window.location.href = `/product/${product.product_type}/${product.product_name}`;
                  }, 1000);
                }}
              >
                <img
                  src={product.product_img}
                  className="product-client__item-img"
                ></img>
                <label className="product-client__item-label">
                  {product.product_name}
                </label>
                <img
                  className="product-client__item-hot-icon"
                  src="https://server-shoptech.onrender.com/public/product-img/smartphone-img/icon-hot.gif"
                ></img>
                <img
                  className="product-client__item-icon"
                  src="https://server-shoptech.onrender.com/public/product-img/smartphone-img/icon-18-month.png"
                ></img>
                <label className="product-client__item-price">
                  {Number(product.product_price).toLocaleString()} ₫
                </label>
                <span className="product-client__item-percent">
                  {(Number(product.product_price) * 1.065).toLocaleString()}đ
                </span>
                <label className="product-client__item-vote">
                  <span className="product-client__item-star-icon">
                    {handleFormatStarProduct(product.product_star)}{' '}
                  </span>{' '}
                  ({product.voter || 0} đánh giá)
                </label>
                <div className="product-client__item-tag">
                  Giảm {product.product_percent}%
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
      <p className="app-copyright">
      ©️ Copyright belongs to Clinic Online - 2023 <br />
      Address: 391 Nam Ky Khoi Nghia, Vo Thi Sau ward. District 3, Ho Chi Minh City.
      </p>
    </>
  );
};

export default SmartPhone;
