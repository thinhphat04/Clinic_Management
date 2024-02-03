import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumbs, Nav } from '../Common';
import SidebarAccount, { handleLoadOptionSidebar } from './SidebarAccount';
import { handleLoadingPage } from '../../Common';
import { AuthContext } from '../../../context';

const AccountClient = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [countOrderDriving, setCountOrderDriving] = useState();
  const [countOrder, setCountOrder] = useState();
  const [countPriceOrder, setCountPriceOrder] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Clinic Online | Tài khoản';
    // console.log("loginnn:: ", JSON.parse(window.localStorage.getItem('auth')).id);
    if (window.localStorage.getItem('auth')) {
      const fetchAPIs = () => {
        fetch(
          `https://localhost:7096/api/User/user/${
            JSON.parse(window.localStorage.getItem('auth')).id
          }`,
        )
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          });
      };
      fetchAPIs();
    } else {
      window.location.href = '/login';
    }
    handleLoadOptionSidebar(0);
  }, []);

  // useEffect(() => {
  //   document.title = "Clinic Online | Personal information";
  //   const fetchAPIs = () => {
  //     fetch(
  //       `https://localhost:7096/api/User/user/${
  //         JSON.parse(window.localStorage.getItem("auth")).id
  //       }`
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setUser(data);
  //       });
  //   };
  //   fetchAPIs();
  //   handleLoadOptionSidebar(1);
  // }, []);

  useEffect(() => {
    // Show thông tin số đơn hàng đang giao
    let sumCountOrderDriving = 0;
    orders.map((order, index) => {
      if (order.owner == auth.username) {
        if (order.status === 'Đang giao hàng') {
          sumCountOrderDriving++;
          setCountOrderDriving(sumCountOrderDriving);
        }
      }
    });

    // Show thông tin số đơn hàng đã mua và số tiền mua hàng tích lũy
    let sumCountOrder = 0;
    let sumCountPriceOrder = 0;
    orders.map((order, index) => {
      if (order.owner == auth.username) {
        sumCountOrder += 1;
        sumCountPriceOrder += Number(order.price);
        setCountOrder(sumCountOrder);
        setCountPriceOrder(sumCountPriceOrder);
      }
    });
  }, [orders]);
console.log('datauser:  ', user);
  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div className="container">
        <div className="grid wide">
          <div className="account-info__container">
            <SidebarAccount />
            <div className="account__box">
              <div className="account__box-info">
                <img
                  src={
                    user.avatarUrl ||
              ''
                  }
                  className="account__box-info-avatar"
                ></img>
                <label className="account__box-info-label">HELLO</label>
                <label className="account__box-info-fullname">
                  {user.user_fullName}
                </label>
                <div className="account__box-info-list">
                  <div className="account__box-info-item">
                    <label className="account__box-info-item-label">
                    Order is being delivered
                    </label>
                    <i className="account__box-info-item-icon fa fa-cart-arrow-down"></i>
                    <p className="account__box-info-item-data">
                      {countOrderDriving || '0'}
                    </p>
                  </div>

                  <div className="account__box-info-item">
                    <label className="account__box-info-item-label">
                    Order has been completed
                    </label>
                    <i className="account__box-info-item-icon fa fa-list-alt"></i>
                    <p className="account__box-info-item-data">
                      {countOrder || 0}
                    </p>
                  </div>

                  <div className="account__box-info-item">
                    <label className="account__box-info-item-label">
                    Total purchase value on the website
                    </label>
                    <i className="account__box-info-item-icon fa fa-credit-card"></i>
                    <p
                      style={{ color: 'red' }}
                      className="account__box-info-item-data"
                    >
                      {Number(countPriceOrder).toLocaleString()} đ
                    </p>
                  </div>
                </div>
              </div>

              <div className="account__box-option">
                <div className="account__box-option-item account__box-option-item--color-pink">
                  <div className="account__box-option-item-img account__box-option-item-img--cart">
                    1
                  </div>
                  <label className="account__box-option-item-title">
                  Shopping cart
                  </label>
                  <button
                    className="account__box-option-item-btn"
                    onClick={(e) => {
                      handleLoadingPage(1);
                      window.setTimeout(() => {
                        navigate('/cart');
                      }, 1000);
                    }}
                  >
                   See details
                  </button>
                </div>

                <div className="account__box-option-item account__box-option-item--color-yellow">
                  <div className="account__box-option-item-img account__box-option-item-img--order"></div>
                  <label className="account__box-option-item-title">
                  Your order
                  </label>
                  <button
                    className="account__box-option-item-btn"
                    onClick={(e) => {
                      handleLoadingPage(1);
                      window.setTimeout(() => {
                        navigate('/order');
                      }, 1000);
                    }}
                  >
                    See details
                  </button>
                </div>

                <div className="account__box-option-item account__box-option-item--color-green">
                  <div className="account__box-option-item-img account__box-option-item-img--history">
                    1
                  </div>
                  <label className="account__box-option-item-title">
                  Purchase history
                  </label>
                  <button
                    className="account__box-option-item-btn"
                    onClick={(e) => {
                      handleLoadingPage(1);
                      window.setTimeout(() => {
                        navigate('/account/history');
                      }, 1000);
                    }}
                  >
                    See details
                  </button>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountClient;
