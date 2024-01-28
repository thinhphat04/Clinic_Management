import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './search-style.css';

import { Breadcrumbs, Footer, Nav } from '../Common';
import { handleLoadingPage } from '../../Common';

const ResultSearch = () => {
  const { keySearch } = useParams();
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPIs = () => {
      fetch('https://localhost:7096/api/Products/search/' + keySearch)
        .then((res) => res.json())
        .then((data) => {
          console.log("SearchDataa:: ", data);
          setProducts(data);
          setLoading(false);
        });
    };
    fetchAPIs();
    handleFormatCrumbs();
    handleSearch();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [products]);

  const handleFormatCrumbs = () => {
    const crumbLinks = document.querySelectorAll('.crumb-link');
    crumbLinks.forEach((crumbLink) => {
      if (crumbLink.innerHTML.includes('=')) {
        crumbLink.style.display = 'none';
      }
    });
  };

  const handleSearch = () => {
    const listProducts = document.querySelector('.search-list__container');
    const listArray = [];

    console.log("productHandle:: ",products );
    products.map((product, index) => {
      if (
        String(product.product_name).toLowerCase().includes(keySearch.toLowerCase())
      ) {
        listArray.push(product);
        listProducts.innerHTML = `
                ${
                  loading ? (
                    <p>Đang kết nối đến server ... </p>
                  ) : (
                    listArray.map(
                      (p, i) =>
                        `
                    <li
                    class="product__sell-item"
                    key=${index}
                    style='display:block;
                    margin: 0 5px 12px;'
                    >

                    <img src=${p.product_img} class='home__flash-sale-item-img' />
                    <label class='product__sell-item-label'>${p.product_name}</label>
                    <label class='product__sell-item-price'>${Number(
                      p.product_price,
                    ).toLocaleString()} ₫</label>
                    <span class='product__sell-item-percent'>${(
                      Number(p.product_price) * 1.065
                    ).toLocaleString()}đ</span>
                    <label class='product__sell-item-sold'>
                        Đánh giá: 
                        <span class='product__sell-item-star-icon'>${handleFormatStarProduct(
                          p.product_star,
                        )}</span>
                    </label>
                </li>
                    `,
                    )
                  )
                }
                `;
      }
    });
    setCountProducts(listArray.length);
    const options = document.querySelectorAll('.product__sell-item--tablet');
    options.forEach((option, index) => {
      option.onclick = () => {
        window.location.href = `/product/${listArray[index].id}/${listArray[index].name}`;
      };
    });
  };

  const handleClickSearchByType = (productType) => {
    const listProducts = document.querySelector('.search-list__container');
    const listArray = [];
    products.map((product, index) => {
      if (
        String(product.product_name).toLowerCase().includes(keySearch.toLowerCase()) &&
        product.product_type === productType
      ) {
        listArray.push(product);
        listProducts.innerHTML = `
                ${
                  loading ? (
                    <p>Đang kết nối đến server ... </p>
                  ) : (
                    listArray.map(
                      (p, i) =>
                        `
                    <li
                    class="product__sell-item"
                    key=${index}
                    style='display:block;
                    margin: 10px 5px 12px;'>

                    <img src=${p.product_img} class='home__flash-sale-item-img' />
                    <label class='product__sell-item-label'>${p.product_name}</label>
                    <label class='product__sell-item-price'>${Number(
                      p.product_price,
                    ).toLocaleString()} ₫</label>
                    <span class='product__sell-item-percent'>${(
                      Number(p.product_price) * 1.065
                    ).toLocaleString()}đ</span>
                    <label class='product__sell-item-sold'>
                        Đánh giá: 
                        <span class='product__sell-item-star-icon'>${handleFormatStarProduct(
                          p.product_star,
                        )}</span>
                    </label>
                </li>
                    `,
                    )
                  )
                }
                `;
      }
    });
    document.querySelector(
      '.search-header__count-number',
    ).innerHTML = `${listArray.length}`;
    if (listArray.length === 0) {
      listProducts.innerHTML = `
            <div class="search-list--empty"></div>`;
    }
    const btnList = document.querySelector('.search-control');
    const btnItems = btnList.querySelectorAll('.search-control__btn');
    btnItems.forEach((btnItem, index) => {
      btnItem.onclick = () => {
        const btnItemActive = btnList.querySelector(
          '.search-control__btn.search-control__btn--active',
        );
        if (btnItemActive) {
          btnItemActive.classList.remove('search-control__btn--active');
          btnItem.classList.add('search-control__btn--active');
        } else {
          btnItem.classList.add('search-control__btn--active');
        }
      };
    });
    const options = document.querySelectorAll('.product__sell-item--tablet');
    options.forEach((option, index) => {
      option.onclick = () => {
        window.location.href = `/product/${listArray[index].id}/${listArray[index].name}`;
      };
    });
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

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div className="container">
        <div className="grid wide">
          <div className="search-container">
            <div className="search-header">
              <label className="search-header__label">
                Kết quả tìm kiếm cho từ khóa:
                <span className="search-header__label-key">"{keySearch}"</span> 
              </label>
              <p className="search-header__count">
                Đã tìm thấy{' '}
                <span
                  style={{ fontWeight: 'bold', fontStyle: 'normal' }}
                  className="search-header__count-number"
                >
                  {countProducts || 0}
                </span>{' '}
                kết quả phù hợp
              </p>
            </div>

            <div className="search-control">
              <button
                className="search-control__btn search-control__btn--active"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }}
              >
                All
              </button>
              <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleClickSearchByType('Medical');
                  }, 1000);
                }}
              >
                Medical
              </button>
              <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleClickSearchByType('Scientific');
                  }, 1000);
                }}
              >
                Scientific
              </button>
              <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleClickSearchByType('Education');
                  }, 1000);
                }}
              >
                Education
              </button>
              {/* <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleClickSearchByType('accessories');
                  }, 1000);
                }}
              >
                Phụ kiện
              </button> */}
            </div>

            <ul className="search-list__container">
              <div className="search-list--empty"></div>
            </ul>
            <button className="search-control__show-more">
              Xem thêm sản phẩm
            </button>
          </div>
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

export default ResultSearch;
