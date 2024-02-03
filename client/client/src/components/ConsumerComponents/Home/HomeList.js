import React from 'react';

const HomeList = () => {
  const handLoadingPage = (second, link) => {
    const loading = document.querySelector('.modal__cover');
    loading.classList.add('modal--active');
    window.setTimeout(() => {
      loading.classList.remove('modal--active');
    }, second * 1000);
    setTimeout(() => {
      window.location.href = link;
    }, second * 1000);
  };

  return (
    <div id="home__list" className="hide-on-mobile">
      <div className="home__list-label">Product Portfolio</div>
      <ul className="home__list-product">
        <li
          className="home__list-product-item"
          onClick={(e) => {
            handLoadingPage(1.5, '/product/medical');
          }}
        >
          <div className="home__list-product-img-1"></div>
          <p className="home__list-product-name">Medical</p>
        </li>
        <li
          className="home__list-product-item"
          onClick={(e) => {
            handLoadingPage(1.5, '/product/scientific');
          }}
        >
          <div className="home__list-product-img-2"></div>
          <p className="home__list-product-name">Scientific</p>
        </li>
        <li
          className="home__list-product-item"
          onClick={(e) => {
            handLoadingPage(1.5, '/product/tablet');
          }}
        >
          <div className="home__list-product-img-3"></div>
          <p className="home__list-product-name">Education</p>
        </li>
        {/* <li
          className="home__list-product-item"
          onClick={(e) => {
            handLoadingPage(1.5, '/product/accessories');
          }}
        >
          <div className="home__list-product-img-4"></div>
          <p className="home__list-product-name">All PRODUCTS</p>
        </li> */}
      </ul>
    </div>
  );
};

export default HomeList;
