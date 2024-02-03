import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Breadcrumbs, Nav } from '../Common';
import SidebarAccount, { handleLoadOptionSidebar } from './SidebarAccount';
import { handleLoadingPage } from '../../Common';

const AccountOrderDetail = () => {
  const { orderID } = useParams();
  const [order, setOrder] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Clinic Online | Order details';
    const fetchAPIs = () => {
      fetch('https://localhost:7096/api/orders/' + orderID)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data);
          setListProduct(data.lists);
          setLoading(false);
        });
    };
    fetchAPIs();
    handleFormatCrumbs();
    handleLoadOptionSidebar(3);
  }, []);

  useEffect(() => {
    if (order.status === 'Successful delivery') {
      document.querySelector('.order-detail__btn').style.display = 'none';
    }
  }, [order.status]);

  const handleConfirmReceived = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/orders/update-status/${order._id}`,
      );
      if (res && res.data.success) {
        alert('Confirm successful receipt of goods!');
        handleLoadingPage(1);
        setTimeout(() => {
          window.location.reload();
        });
      } else {
        alert('Update information failed');
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleFormatCrumbs = () => {
    const crumbLinks = document.querySelectorAll('.crumb-link');
    crumbLinks.forEach((crumbLink) => {
      if (crumbLink.innerHTML.includes('-id=')) {
        crumbLink.style.display = 'none';
      }
    });
  };
  const handleAscending =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://localhost:7096/api/Products/sort/true`,
      );
      // if (res && res.data.success) {
      //   alert('Confirm successful receipt of goods!');
      //   handleLoadingPage(1);
      //   setTimeout(() => {
      //     window.location.reload();
      //   });
      // } else {
      //   alert('Update information failed');
      // }
    } catch (error) {
      alert(error);
    }


  }
  const handleDecre =async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://localhost:7096/api/Products/sort/false`,
      );
      // if (res && res.data.success) {
      //   alert('Confirm successful receipt of goods!');
      //   handleLoadingPage(1);
      //   setTimeout(() => {
      //     window.location.reload();
      //   });
      // } else {
      //   alert('Update information failed');
      // }
    } catch (error) {
      alert(error);
    }


  }

  // https://localhost:7096/api/Products/sort/true

  const checkVote = (itemVoted, itemName) => {
    if (itemVoted)
      return (
        <button
          className="order-detail__item-btn order-detail__item-btn--disabled"
          disabled
        >
          Have evaluated{' '}
        </button>
      );
    return (
      <button
        className="order-detail__item-btn"
        onClick={(e) => {
          e.preventDefault();
          if (order.status === 'Successful delivery')
            navigate(`/account/history/${orderID}/${itemName}`);
          else {
            alert(
              'The order is in delivery status so the product cannot be evaluated yet!',
            );
          }
        }}
      >
        Evaluate
      </button>
    );
  };

  return (
    <React.Fragment>
      <Nav />
      <Breadcrumbs />
      <div className="container">
        <div className="grid wide">
          <div className="account-info__container">
            <SidebarAccount />
            <div className="account__box">
              <div className="account__box-info">
                <button
                  className="cart__btn-cancel"
                  onClick={() => {
                    window.location.href = '/account/history';
                  }}
                >
                  <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Return
                   again
                </button>
                <label className="account__box-info-header">
                INFORMATION LINE
                </label>

                <label className="order-detail__title">
                Information line
                </label>
                <div className="order-detail">
                  <div className="order-detail__group">
                    <label className="order-detail__label">Code orders:</label>
                    <p
                      style={{ color: 'red', fontWeight: 'bold' }}
                      className="order-detail__content"
                    >
                      {orderID}
                    </p>
                  </div>
                  <div className="order-detail__group">
                    <label className="order-detail__label">
                    Time Order:
                    </label>
                    <p className="order-detail__content">{order.time}</p>
                  </div>
                  <div className="order-detail__group">
                    <label className="order-detail__label">
                    Order status
                    </label>
                    <p
                      style={{ color: 'purple', fontWeight: '600' }}
                      className="order-detail__content"
                    >
                      {order.status}
                    </p>
                  </div>
                </div>

                <label className="order-detail__title">
                Delivery information
                </label>
                <div className="order-detail">
                  <div className="order-detail__group">
                    <label className="order-detail__label">
                      <i className="order-detail__label-icon fa fa-user"></i>
                      Recipient's full name:
                    </label>
                    <p className="order-detail__content">{order.fullname}</p>
                  </div>
                  <div className="order-detail__group">
                    <label className="order-detail__label">
                      <i className="order-detail__label-icon fa fa-phone"></i>
                      Phone number:
                    </label>
                    <p className="order-detail__content">{order.phone}</p>
                  </div>
                  <div className="order-detail__group">
                    <label className="order-detail__label">
                      <i className="order-detail__label-icon fa fa-envelope"></i>
                      Email address:
                    </label>
                    <p className="order-detail__content">{order.email}</p>
                  </div>
                  <div className="order-detail__group">
                    <label className="order-detail__label">
                      <i className="order-detail__label-icon fa fa-map"></i>
                      Delivery address:
                    </label>
                    <p className="order-detail__content">
                      {order.address ||
                        'Showroom 70 Tô Ký, p.Tân Chánh Hiệp, Q.12'}
                    </p>
                  </div>
                </div>

                <label className="order-detail__title">
                List of products
                </label>
                {/* <button onClick={handleAscending} >Ascending</button>
                <button onClick={handleDecre} >Decrease</button> */}
                {/* handleDecre */}
                <ul className="order-detail__list">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    order.lists.map((item, index) => (
                      <li className="order-detail__item" key={index}>
                        <img
                          src={item.imageLink}
                          className="order-detail__item-img"
                        />
                        <div className="order-detail__item-info">
                          <label className="order-detail__item-name">
                            {item.productName}
                          </label>
                          <label className="order-detail__item-content">
                            {item.option}
                          </label>
                          <label className="order-detail__item-content">
                            {item.color}
                          </label>
                          <label className="order-detail__item-quantity">
                            x{item.quantity}
                          </label>
                          <p className="order-detail__item-price">
                            {Number(item.price).toLocaleString()} đ
                          </p>
                        </div>
                        <div className="order_detail__item-btn-box">
                          {checkVote(item.voted, item.productName)}
                        </div>
                      </li>
                    ))
                  )}
                  <div className="order-detail__group">
                    <label className="order-detail__label">
                    Total order value
                    </label>
                    <p
                      style={{ color: 'green', fontWeight: '600' }}
                      className="order-detail__content"
                    >
                      {Number(order.price).toLocaleString()} đ
                    </p>
                  </div>
                </ul>

                <button
                  className="order-detail__btn"
                  onClick={handleConfirmReceived}
                >
                  Goods received
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AccountOrderDetail;
