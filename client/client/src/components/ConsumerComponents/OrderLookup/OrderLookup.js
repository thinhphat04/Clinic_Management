import React, { useState, useEffect } from 'react';
import './order-lookup.css';
import { Breadcrumbs, Footer, Nav } from '../Common';
import { Toast, handleLoadingPage } from '../../Common';
import axios from 'axios';

const OrderLookup = () => {
  const [order, setOrder] = useState(null);
  const [phone, setPhone] = useState('');
  const [orderID, setOrderID] = useState('');
  const [lists, setLists] = useState([]);
  const [totalPriceOld, setTotalPriceOld] = useState();
  const [countTotalPrice, setCountTotalPrice] = useState();

  useEffect(() => {
    document.title = 'Clinic Online | LOOK UP ORDERS';

    // show thông tin tổng tiền giỏ hàng
    let countTotalPriceOld = 0;
    let countPriceAll = 0;
    lists.map((item, index) => {
      if (item) {
        countTotalPriceOld +=
          ((Number(item.product.product_price) * (100 + item.product.product_percent)) / 100) * item.product_quantity;
        countPriceAll += Number(item.product.product_price) * item.product_quantity;
      }
    });
    setTotalPriceOld(countTotalPriceOld);
    setCountTotalPrice(countPriceAll);
  }, [order]);

  const showErrorToast = () => {
    Toast({
      title: 'Tìm kiếm thất bại',
      message: 'Không tìm thấy đơn hàng mà bạn muốn!',
      type: 'error',
      duration: 3000,
    });
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    handleLoadingPage(10);
    try {
      const res = await axios.get(
        `https://localhost:7096/api/Order/search/${phone}/${orderID}`,
      );
      document.querySelector('.modal__cover').classList.remove('modal--active');
      console.log("resBTK:: ", res);
      setOrder(res.data);
      setLists(res.data.orderDetails);
      document.querySelector('.order-lookup__box').style.display = 'none';
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div id="toast-with-navbar"></div>
      <div className="container">
        <div className="grid wide">
          <div className="order-lookup__box">
            <label className="order-lookup__box-header">LOOK UP ORDERS</label>
            <label className="order-lookup__box-label">Phone number</label>
            <input
              style={{ fontWeight: 'bold', color: 'green' }}
              className="order-lookup__box-input"
              type="phone"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            ></input>
            <label className="order-lookup__box-label">Code orders</label>

            <input
              style={{ textTransform: 'uppercase' }}
              className="order-lookup__box-input"
              type="text"
              required
              value={orderID}
              onChange={(e) => {
                setOrderID(e.target.value);
              }}
            ></input>
            <button className="order-lookup__box-btn" onClick={handleLookup}>
              SEARCH
            </button>
          </div>

          <div className="order-result__box">
            {order && (
              <div className="cart__container">
                <div className="cart__header">
                  <h1 className="cart__title" style={{ padding: '30px 0' }}>
                  INFORMATION LINE
                  </h1>

                  <ul className="cart-confirm__list-info">
                    <li className="cart-confirm__item">
                      <label className="cart-confirm__label">
                      Your order code:
                      </label>
                      <p
                        className="cart-confirm__data"
                        style={{ color: 'red' }}
                      >
                        {orderID}
                      </p>
                    </li>
                    <li className="cart-confirm__item">
                      <label className="cart-confirm__label">
                      Orderer:
                      </label>
                      <p
                        className="cart-confirm__data"
                        style={{ color: 'green' }}
                      >
                        {order.user.user_fullName}
                      </p>
                    </li>
                    <li className="cart-confirm__item">
                      <label className="cart-confirm__label">Email:</label>
                      <p
                        className="cart-confirm__data"
                        style={{ fontWeight: 400 }}
                      >
                        {order.user.email}
                      </p>
                    </li>
                    <li className="cart-confirm__item">
                      <label className="cart-confirm__label">
                      Phone number:
                      </label>
                      <p
                        className="cart-confirm__data"
                        style={{ fontWeight: 600 }}
                      >
                        {order.order_phone}
                      </p>
                    </li>
                    {/* <li className="cart-confirm__item">
                      <label className="cart-confirm__label">
                      Delivery method:
                      </label>
                      <p
                        className="cart-confirm__data"
                        style={{ fontWeight: 400 }}
                      >
                        {order.method}
                      </p>
                    </li> */}
                    <li className="cart-confirm__item">
                      <label className="cart-confirm__label">
                      Delivery address:
                      </label>
                      <p
                        className="cart-confirm__data"
                        style={{ fontWeight: 400 }}
                      >
                        {order.order_address}
                      </p>
                    </li>
                    <li className="cart-confirm__item">
                      <label className="cart-confirm__label">Note:</label>
                      <p
                        className="cart-confirm__data"
                        style={{
                          fontWeight: 400,
                          fontSize: '1.6rem',
                          fontStyle: 'italic',
                        }}
                      >
                        "{order.order_note}"
                      </p>
                    </li>
                    <li className="cart-confirm__item">
                      <label className="cart-confirm__label">
                      Order status:
                      </label>
                      <p
                        className="cart-confirm__data"
                        style={{ fontWeight: 600, color: 'blue' }}
                      >
                        {order.order_status}
                      </p>
                    </li>
                  </ul>

                  <ul className="cart-confirm__list">
                    <label className="detail-price__header">
                    Product details
                    </label>
                    {lists &&
                      lists.map((item, i) => (
                        <li className="cart-confirm__item-product" key={i}>
                          <img
                            className="cart-confirm__item-product-img"
                            src={item.product.product_img}
                          ></img>
                          <div className="cart-confirm__item-product-info">
                            <label className="cart-confirm__item-product-info-label">
                              {item.product.product_name}
                            </label>
                            <p className="cart-confirm__item-product-info-quantity">
                              x{item.product_quantity}
                            </p>
                            <p className="cart-confirm__item-product-info-price">
                              {item.product_quantity} x{' '}
                              {Number(item.product.product_price).toLocaleString()} đ ={' '}
                              {Number(
                                item.product_quantity * item.product.product_price,
                              ).toLocaleString()}{' '}
                              đ
                            </p>
                          </div>
                        </li>
                      ))}
                  </ul>

                  <ul className="cart-confirm__list">
                    <label className="detail-price__header">
                    Order details
                    </label>
                    <li className="detail-price__item">
                      <label className="detail-price__item-label">
                      Total order value:{' '}
                      </label>
                      <span className="detail-price__item-price">
                        {Number(totalPriceOld).toLocaleString()} đ
                      </span>
                    </li>

                    {lists &&
                      lists.map((item, i) => (
                        <li className="detail-price__item" key="${i}">
                          <label className="detail-price__item-label">
                          Discount promotions for products #{i + 1}:{' '}
                          </label>
                          <span className="detail-price__item-price">
                            - {Number(item.percent)}% ={' '}
                            {Number(
                              (item.percent / 100) * item.price,
                            ).toLocaleString()}{' '}
                            đ
                          </span>
                        </li>
                      ))}

                    <li className="detail-price__item">
                      <label className="detail-price__item-label">
                      Apply discount code:
                      </label>
                      <span className="detail-price__item-price">
                        - {Number(order.giftcodeApply)}% ={' '}
                        {Number(
                          (Number(order.giftcodeApply) / 100) *
                            Number(countTotalPrice),
                        ).toLocaleString()}{' '}
                        đ
                      </span>
                    </li>

                    <li className="detail-price__item">
                      <label className="detail-price__item-label">
                      Transport fee:
                      </label>
                      <span className="detail-price__item-price">29,000 đ</span>
                    </li>
                    <li className="detail-price__item">
                      <label className="detail-price__item-label">
                      Shipping fee discount:
                      </label>
                      <span className="detail-price__item-price">
                        - 100% = - 29,000 đ
                      </span>
                    </li>

                    <li className="detail-price__item detail-price__item-total">
                      <label className="detail-price__item-label">
                      into money
                      </label>
                      <span className="detail-price__item-price">
                        {Number(
                          countTotalPrice *
                            Number((100 - Number(order.giftcodeApply)) / 100),
                        ).toLocaleString()}{' '}
                        đ
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
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

export default OrderLookup;
