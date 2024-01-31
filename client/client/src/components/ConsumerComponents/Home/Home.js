import React, { useState, useEffect } from "react";
import "./styles/homepage-style.css";
import { Nav, Footer, SideBanner, NavMobile } from "../Common";
import HotPromote from "./HotPromote";
import HomeList from "./HomeList";
import { handleLoadingPage } from "../../Common";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [timeStart, setTimeStartSale] = useState(20);
  const [timeEnd, setTimeEndSale] = useState(31);
  const [promotes, setPromotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchAPIs = () => {
  //     fetch('https://localhost:7096/api/Products')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setProducts(data);
  //         setLoading(false);
  //       });

  //     fetch('https://localhost:7096/api/promotes')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setPromotes(data);
  //         setLoading(false);
  //       });
  //   };
  //   fetchAPIs();
  //   handleLoadCountdown();
  // }, []);

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const productsResponse = await axios.get(
          "https://localhost:7096/api/Products"
        );
        setProducts(productsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi tại đây, ví dụ thông báo cho người dùng
      } finally {
        // setLoading(false);
      }
    };
    fetchAPIs();
    // handleLoadCountdown();
  }, []);  
  console.log("products:; ", products);
  useEffect(() => {
    // show thông tin sản phẩm hot deal
    // products.map((product, index) => {
    //   const infoProductHotDeal = document.querySelectorAll(
    //     ".home__flash-sale-item"
    //   )[index];
    //   if (product.hotDeal === true) {
    //     infoProductHotDeal.style.display = "inline-block";
    //   }
    // });

    // show thông tin điện thoại nổi bật
    products.map((product, index) => {
      const infoProductFeaturedSmartphone = document.querySelectorAll(
        ".product__sell-item--smartphone"
      )[index];
      if (product.product_type === "Medical") {
        infoProductFeaturedSmartphone.style.display = "block";
      }
    });

    // show thông tin laptop nổi bật
    products.map((product, index) => {
      const infoProductFeaturedLaptop = document.querySelectorAll(
        ".product__sell-item--laptop"
      )[index];
      if (product.product_type === "Education") {
        infoProductFeaturedLaptop.style.display = "block";
      }
    });

    //  show thông tin tablet nổi bật
    products.map((product, index) => {
      const infoProductFeaturedTablet = document.querySelectorAll(
        ".product__sell-item--tablet"
      )[index];
      if (product.product_type === "Scientific") {
        infoProductFeaturedTablet.style.display = "block";
      }
    });

    //  show thông tin phụ kiện nổi bật
    products.map((product, index) => {
      const infoProductFeaturedAccessories = document.querySelectorAll(
        '.product__sell-item--accessories',
      )[index];
      if (product.product_type === 'Scientific' ||product.product_type === "Education" || product.product_type === "Medical" ) {
        infoProductFeaturedAccessories.style.display = 'block';
      }
    });
    handleLoadBanner();
    handleSetWidthBanner();
  }, [products]);

  // const handleLoadCountdown = () => {
  //   var countDownDate = new Date(`7 ${timeEnd}, 2023 00:00:00`).getTime();
  //   const countdown = setInterval(() => {
  //     var now = new Date().getTime();
  //     var timeleft = countDownDate - now;

  //     var daysLeft = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  //     var hoursLeft = Math.floor(
  //       (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //     );
  //     var minutesLeft = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  //     var secondsLeft = Math.floor((timeleft % (1000 * 60)) / 1000);

  //     document.querySelector(".home__flash-sale-countdown-day").innerHTML =
  //       `<span>${daysLeft} ngày</span>`;
  //     document.querySelector(".home__flash-sale-countdown-hour").innerHTML =
  //       `<span>${hoursLeft}</span>`;
  //     document.querySelector(".home__flash-sale-countdown-minute").innerHTML =
  //       `<span>${minutesLeft}</span>`;
  //     document.querySelector(".home__flash-sale-countdown-second").innerHTML =
  //       `<span>${secondsLeft}</span>`;

  //     if (timeleft < 0) {
  //       clearInterval(countdown);
  //     }
  //   }, 1000);
  // };

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

  var indexBanner = 0;
  const handleSetWidthBanner = () => {
    const bannerGroup = document.querySelector(".home-promote__group");
    const bannerList = document.querySelectorAll(".home-promote__item");
    if (bannerList.length > 0) {
      bannerGroup.style.width = `${Number(bannerList.length) * 600}px`;
    }
  };

  const handleLoadBanner = () => {
    const bannerGroup = document.querySelector(".home-promote__group");
    const bannerList = document.querySelectorAll(".home-promote__item");
    setInterval(() => {
      indexBanner += 1;
      bannerGroup.style.transform = `translateX(-${(indexBanner - 1) * 600}px)`;

      if (
        indexBanner > bannerList.length - 1 ||
        indexBanner === bannerList.length
      ) {
        bannerGroup.style.transform = "translateX(0)";
        indexBanner = 0;
      } else {
        bannerGroup.style.transform = `translateX(-${indexBanner * 600}px)`;
      }
    }, 4000);
  };

  const handleTransitionNextBanner = () => {
    const bannerGroup = document.querySelector(".home-promote__group");
    const bannerList = document.querySelectorAll(".home-promote__item");
    indexBanner += 1;

    if (indexBanner >= bannerList.length - 1) {
      bannerGroup.style.transform = "translateX(0)";
      indexBanner = 0;
      return;
    }
    bannerGroup.style.transform = `translateX(-${indexBanner * 600}px)`;
  };

  const handleTransitionPrevBanner = () => {
    const bannerGroup = document.querySelector(".home-promote__group");
    const bannerList = document.querySelectorAll(".home-promote__item");
    indexBanner -= 1;

    if (indexBanner < 1) {
      indexBanner = bannerList.length;
      bannerGroup.style.transform = `translateX(-${
        (bannerList.length - 1) * 600
      }px)`;
      return;
    }
    bannerGroup.style.transform = `translateX(-${indexBanner * 600 - 600}px)`;
  };

  var indexSlide = 0;
  const handleTransitionSlideDown = () => {
    if (indexSlide < 0) indexSlide = 0;
    const slideGroup = document.querySelector(".home-flash-sale__group");
    const slideList = document.querySelectorAll(".home__flash-sale-item");
    indexSlide += 1;
    if (indexSlide > (slideList.length - (slideList.length % 10)) / 10) {
      indexSlide = (slideList.length - (slideList.length % 10)) / 10;
      return;
    } else {
      slideGroup.style.transform = `translateY(-${indexSlide * 794}px)`;
    }
  };

  const handleTransitionSlideUp = () => {
    if (indexSlide < 0) indexSlide = 0;
    const slideGroup = document.querySelector(".home-flash-sale__group");
    indexSlide -= 1;
    if (indexSlide < 0) return;
    else {
      slideGroup.style.transform = `translateY(-${
        (indexSlide + 1) * 790 - 790
      }px)`;
    }
  };

  return (
    <>
      <Nav />
      <HotPromote />
      <div className="grid wide">
        <div className="home__container">
          <SideBanner />
          <ul id="home-promote">
            <button
              className="home-promote__pre"
              onClick={handleTransitionPrevBanner}
            >
              <i className="home-promote__icon fa fa-arrow-left"></i>
            </button>
            <button
              className="home-promote__next"
              onClick={handleTransitionNextBanner}
            >
              <i className="home-promote__icon fa fa-arrow-right"></i>
            </button>

            <div className="home-promote__group">
              {loading ? (
                <p>Đang kết nối đến server...</p>
              ) : (

                <div>
                  <img
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/1440x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1196x352_aed681f792.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 1"
                  />

                  <img
                    src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/tuivai_913x280x1.5-1703672872315.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 2"
                  />
                  <img
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/1440x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/1196x352_aed681f792.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 3"
                  />
                  <img
                    src="https://cdn.nhathuoclongchau.com.vn/unsafe/828x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/web_pc_1610x492_00b3003e3e.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 4"
                  />
                  <img
                    src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/tuivai_913x280x1.5-1703672872315.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 5"
                  />
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 6"
                  />
                  <img
                    src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/TET_913x280%20(x1.5)%20opt2%20(2)-1704944470001.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 7"
                  />
                  <img
                    src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/tuivai_913x280x1.5-1703672872315.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 8"
                  /> 
                  <img
                    src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/collection-images/1703735550_GIASOCCUOITUAN_1376X333_1.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 9"
                  />
                  <img
                    src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/tuivai_913x280x1.5-1703672872315.jpg"
                    className="home-promote__item"
                    alt="Promotion Image 10"
                  />
                </div>
              )}
            </div>
          </ul>

          <HomeList />

          {/* <div id="home__flash-sale">
            <div className="home__flash-sale-label">
              Extremely Promotion <span>HOT</span> - 🔥🔥🔥
            </div>
            <div className="home__flash-sale-banner"></div>
            <div className="home__flash-sale-container">
              <div className="home__flash-sale-header">
                <div className="home__flash-sale-background"></div>
                <div className="home__flash-sale-header-col">
                  <div className="home__flash-sale-title">
                    Golden hour for DEAL hunting
                  </div>
                  <div className="home__flash-sale-countdown">Ends in:</div>
                  <div className="home__flash-sale-countdown-day"></div>
                  <span className="home__flash-sale-countdown-sepetate">:</span>
                  <div className="home__flash-sale-countdown-hour"></div>
                  <span className="home__flash-sale-countdown-sepetate">:</span>
                  <div className="home__flash-sale-countdown-minute"></div>
                  <span className="home__flash-sale-countdown-sepetate">:</span>
                  <div className="home__flash-sale-countdown-second"></div>
                </div>
                <div className="home__flash-sale-header-col">
                  <div className="home__flash-sale-time">Promotion time</div>
                  <div className="home__flash-sale-time-valid">
                    {timeStart}/01/2024 - {timeEnd}/02/2024
                  </div>
                </div>
              </div>

              <button
                className="home__flash-sale-btn"
                onClick={handleTransitionSlideUp}
              >
                <i className="home__flash-sale-btn-icon fa-solid fa-chevron-up"></i>
              </button>
              <ul className="home__flash-sale-list">
                <div className="home-flash-sale__group">
                  {loading ? (
                    <p>Đang kết nối đến server ... </p>
                  ) : (
                    // products.map((product, index) => (
                    //   <li
                    //     className="home__flash-sale-item"
                    //     key={index}
                    //     onClick={(e) => {
                    //       e.preventDefault();
                    //       handleLoadingPage(1);
                    //       window.setTimeout(() => {
                    //         window.location.href = `/product/${product.product_type}/${product.product_name}`;
                    //       }, 1000);
                    //     }}
                    //   >
                    //     <img
                    //       src={product.product_img}
                    //       className="home__flash-sale-item-img"
                    //     ></img>
                    //     <img
                    //       className="product-client__item-hot-icon"
                    //       src="https://server-shoptech.onrender.com/public/product-img/smartphone-img/icon-hot.gif"
                    //     ></img>
                    //     <label className="home__flash-sale-item-label">
                    //       {product.product_name}
                    //     </label>
                    //     <label className="home__flash-sale-item-price">
                    //       {Number(product.product_price).toLocaleString()} ₫
                    //     </label>
                    //     <span className="home__flash-sale-item-percent">
                    //       {(
                    //         Number(product.product_price) * 1.065
                    //       ).toLocaleString()}
                    //       đ
                    //     </span>
                    //     <label className="home__flash-sale-item-sold">
                    //       Đã bán
                    //       <span className="home__flash-sale-item-number">
                    //         {Math.floor(
                    //           Number((Math.random() % 100) * (99 - 1))
                    //         )}
                    //       </span>
                    //     </label>
                    //     <div className="home__flash-sale-item-tag">
                    //       Giảm {product.product_quantity}%
                    //     </div>
                    //   </li>
                    // ))
                    <p>AAAAAAAAAAAAAAAAAA</p>
                  )}
                </div>
              </ul>
              <button
                className="home__flash-sale-btn"
                onClick={handleTransitionSlideDown}
              >
                <i className="home__flash-sale-btn-icon fa-solid fa-chevron-down"></i>
              </button>
            </div>
          </div> */}

          <div id="home__featured">
            <div className="home__featured-label">FEATURED PRODUCTS</div>
            <div
              className="home__featured-banner-phone"
              onClick={(e) => {
                handleLoadingPage(1, `/product/smartphone`);
              }}
            ></div>
            <div
              className="home__featured-type"
              onClick={(e) => {
                handleLoadingPage(1, `/product/smartphone`);
              }}
            >
              MEIDCAL
            </div>
            <div className="home__featured-brand-list">
              <button className="home__product-brand-item">
                Pharmacist gives free consultation
              </button>
              <button className="home__product-brand-item">
                Good cheap medicine
              </button>
              <button className="home__product-brand-item">
                100% genuine medicine
              </button>
              <button className="home__product-brand-item">
                Enough correct medicine
              </button>
            </div>
            <ul className="home__featured-list">
              {loading ? (
                <p>Connecting to the server... </p>
              ) : (
                products.map((product, index) => (
                  <li
                    className="product__sell-item product__sell-item--smartphone"
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
                      className="home__flash-sale-item-img"
                    ></img>
                    <img
                      className="product-client__item-hot-icon"
                      src="https://server-shoptech.onrender.com/public/product-img/smartphone-img/icon-hot.gif"
                    ></img>
                    <label className="product__sell-item-label">
                      {product.product_name}
                    </label>
                    <label className="product__sell-item-price">
                      {Number(product.product_price).toLocaleString()} ₫
                    </label>
                    <span className="product__sell-item-percent">
                      {((Number(product.product_price) * 100)/ (100-Number(product.product_percent))).toLocaleString()}
                      đ
                    </span>
                    <label className="product__sell-item-sold">
                    Evaluate:
                      <span className="product__sell-item-star-icon">
                        {handleFormatStarProduct(product.product_star)}
                      </span>
                    </label>
                    <div className="home__flash-sale-item-tag">
                    Reduce {product.product_percent}%
                    </div>
                  </li>
                 
                ))            
               
              )}
            </ul>

            <div
              className="home__featured-banner-tablet"
              onClick={(e) => {
                handleLoadingPage(1, `/product/tablet`);
              }}
            ></div>
            <div
              className="home__featured-type "
              onClick={(e) => {
                handleLoadingPage(1, `/product/tablet`);
              }}
            >
              SCIENTIFIC
            </div>
            <div className="home__featured-brand-list">
              <button className="home__product-brand-item">
                Pharmacist gives free consultation
              </button>
              <button className="home__product-brand-item">
                Good cheap medicine
              </button>
              <button className="home__product-brand-item">
                100% genuine medicine
              </button>
              <button className="home__product-brand-item">
                Enough correct medicine
              </button>
            </div>
            <ul className="home__featured-list">
              {loading ? (
                <p>Connecting to the server... </p>
              ) : (
                products.map((product, index) => (
                  <li
                    className="product__sell-item product__sell-item--tablet"
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
                      className="home__flash-sale-item-img"
                    ></img>
                    <img
                      className="product-client__item-hot-icon"
                      src="https://server-shoptech.onrender.com/public/product-img/smartphone-img/icon-hot.gif"
                    ></img>
                    <label className="product__sell-item-label">
                      {product.product_name}
                    </label>
                    <label className="product__sell-item-price">
                      {Number(product.product_price).toLocaleString()} ₫
                    </label>
                    <span className="product__sell-item-percent">
                    {((Number(product.product_price) * 100)/ (100-Number(product.product_percent))).toLocaleString()}
                      đ
                    </span>
                    <label className="product__sell-item-sold">
                    Evaluate:
                      <span className="product__sell-item-star-icon">
                        {handleFormatStarProduct(product.product_star)}
                      </span>
                    </label>
                    <div className="home__flash-sale-item-tag">
                    Reduce {product.product_percent}%
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div
              className="home__featured-banner-laptop"
              onClick={(e) => {
                handleLoadingPage(1, `/product/laptop`);
              }}
            ></div>
            <div
              className="home__featured-type"
              onClick={(e) => {
                handleLoadingPage(1, `/product/laptop`);
              }}
            >
              EDUCATION
            </div>
            <div className="home__featured-brand-list">
              <button className="home__product-brand-item">
                Pharmacist gives free consultation
              </button>
              <button className="home__product-brand-item">
                Good cheap medicine
              </button>
              <button className="home__product-brand-item">
                100% genuine medicine
              </button>
              <button className="home__product-brand-item">
                Enough correct medicine
              </button>
            </div>
            <ul className="home__featured-list">
              {loading ? (
                <p>Connecting to the server... </p>
              ) : (
                products.map((product, index) => (
                  <li
                    className="product__sell-item product__sell-item--laptop"
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
                      className="home__flash-sale-item-img"
                    ></img>
                    <img
                      className="product-client__item-hot-icon"
                      src="https://server-shoptech.onrender.com/public/product-img/smartphone-img/icon-hot.gif"
                    ></img>
                    <label className="product__sell-item-label">
                      {product.product_name}
                    </label>
                    <label className="product__sell-item-price">
                      {Number(product.product_price).toLocaleString()} ₫
                    </label>
                    <span className="product__sell-item-percent">
                    {((Number(product.product_price) * 100)/ (100-Number(product.product_percent))).toLocaleString()}
                      đ
                    </span>
                    <label className="product__sell-item-sold">
                    Evaluate:
                      <span className="product__sell-item-star-icon">
                        {handleFormatStarProduct(product.product_star)}
                      </span>
                    </label>
                    <div className="home__flash-sale-item-tag">
                    Reduce{product.product_percent}%
                    </div>
                  </li>
                ))
              )}
            </ul>

            <div
              className="home__featured-banner-acc"
              onClick={(e) => {
                handleLoadingPage(1, `/product/accessories`);
              }}
            ></div>
            <div
              className="home__featured-type"
              onClick={(e) => {
                handleLoadingPage(1, `/product/accessories`);
              }}
            >
              ALL PRODUCTS
            </div>
            <div className="home__featured-brand-list">
              <button className="home__product-brand-item">
                Pharmacist gives free consultation
              </button>
              <button className="home__product-brand-item">
                Good cheap medicine
              </button>
              <button className="home__product-brand-item">
                100% genuine medicine
              </button>
              <button className="home__product-brand-item">
                Enough correct medicine
              </button>
            </div>
            <ul className="home__featured-list">
              {loading ? (
                <p>Connecting to the server... </p>
              ) : (
                products.map((product, index) => (
                  <li
                    className="product__sell-item product__sell-item--accessories"
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
                      className="home__flash-sale-item-img"
                    ></img>
                    <img
                      className="product-client__item-hot-icon"
                      src="https://server-shoptech.onrender.com/public/product-img/smartphone-img/icon-hot.gif"
                    ></img>
                    <label className="product__sell-item-label">
                      {product.product_name}
                    </label>
                    <label className="product__sell-item-price">
                      {Number(product.product_price).toLocaleString()} ₫
                    </label>
                    <span className="product__sell-item-percent">
                    {((Number(product.product_price) * 100)/ (100-Number(product.product_percent))).toLocaleString()}
                      đ
                    </span>
                    <label className="product__sell-item-sold">
                    Evaluate:
                      <span className="product__sell-item-star-icon">
                        {handleFormatStarProduct(product.product_star)}
                      </span>
                    </label>
                    <div className="home__flash-sale-item-tag">
                    Reduce{product.product_percent}%
                    </div>
                  </li>
                ))
              )}
            </ul>  
          </div>
        </div>
      </div>
      <Footer />
      <p className="app-copyright">
        ©️ Copyright belongs to Clinic Online - 2023 <br />
        Address: 391 Nam Ky Khoi Nghia, Vo Thi Sau ward. District 3, Ho Chi Minh
        City.
      </p>
    </>
  );
};

export default Home;
