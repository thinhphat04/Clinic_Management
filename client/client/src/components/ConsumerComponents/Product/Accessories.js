import React, { useState, useEffect } from 'react';

import './styles/product-client.css';

import { Breadcrumbs, Footer, Nav, SideBanner } from '../Common';
import { FillterByPrice, handleLoadingPage } from '../../Common';

const Accessories = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Clinic Online | Phụ kiện đỉnh 'chóp'";
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
    //  show các phụ kiện
    products.map((product, index) => {
      const infoProductFeaturedAccessories = document.querySelectorAll(
        '.product-client__item',
      )[index];
      if (product.product_type === 'Medical' || product.product_type === 'Education' || product.product_type ==='Scientific') {
        infoProductFeaturedAccessories.style.display = 'block';
      }
    });
  }, [products]);

  window.onload = () => {
    handleChangeBanner();
  };

  const handleChangeBanner = () => {
    const arrayBanner = [
      'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-banner.png',
      'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-banner2.png',
      'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-banner3.png',
      'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-banner4.png',
      'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-banner5.png',
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
    'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-list-item3.png',
    'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-list-item4.png',
    'https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-list-item5.png',
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
        product.enType === 'accessories',
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
              src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-banner.png"
              alt=""
              className="product-client__event-primary"
            ></img>

            <div className="product-client__event-list">
              <div className="product-client__event-col-left">
                <img
                  src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-list-item.png"
                  className="product-client__event-col-left-item"
                ></img>
                <img
                  src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-list-item2.png"
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
                  src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/event-list-item3.png"
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
            <img
              className="product-client__event-gif"
              src="https://localhost:7096/public/product-img/accessories-img/event-item-gif.gif"
              alt="ảnh gif"
            ></img>
          </div>

          <div class="accessories__group-cate">
            <div class="accessories__group">
              <div class="accessories__group group-iphone">
                <div class="accessories__group-name">
                  <p>Phụ Kiện</p>
                  <p>Phone, Tablet</p>
                </div>
                <div class="arrow-filter"></div>
              </div>
            </div>
            <div class="accessories__group">
              <div class="accessories__group  group-laptop">
                <div class="accessories__group-name">
                  <p>Phụ Kiện</p>
                  <p>Laptop, PC</p>
                </div>
                <div class="arrow-filter"></div>
              </div>
            </div>
            <div class="accessories__group">
              <div class="accessories__group group-sound">
                <div class="accessories__group-name">
                  <p>Thiết bị</p>
                  <p>Âm thanh</p>
                </div>
                <div class="arrow-filter"></div>
              </div>
            </div>
            <div class="accessories__group">
              <div class="accessories__group group-tech">
                <div class="accessories__group-name">
                  <p>Phụ Kiện</p>
                  <p>Công nghệ</p>
                </div>
                <div class="arrow-filter"></div>
              </div>
            </div>

            <div class="accessories__group">
              <div class="accessories__group group-maycu">
                <div class="accessories__group-name">
                  <p>Phụ Kiện</p>
                  <p>đã sử dụng</p>
                  <p>giá rẻ</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="product-client__title-brand">
              PHỤ KIỆN ĐỈNH CHÓP
            </label>

            <div class="accessories__list-category">
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/9518/10-Cápsạcchuyểndổi-120x120.png"></img>
                <label>Sạc, cáp</label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/54/21-Tainghe-120x120.png"></img>
                <label>Tai nghe</label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/2162/22-Loa2-120x120.png"></img>
                <label>Loa</label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/9458/thongminh-120x120.png"></img>
                <label>Thiết bị thông minh </label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/4728/17-Camerawebcam-120x120.png"></img>
                <label>Camera, webcam</label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/4727/16-Thiếtbịmạng-120x120.png"></img>
                <label>Thiết bị mạng</label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/9262/icon-mieng-dan-op-lung-100x100-1.png"></img>
                <label>Ốp lưng, miếng dán</label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/86/13-Chuộtmáytính-120x120.png"></img>
                <label>Chuột máy tính</label>
              </div>
              <div class="accessories__group-category">
                <img src="https://cdn.tgdd.vn/Category/4547/19-Bànphím-120x120.png"></img>
                <label>Bàn phím</label>
              </div>
            </div>
          </div>

          <label className="product-client__title-brand">
          TOP BRANDS
          </label>
          <div className="product-brand-list">
            <div className="product-client__brand">
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-apple.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-samsung.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-xiaomi.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-oppo.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-harman.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-sony.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-anker.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-jbl.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-dareu.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-mophie.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/logo-razer.png"
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
                    src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/icon-hot.gif"
                  ></img>
                  <img
                    className="product-client__item-icon"
                    src="https://server-Clinic Online.onrender.com/public/product-img/accessories-img/icon-18-month.png"
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
                    ({product.voter || 0} Evaluate)
                  </label>
                  <div className="product-client__item-tag">
                  Reduce {product.percent}%
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

export default Accessories;
