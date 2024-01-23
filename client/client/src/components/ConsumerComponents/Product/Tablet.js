import React, { useState, useEffect } from 'react';

import './styles/product-client.css';

import { Breadcrumbs, Footer, Nav, SideBanner } from '../Common';
import { FillterByPrice, handleLoadingPage } from '../../Common';

const Tablet = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Clinic Online | Máy tính bảng - nhìn là mê';
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
    // show tất cả các sản phẩm tablet
    products.map((product, index) => {
      const infoProductFeaturedTablet = document.querySelectorAll(
        '.product-client__item',
      )[index];
      if (product.product_type === 'Scientific') {
        infoProductFeaturedTablet.style.display = 'block';
      }
    });
  }, [products]);

  window.onload = () => {
    handleChangeBanner();
  };

  const handleChangeBanner = () => {
    const arrayBanner = [
      'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20copy%202-1703904593788.png',
      'https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-asm/posts/banner-tool-suc-khoe-web-1.webp',
      'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/Banner%202H%20-%20913x280px%20(1)-1702891520379.png',
      'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/Banner%202H%20-%20913x280px%20(1)-1702891520379.png',
      'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(5)-1704957977893.png',
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
    'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20copy%202-1703904593788.png',
    'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(5)-1704957977893.png',
    'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/Banner%202H%20-%20913x280px%20(1)-1702891520379.png',
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
        product.enType === 'tablet',
    );
    setProducts(filteredProducts);
  };

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div
        className="container"
        style={{ marginTop: '60px', padding: '50px 0 40px' }}
      >
        <div className="grid wide">
          <SideBanner />
          <div className="product-client__event">
            <img
              src="https://cdn.nhathuoclongchau.com.vn/unsafe/1440x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1196x352_aed681f792.jpg"
              alt=""
              className="product-client__event-primary"
            ></img>

            <div className="product-client__event-list">
              <div className="product-client__event-col-left">
                <img
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/1440x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1920x565_071fe682e5.png"
                  className="product-client__event-col-left-item"
                ></img>
                <img
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/web_pc_1610x492_00b3003e3e.jpg"
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
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/1440x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1196x352_aed681f792.jpg"
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
              src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/event-item-gif.gif"
              alt="ảnh gif"
            ></img> */}
          </div>

          <label className="product-client__title-brand">
          TOP BRANDS
          </label>
          <div className="product-brand-list">
            <div className="product-client__brand">
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/logo-ipad.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/logo-samsung.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/logo-xiaomi.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/logo-oppo.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/logo-vivo.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/logo-realme.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/logo-nokia.png"
              ></img>
            </div>
          </div>

          <label className="product-client__title-brand">Filter products</label>
          <FillterByPrice
            minPrice={0}
            maxPrice={100000000}
            onFilterChange={handleFilterChange}
          />

          <ul className="product-client__list">
            {loading ? (
              <p>Đang kết nối đến server ... </p>
            ) : (
              products.map((product, index) => (
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
                    src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/icon-hot.gif"
                  ></img>
                  <img
                    className="product-client__item-icon"
                    src="https://server-Clinic Online.onrender.com/public/product-img/tablet-img/icon-18-month.png"
                  ></img>
                  <label className="product-client__item-price">
                    {Number(product.product_price).toLocaleString()} ₫
                  </label>
                  <span className="product-client__item-percent">
                    {(Number(product.product_price) * 1.065).toLocaleString()}đ
                  </span>
                  <label className="product-client__item-vote">
                    <span className="product-client__item-star-icon">
                      {handleFormatStarProduct(product.star)}{' '}
                    </span>{' '}
                    ({product.voter || 0} đánh giá)
                  </label>
                  <div className="product-client__item-tag">
                    Giảm {product.product_quantity}%
                  </div>
                </li>
              ))
            )}
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

export default Tablet;
