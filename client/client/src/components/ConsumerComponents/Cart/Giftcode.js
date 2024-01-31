import React, { useState, useEffect } from 'react';
import { Toast, handleLoadingPage } from '../../Common';
import { Breadcrumbs, Nav } from '../Common';

const Giftcode = () => {
  const [cartUser, setCartUser] = useState([]);
  const [countTotalPrice, setCountTotalPrice] = useState();
  const [countTotalPriceEdit, setCountTotalPriceEdit] = useState();
  const [giftcodes, setGiftcodes] = useState([]);
  const [giftcodeID, setGiftcodeID] = useState('');
  const [percentReduce, setPercentReduce] = useState();

  useEffect(() => {
    document.title = 'Clinic Online | Promotional code';
    const fetchAPIs = () => {
      fetch(
        `https://localhost:7096/api/Cart/${
          JSON.parse(window.localStorage.getItem('auth')).id
        }`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCartUser(data);
        });

      fetch('https://localhost:7096/api/GiftCode')
        .then((res) => res.json())
        .then((data) => {
          setGiftcodes(data);
        });
    };
    fetchAPIs();
  }, []);
  console.log("giftcodes:: ", giftcodes);

  useEffect(() => {
    // set thông tin % giảm cho khuyến mãi
    giftcodes.map((gf, i) => {
      if (giftcodeID === gf.giftName) {
        setPercentReduce(gf.percentReduce);
      }
    });
// console.log("cartUser:: ", cartUser);
    // show thông tin tổng tiền giỏ hàng
    let countPriceAll = 0;
    cartUser.map((cartItem, index) => {
      // if (cartItem) countPriceAll += Number(cartItem.price) * cartItem.quantity;
      if (cartItem) countPriceAll += Number(cartItem.product.product_price) * cartItem.product_quantity;
    });
    setCountTotalPrice(countPriceAll);
  });

  const showSuccessMessage = () => {
    Toast({
      title: 'Applied successfully',
      message: 'The prices of the products have been updated!',
      type: 'success',
      duration: 5000,
    });
  };

  const showErrorMessage = () => {
    Toast({
      title: 'You have not entered a promotion code',
      message: 'Please enter the promotional code you have!',
      type: 'error',
      duration: 5000,
    });
  };

  const showErrorGiftcodeIncorrect = () => {
    Toast({
      title: 'The promotional code does not exist or is incorrect',
      message: 'Please check the promotional code you have!',
      type: 'error',
      duration: 5000,
    });
  };

  const handleCheckGiftcode = (e) => {
    e.preventDefault();
    var boolCheckGiftcode = false;
    if (giftcodeID == '') showErrorMessage();
    else {
      giftcodes.map((gf, i) => {
        if (giftcodeID === gf.giftName) {
          boolCheckGiftcode = true;
          var priceAppliedGiftcode =
            countTotalPrice * Number((100 - Number(gf.percentReduce)) / 100);
          setCountTotalPriceEdit(priceAppliedGiftcode);
          checkGiftcode();
          document.querySelector(
            '.cart__control-total-price',
          ).innerHTML = `<span>${Number(
            priceAppliedGiftcode,
          ).toLocaleString()} đ</span>`;
          showSuccessMessage();
          return;
        }
      });

      if (!boolCheckGiftcode) showErrorGiftcodeIncorrect();
    }
  };

  const checkGiftcode = () => {
    const main = document.querySelector('.detail-price__list');
    if (main) {
      handleLoadingPage(1);
      setTimeout(() => {
        main.style.animation = `fadeIn ease 1.5s`;
        main.innerHTML = `
                    <label class="detail-price__header">Order details</label>
                    <li class='detail-price__item'>
                        <label class="detail-price__item-label">Current total cart value: </label>
                        <span class="detail-price__item-price">${Number(
                          countTotalPrice,
                        ).toLocaleString()} đ</span>
                    </li>
    
                    <li class='detail-price__item'>
                        <label class="detail-price__item-label">Apply discount code:</label>
                        <span class="detail-price__item-price">-${percentReduce}% = -${(
                          (Number(countTotalPrice) * percentReduce) /
                          100
                        ).toLocaleString()} đ</span>
                    </li>
    
                    <li class='detail-price__item detail-price__item-total'>
                        <label class="detail-price__item-label">into money</label>
                        <span class="detail-price__item-price" style={{ color: 'red' }}>${(
                          (Number(countTotalPrice) * (100 - percentReduce)) /
                          100
                        ).toLocaleString()} đ</span>
                    </li>
                `;
      }, 1000);
    }
  };

  const handleNextStep = () => {
    if (countTotalPriceEdit) {
      window.localStorage.setItem('countTotalPriceCache', countTotalPriceEdit);
      window.localStorage.setItem('percentApply', percentReduce);
      window.localStorage.setItem('giftcodeApply', giftcodeID);
      handleLoadingPage(1);
      window.setTimeout(() => {
        window.location.href = '/cart/info/giftcode/confirm';
      }, 1000);
    } else {
      window.localStorage.setItem('countTotalPriceCache', countTotalPrice);
      window.localStorage.setItem('giftcodeApply', '');
      window.localStorage.setItem('percentApply', 0);
      handleLoadingPage(1);
      window.setTimeout(() => {
        window.location.href = '/cart/info/giftcode/confirm';
      }, 1000);
    }
  };
  console.log("giftcodeID:: ", giftcodeID);

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div id="toast-with-navbar"></div>
      <div className="grid wide">
        <div className="container" style={{ paddingBottom: '280px' }}>
          <div className="cart__container">
            <div className="cart__header">
              <button
                className="cart__btn-cancel"
                onClick={() => {
                  window.location.href = '/cart/info';
                }}
              >
                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Return
                 return to the order information page
              </button>
              <h1 className="cart__title">YOUR PROMO CODE</h1>
            </div>
            <div className="form cart-info__form" id="form-info-cart">
              <div className="spacer"></div>
              <div className="cart-info__group">
                <label className="cart-info__label">
                Enter your promotional code here (if applicable)
                </label>
                <div className="form-group">
                  <input
                    style={{ color: 'red', fontWeight: '500' }}
                    id="giftcode"
                    name="giftcode"
                    type="text"
                    placeholder="Promotional code (Option)"
                    onChange={(e) => setGiftcodeID(e.target.value)}
                    defaultValue={window.localStorage.getItem('giftcodeApply')}
                    className="form-control cart-info__input"
                  ></input>
                </div>
              </div>
              <button className="giftcode__btn" onClick={handleCheckGiftcode}>
              Confirm
              </button>
              <ul className="detail-price__list"></ul>
            </div>
          </div>
        </div>

        <ul className="block-process" style={{ marginTop: '25px' }}>
          <li className="block-process__item block-process__item--active">
            <i className="block-process__item-icon block-process__item-icon--active fa fa-shopping-cart "></i>
            <label className="block-process__item-label">Chọn sản phẩm</label>
          </li>
          <i className="block-process__item-arrow block-process__item-arrow--active">
            -
          </i>

          <li className="block-process__item block-process__item--active">
            <i className="block-process__item-icon fa fa-user block-process__item-icon--active"></i>
            <label className="block-process__item-label">
            Information line
            </label>
          </li>
          <i className="block-process__item-arrow block-process__item-arrow--active">
            -
          </i>

          <li className="block-process__item block-process__item--active">
            <i className="block-process__item-icon fa fa-tag block-process__item-icon--active"></i>
            <label className="block-process__item-label ">Promotional code</label>
          </li>
          <i className="block-process__item-arrow block-process__item-arrow--active">
            -
          </i>

          <li className="block-process__item">
            <i className="block-process__item-icon fa fa-check"></i>
            <label className="block-process__item-label">
            Order confirmation
            </label>
          </li>
          <i className="block-process__item-arrow">-</i>

          <li className="block-process__item">
            <i className="block-process__item-icon fa fa-credit-card"></i>
            <label className="block-process__item-label">Pay</label>
          </li>
        </ul>

        <div className="cart__control-container">
          <div className="cart__control-total">
            <label className="cart__control-total-label">
            Total cart amount:
            </label>
            <p className="cart__control-total-price">
              {Number(countTotalPrice).toLocaleString() || 0} đ
            </p>
          </div>
          <div className="cart__control-box">
            <button
              className="cart__control-btn cart__control-btn--payment"
              onClick={(e) => {
                handleNextStep();
              }}
            >
              Next step
            </button>
            <button
              className="cart__control-btn cart__control-btn--more"
              style={{ width: '100%' }}
              onClick={(e) => {
                window.location.href = '/cart/';
              }}
            >
              Return to the shopping cart information page
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Giftcode;
