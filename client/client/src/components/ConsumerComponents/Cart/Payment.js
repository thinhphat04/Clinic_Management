import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Toast, handleLoadingPage } from '../../Common';
import { Breadcrumbs, Nav } from '../Common';
import axios from 'axios';

const Payment = ({ socket }) => {
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState('');
  const [cartUser, setCartUser] = useState([]);

  // const [orderK, setOrderK] = useState(null);

  // const [orders, setOrders] = useState([]);
  const [timeOrder, setTimeOrder] = useState('');

  useEffect(() => {
    document.title = 'Clinic Online | PAYMENT ORDERS';
    const fetchAPIs = () => {
      fetch(
        `https://localhost:7096/api/Cart/${
          JSON.parse(window.localStorage.getItem('auth')).id
        }`,
      )
        .then((res) => res.json())
        .then((data) => {
          setUser(JSON.parse(window.localStorage.getItem('auth')));
          setCartUser(data);
        });

      // fetch('https://localhost:7096/api/orders')
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setOrders(data);
      //   });
    };
    fetchAPIs();
  }, []);

  const showSuccessMessage = () => {
    Toast({
      title: 'ORDER SUCCESS',
      message:
        'Your order has been confirmed, please check email and your order in your account!',
      type: 'success',
      duration: 3000,
    });
  };
  const showErrorMessage = () => {
    Toast({
      title: 'ORDER FAILED',
      message:
        'Your order has been confirmed. Please create another order!',
      type: 'error',
      duration: 5000,
    });
  };

  const handleSelectMethod = (e) => {
    const methodItems = document.querySelectorAll('.payment__item');
    methodItems.forEach((methodItem, index) => {
      methodItem.onclick = () => {
        const methodItemActive = document.querySelector(
          '.payment__item.payment__item--active',
        );
        if (methodItemActive) {
          methodItemActive.classList.remove('payment__item--active');
          methodItem.classList.add('payment__item--active');
        } else {
          methodItem.classList.add('payment__item--active');
        }
      };
    });
  };

  const completePayment = () => {
    emailjs
      .sendForm(
        'service_tz648gc',
        'template_3r8dk79',
        document.querySelector('.form-confirm'),
        'zD-R_dG5L23lbkbpU',
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );

    localStorage.removeItem('orderIDCache');
    localStorage.removeItem('fullnameCache');
    localStorage.removeItem('emailCache');
    localStorage.removeItem('phoneCache');
    localStorage.removeItem('methodCache');
    localStorage.removeItem('addressCache');
    localStorage.removeItem('noteCache');
    localStorage.removeItem('countTotalPriceCache');
    localStorage.removeItem('giftcodeApply');
    localStorage.removeItem('percentApply');
    localStorage.removeItem('cartGuest');

    const paymentBox = document.querySelector('.cart__container');
    var countSeconds = 15;
    const x = setInterval(() => {
      var secondLeft = document.querySelector('.payment-done__redirect-second');
      countSeconds -= 1;
      secondLeft.innerHTML = `${countSeconds} giây`;
      if (countSeconds <= 0) {
        window.location.href = '/home';
        clearInterval(x);
      }
    }, 1000);

    paymentBox.innerHTML = `
            <div class='payment-done__box'>
                <div class="payment-done__icon checkmark-circle">
                    <div class="background"></div>
                    <div class="checkmark draw"></div>
                </div>
                <label class='payment-done__label'>Order payment successful</label>
                <p class='payment-done__describe'>Please wait a moment for the system to confirm your order</p>
                <p class='payment-done__thanks'>Thank you for purchasing and using Clinic Online's services</p>
                <p class="payment-done__redirect"> Automatically redirect to the following homepage <span class='payment-done__redirect-second'>${countSeconds} giây</span> ... </p>
            </div>
        `;
    document.querySelector('.cart__control-container').style.display = 'none';
    document.querySelector('.block-process').style.display = 'none';
  };

  var cartUserUpdate = cartUser.map(item => {
    return {
      product_id: item.product_id,
      product_quantity: item.product_quantity
    };
  });

  const handleClickRemoveAll = () => {
    axios.put(
      'https://localhost:7096/api/users/remove-all-in-cart/' +
        JSON.parse(window.localStorage.getItem('auth')).user._id,
    );
  };

  const handleComplePayment = async (e) => {
    // var today = new Date();
    // var date =
    //   today.getFullYear() +
    //   '-' +
    //   (today.getMonth() + 1) +
    //   '-' +
    //   today.getDate();
    // var time =
    //   today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    // var dateTime = date + ' ' + time;
    // setTimeOrder(dateTime);
    try {
      const res = await axios.post(
        `https://localhost:7096/api/Order`,
        {
           order_code:window.localStorage.getItem('orderIDCache'),
           user_id: JSON.parse(window.localStorage.getItem('auth')).id,
           order_datetime:"2024-02-02T13:32:27.0775771",
           order_status: "Pending",
           order_address: window.localStorage.getItem('addressCache'),
           order_phone:window.localStorage.getItem('phoneCache'),
           order_note: window.localStorage.getItem('noteCache'),
           order_total: 
           Number((window.localStorage.getItem('countTotalPriceCache')).toString()),
           OrderDetails: cartUserUpdate   
         }
      );
      // console.log('ress: ', res.data.user.user_email);

      if(res && res.data && res.status === 200){
        showSuccessMessage();

        

        const resKK = await axios.get(
          `https://localhost:7096/api/Order/search/${window.localStorage.getItem('phoneCache')}/${window.localStorage.getItem('orderIDCache')}`,
        );
        if(resKK.status === 200){
        //  await setOrderK(resKK.data);
         

          const orderK = resKK.data;
          console.log('resKK: ', orderK);

          const resKHAI = await axios.post(
            `https://localhost:7096/api/Mail/SendMailOrder`,
            
              {
                toEmail: orderK.user.email,
                subject: "Congratulations on your successful order",
                phoneNumber: orderK.order_phone,
                orderCode: orderK.order_code,
                totalPrice: Number(orderK.order_total)
              } 
             
          );
           console.log('resKHAI:: ', resKHAI);
        };
       

        

        window.setTimeout(() => {
          window.location.href = '/order';
        }, 4000);
      } else{
        showErrorMessage()
      }    
    
    // console.log("Khaires::: ", res);
      

      // if (res && res.data.success) {
      //   try {
      //     const res = await axios.post(
      //       `${process.env.REACT_APP_API}/api/orders/create`,
      //       {
      //         orderID: window.localStorage.getItem('orderIDCache'),
      //         owner: JSON.parse(window.localStorage.getItem('auth')).user.username,
      //         fullname: window.localStorage.getItem('fullnameCache'),
      //         email: window.localStorage.getItem('emailCache'),
      //         phone: window.localStorage.getItem('phoneCache'),
      //         method: window.localStorage.getItem('methodCache'),
      //         address: window.localStorage.getItem('addressCache'),
      //         note: window.localStorage.getItem('noteCache'),
      //         price: window.localStorage.getItem('countTotalPriceCache'),
      //         giftcodeApply: window.localStorage.getItem('percentApply'),
      //         time: dateTime,
      //         status: 'Đang giao hàng',
      //         lists: cartUser,
      //       },
      //     );
      //     if (res && res.data.success) {
      //       handleClickRemoveAll();
      //       handleLoadingPage(2);
      //       setTimeout(() => {
      //         completePayment();
      //       }, 2000);
      //       showSuccessMessage();
      //     } else {
      //       window.alert('Đã gặp lỗi khi tạo! Vui lòng thử lại');
      //     }
      //   } catch (error) {
      //     console.log(error);
      //     window.alert(error);
      //   }
      // } else {
      //   window.alert('Đã gặp lỗi khi tạo! Vui lòng thử lại');
      // }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

 

  console.log("cartUserKHAI::: ", cartUserUpdate);

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div id="toast-with-navbar"></div>
      <div className="grid wide">
        <div className="container" style={{ paddingBottom: '200px' }}>
          <div className="cart__container">
            <div className="cart__header">
              <button
                className="cart__btn-cancel"
                onClick={() => {
                  window.location.href = '/cart/info/giftcode/confirm';
                }}
              >
                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Trở
                lại trang trước
              </button>
              <h1 className="cart__title">PAYMENT ORDERS</h1>

              <ul className="cart-confirm__list-info">
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">
                  Your order code:
                    <span className="cart-confirm__label-span">
                    (Please save your order code)
                    </span>
                  </label>
                  <p className="cart-confirm__data" style={{ color: 'green' }}>
                    {window.localStorage.getItem('orderIDCache')}
                  </p>
                </li>
                <li className="cart-confirm__item">
                  <label className="cart-confirm__label">
                  Total payment amount:
                  </label>
                  <p className="cart-confirm__data" style={{ color: 'red' }}>
                    {Number(
                      window.localStorage.getItem('countTotalPriceCache'),
                    ).toLocaleString()}{' '}
                    đ
                  </p>
                </li>
              </ul>

              <ul className="cart-confirm__list">
                <label className="detail-price__header">
                Payments
                </label>
                <ul className="payment__list">
                  <li
                    className="payment__item payment__item--active"
                    onClick={handleSelectMethod}
                  >
                    <label className="payment__item-label">
                    Payment on delivery
                    </label>
                    <img
                      className="payment__item-img"
                      src="https://cellphones.com.vn/cart/_nuxt/img/COD.7245762.png"
                      alt=""
                    ></img>
                  </li>

                  <li className="payment__item" onClick={handleSelectMethod}>
                    <label className="payment__item-label">
                    Payment via ZaloPay
                    </label>
                    <img
                      className="payment__item-img"
                      src="https://cellphones.com.vn/cart/_nuxt/img/zalopay.08ce522.png"
                      alt=""
                    ></img>
                  </li>

                  <li className="payment__item" onClick={handleSelectMethod}>
                    <label className="payment__item-label">
                    Payment via VNPay
                    </label>
                    <img
                      className="payment__item-img"
                      src="https://cellphones.com.vn/cart/_nuxt/img/vnpay.c0bd59b.png"
                      alt=""
                    ></img>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>

        <ul
          className="block-process block-process-payment--lower"
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

          <li className="block-process__item block-process__item--active">
            <i className="block-process__item-icon fa fa-credit-card block-process__item-icon--active"></i>
            <label className="block-process__item-label">Pay</label>
          </li>
        </ul>

        {/* Gửi thông tin đơn hàng qua email */}
        {/* <form className="form-confirm" style={{ display: 'none' }}>
          <input
            name="order_id"
            readOnly
            value={window.localStorage.getItem('orderIDCache')}
          />
          <input
            name="order_fullname"
            readOnly
            value={window.localStorage.getItem('fullnameCache')}
          />
          <input
            name="email_to"
            readOnly
            value={window.localStorage.getItem('emailCache')}
          />
          <input
            name="order_address"
            readOnly
            value={window.localStorage.getItem('addressCache')}
          />
          <input
            name="order_note"
            readOnly
            value={window.localStorage.getItem('noteCache')}
          />
          <input
            name="order_price"
            readOnly
            value={Number(
              window.localStorage.getItem('countTotalPriceCache'),
            ).toLocaleString()}
          />
          <input name="order_time" readOnly value={timeOrder} />
        </form> */}

        <div className="cart__control-container">
          <div className="cart__control-box" style={{ paddingTop: '10px' }}>
            <button
              className="cart__control-btn cart__control-btn--payment"
              onClick={handleComplePayment}
            >
             Complete your order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
