import React, { useState, useEffect } from 'react';

import './styles/product-client.css';

import { Breadcrumbs, Footer, Nav, SideBanner } from '../Common';
import { FillterByPrice, handleLoadingPage } from '../../Common';

const Laptop = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Clinic Online | Laptop thời thượng';
    const fetchAPIs = () => {
      fetch('https://localhost:7096/api/products')
        .then((res) => res.json())
        .then((data) => {
          console.log("data:::: ", data);
          setProducts(data);
          setLoading(false);
        });
    };
    fetchAPIs();
  }, []);


console.log("productsAAAA:: ", products);

  useEffect(() => {
    // show danh mục laptop
    products.map((product, index) => {
      const infoProductFeaturedlaptop = document.querySelectorAll(
        '.product-client__item',
      )[index];
      if (product.product_type === 'Scientific') {
        infoProductFeaturedlaptop.style.display = 'block';
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
      'https://www.pharmacity.vn/images/store/promotion-pmc-app-banner.png',
      'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20(5)-1704957977893.png',
      'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)%20copy%202-1703904593788.png',
      'https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/Banner%202H%20-%20913x280px%20(1)-1702891520379.png',
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
    'https://www.pharmacity.vn/images/store/promotion-pmc-app-banner.png',
    'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Destop_3_8cbf98bf7e.jpg',
    'https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1610x492_banner_desktop_dcd882dd4c.png',
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
        product.enType === 'laptop',
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
          backgroundSize: 'contain',
          marginTop: '60px',
          padding: '50px 0 40px',
        }}
      >
        <div className="grid wide">
          <SideBanner />
          <div className="product-client__event">
            <img
              src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg"
              alt=""
              className="product-client__event-primary"
            ></img>

            <div className="product-client__event-list">
              <div className="product-client__event-col-left">
                <img
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/web_pc_1610x492_00b3003e3e.jpg"
                  className="product-client__event-col-left-item"
                ></img>
                <img
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/Banner_Web_PC_1610x492_38657748b1.png"
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
                  src="https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/PC_1610x492_1b8c8077fa.jpg"
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
              src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/event-item-gif.gif"
              alt="ảnh gif"
            ></img> */}
          </div>

          {/* <label className="product-client__title-brand">
          TOP BRANDS
          </label>
          <div className="product-brand-list">
            <div className="product-client__brand">
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-macbook.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-dell.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-asus.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-acer.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-lenovo.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-gigabyte.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-msi.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-hp.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-microsoft.png"
              ></img>
              <img
                className="product-client__brand-item"
                src="https://server-Clinic Online.onrender.com/public/product-img/laptop-img/logo-masstel.png"
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
                    src="https://server-shoptech.onrender.com/public/product-img/laptop-img/icon-hot.gif"
                  ></img>
                  <img
                    className="product-client__item-icon"
                    src="https://server-shoptech.onrender.com/public/product-img/laptop-img/icon-18-month.png"
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
                  Reduce {product.product_quantity}%   
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

export default Laptop;
