import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Nav } from '../Common';
import { handleLoadingPage } from '../../Common';

const CartConfirm = () => {
  const [cartUser, setCartUser] = useState([]);
  const [totalPriceOld, setTotalPriceOld] = useState();
  const [countTotalPrice, setCountTotalPrice] = useState();

  const [orderID, setOrderID] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Clinic Online | Xác nhận đơn hàng';
    const fetchAPIs = () => {
      fetch(
        `https://localhost:7096/api/Cart/${
          JSON.parse(window.localStorage.getItem('auth')).id
        }`,
      )
        .then((res) => res.json())
        .then((data) => {
          setCartUser(data);
          setLoading(false);
        });
    };
    fetchAPIs();
    setOrderID(makeID(10));
  }, []);

  useEffect(() => {
    // show thông tin tổng tiền giỏ hàng
    let countPriceAll = 0;
    let countTotalPriceOld = 0;
    cartUser.map((cartItem, index) => {
      if (cartItem) {
        countTotalPriceOld +=
          ((Number(cartItem.product.product_price) )) * cartItem.product_quantity;
        countPriceAll += Number(cartItem.product.product_price) * cartItem.product_quantity;
      }
    });

    setTotalPriceOld(countTotalPriceOld);
    setCountTotalPrice(countPriceAll);
  }, [cartUser]);

  const makeID = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const handleNextStep = () => {
    window.localStorage.setItem('orderIDCache', orderID);
    handleLoadingPage(1);
    setTimeout(() => {
      window.location.href = '/cart/info/giftcode/confirm/payment';
    }, 2000);
  };

  console.log("cartUser::: ", cartUser);

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div className="grid wide">
        <div className="container" style={{ paddingBottom: '200px' }}>
          <div className="cart__container">
            <div className="cart__header">
              <button
                className="cart__btn-cancel"
                onClick={() => {
                  window.location.href = '/cart/info/giftcode';
                }}
              >
                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Trở
                lại trang trước
              </button>
              <h1 className="cart__title">ORDER CONFIRMATION</h1>

              <ul className="cart-confirm__list-info">
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">
                  Code orders:
                    <span className="cart-confirm__label-span">
                      (Save Code order)
                    </span>
                  </label>
                  <p className="cart-confirm__data" style={{ color: 'red' }}>
                    {orderID}
                  </p>
                </li>
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">Orderer:</label>
                  <p className="cart-confirm__data" style={{ color: 'green' }}>
                    {window.localStorage.getItem('fullnameCache')}
                  </p>
                </li>
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">Email:</label>
                  <p className="cart-confirm__data">
                    {window.localStorage.getItem('emailCache')}
                  </p>
                </li>
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">Phone number:</label>
                  <p className="cart-confirm__data">
                    {window.localStorage.getItem('phoneCache')}
                  </p>
                </li>
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">
                    Hình thức nhận hàng:
                  </label>
                  <p className="cart-confirm__data">
                    {window.localStorage.getItem('methodCache')}
                  </p>
                </li>
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">
                    Địa chỉ nhận hàng:
                  </label>
                  <p className="cart-confirm__data">
                    {window.localStorage.getItem('addressCache') ||
                      'Showroom 70 Tô Ký'}
                  </p>
                </li>
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">Ghi chú:</label>
                  <p
                    className="cart-confirm__data"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: '400',
                      fontStyle: 'italic',
                    }}
                  >
                    "{window.localStorage.getItem('noteCache')}"
                  </p>
                </li>
              </ul>

              <ul className="cart-confirm__list">
                <label className="detail-price__header">
                Product details
                </label>
                {loading ? (
                  <p>Connecting to the server... </p>
                ) : (
                  cartUser.map((product, i) => (
                    <li className="cart-confirm__item-product" key={i}>
                      <img
                        className="cart-confirm__item-product-img"
                        src={product.product.product_img}
                      ></img>
                      <div className="cart-confirm__item-product-info">
                        <label className="cart-confirm__item-product-info-label">
                          {product.product.productName}
                        </label>
                        <p className="cart-confirm__item-product-info-quantity">
                          x{product.product_quantity}
                        </p>
                        <p className="cart-confirm__item-product-info-price">
                          {product.product_quantity} x{' '}
                          {Number(product.product.product_price).toLocaleString()} đ ={' '}
                          {Number(
                            product.product_quantity * product.product.product_price,
                          ).toLocaleString()}{' '}
                          đ
                        </p>
                      </div>
                    </li>
                  ))
                )}
              </ul>

              <ul className="cart-confirm__list">
                <label className="detail-price__header">
                Order details
                </label>
                <li className="detail-price__item">
                  <label className="detail-price__item-label">
                  Total cart value:{' '}
                  </label>
                  <span className="detail-price__item-price">
                    {Number(totalPriceOld).toLocaleString()} đ
                  </span>
                </li>

                {/* {loading ? (
                  <p>Connecting to the server... </p>
                ) : (
                  cartUser.map((product, i) => (
                    <li className="detail-price__item" key={i}>
                      <label className="detail-price__item-label">
                        Khuyến mãi giảm cho sản phẩm #{i + 1}:{' '}
                      </label>
                      <span className="detail-price__item-price">
                        - {Number(product.product.product_percent)}% ={' '}
                        {/* {((Number(product.product.product_percent) / 100) * Number(product.product_price)).toLocaleString()}{' '} */}
                        {/* {(Number(totalPriceOld)*(100-Number(product.product.product_percent))).toLocaleString()} đ */}
                      {/* </span>
                    </li>
                  ))
                )}  */}

                <li className="detail-price__item">
                  <label className="detail-price__item-label">
                    Áp dụng mã giảm giá{' '}
                    <span style={{ color: 'red', fontWeight: '600' }}>
                      {window.localStorage.getItem('giftcodeApply')}
                    </span>
                    :
                  </label>
                  <span className="detail-price__item-price">
                    - {Number(window.localStorage.getItem('percentApply'))}% ={' '}
                    {Number(
                      (Number(window.localStorage.getItem('percentApply')) /
                        100) *
                        Number(countTotalPrice),
                    ).toLocaleString()}{' '}
                    đ
                  </span>
                </li>

                <li className="detail-price__item">
                  <label className="detail-price__item-label">
                    Phí vận chuyển:
                  </label>
                  <span className="detail-price__item-price">29,000 đ</span>
                </li>
                <li className="detail-price__item">
                  <label className="detail-price__item-label">
                    Giảm giá phí vận chuyển:
                  </label>
                  <span className="detail-price__item-price">
                    - 100% =  29,000 đ
                  </span>
                </li>

                <li className="detail-price__item detail-price__item-total">
                  <label className="detail-price__item-label">Thành tiền</label>
                  <span
                    className="detail-price__item-price"
                    style={{ color: 'red' }}
                  >
                    {Number(
                      window.localStorage.getItem('countTotalPriceCache'),
                    ).toLocaleString()}{' '}
                    đ
                  </span>
                </li>
                <p className="detail-price__item-describe">
                  Vui lòng hoàn tất thanh toán đơn hàng với giá trị
                  <span style={{ color: 'red', margin: '0 4px' }}>
                    {Number(
                      Number(
                        window.localStorage.getItem('countTotalPriceCache'),
                      ).toFixed(0),
                    ).toLocaleString()}{' '}
                    đ
                  </span>
                  trước khi nhận hàng
                </p>
              </ul>
            </div>
            <div className="cart-info__group">
              <div className="cart-info__input-radio-container">
                <input
                  name="info-default"
                  type="checkbox"
                  className="cart-info__input-radio"
                ></input>
                <label
                  className="cart-info__input-radio-describe"
                  style={{ color: 'red', fontWeight: 'bold' }}
                >
                  Please confirm the information you entered is correct
                </label>
              </div>
            </div>
          </div>
        </div>

        <ul
          className="block-process block-process--lower"
          style={{ marginTop: '20px' }}
        >
          <li className="block-process__item block-process__item--active">
            <i className="block-process__item-icon block-process__item-icon--active fa fa-shopping-cart "></i>
            <label className="block-process__item-label">Select product</label>
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

          <li className="block-process__item block-process__item--active">
            <i className="block-process__item-icon fa fa-check block-process__item-icon--active"></i>
            <label className="block-process__item-label">
            Order confirmation
            </label>
          </li>
          <i className="block-process__item-arrow block-process__item-arrow--active">
            -
          </i>

          <li className="block-process__item">
            <i className="block-process__item-icon fa fa-credit-card"></i>
            <label className="block-process__item-label">Payment </label>
          </li>
        </ul>

        <div className="cart__control-container">
          <div className="cart__control-box">
            <button
              className="cart__control-btn cart__control-btn--payment"
              onClick={(e) => {
                handleNextStep();
              }}
            >
              Confirm & Proceed to payment
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

export default CartConfirm;
