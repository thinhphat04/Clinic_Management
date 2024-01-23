import React, { useState, useEffect, useContext } from 'react';
import './styles/cart-style.css';
import { Nav, Breadcrumbs, NavMobile } from '../Common';
import { handleLoadingPage } from '../../Common';
import { AuthContext } from '../../../context';
import axios from 'axios';

const Cart = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [cartUser, setCartUser] = useState([]);
  const [countTotalPrice, setCountTotalPrice] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Clinic Online | Giỏ hàng';
    const fetchAPIs = () => {
      if (window.localStorage.auth)
        fetch(
          `https://localhost:7096/api/users/${
            JSON.parse(window.localStorage.getItem('auth')).user._id
          }`,
        )
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
            setLoading(false);
            setCartUser(data.cart);
          });
      else {
        document.querySelector('.cart__label--empty').innerText =
          'Please log in to add products to cart';
      }
    };
    fetchAPIs();
  }, []);

  useEffect(() => {
    // show thông tin tổng tiền giỏ hàng
    let countPriceAll = 0;
    cartUser.map((cartItem, index) => {
      if (cartItem) countPriceAll += Number(cartItem.price) * cartItem.quantity;
    });
    setCountTotalPrice(countPriceAll);

    // show điều kiện giỏ hàng
    for (let i = 0; i < 5; i++) {
      if (cartUser.length == 0) {
        document.querySelector('.cart__container--empty').style.display =
          'flex';
        document.querySelector('.cart__control-container').style.display =
          'none';
        document.querySelector('.cart__container').style.display = 'none';
      } else {
        document.querySelector('.cart__container').style.display = 'flex';
        document.querySelector('.cart__control-container').style.display =
          'flex';
        document.querySelector('.cart__container--empty').style.display =
          'none';
      }
    }
  }, [user]);

  const handleClickAddQuantity = (productName) => {
    axios
      .put(
        'https://localhost:7096/api/users/increase-quantity-product-in-cart/' +
          JSON.parse(window.localStorage.getItem('auth')).user._id,
        { productName },
      )
      .then((response) => {
        handleLoadingPage(1);
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickMinusQuantity = (productName) => {
    cartUser.map((p, i) => {
      if (p.productName === productName && Number(p.quantity) > 1) {
        axios
          .put(
            'https://localhost:7096/api/users/decrease-quantity-product-in-cart/' +
              JSON.parse(window.localStorage.getItem('auth')).user._id,
            { productName },
          )
          .then((response) => {
            handleLoadingPage(1);
            window.setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch((error) => {
            console.error(error);
          });
      }

      if (i >= cartUser.length) return;
    });
    window.alert('Không thể giảm số lượng sản phẩm = 0');
  };

  const handleClickRemoveProduct = (productName) => {
    axios
      .put(
        'https://localhost:7096/api/users/remove-product-in-cart/' +
          JSON.parse(window.localStorage.getItem('auth')).user._id,
        { productName },
      )
      .then((response) => {
        handleLoadingPage(1);
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClickRemoveAll = () => {
    if (
      window.confirm('Bạn có chắc muốn xóa toàn bộ sản phẩm trong giỏ hàng')
    ) {
      axios
        .put(
          'https://localhost:7096/api/users/remove-all-in-cart/' +
            JSON.parse(window.localStorage.getItem('auth')).user._id,
        )
        .then(() => {
          handleLoadingPage(1);
          window.setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Nav />
      <NavMobile />
      <Breadcrumbs />
      <div className="grid wide">
        <div className="container" style={{ paddingBottom: '200px' }}>
          <div className="cart__container--empty">
            <div className="cart__icon"></div>
            <label className="cart__label--empty">
              Bạn chưa thêm sản phẩm nào vào trong giỏ hàng!
            </label>
            <button
              className="cart__btn--empty"
              onClick={() => {
                handleLoadingPage(1);
                window.setTimeout(() => {
                  window.location.href = '/home';
                }, 1000);
              }}
            >
              Return to shopping page
            </button>
          </div>

          <div className="cart__container">
            <div className="cart__header">
              <button
                className="cart__btn-cancel"
                onClick={() => {
                  window.location.href = '/home';
                }}
              >
                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Come back
              </button>
              <h1 className="cart__title">YOUR CART</h1>
            </div>

            <ul className="cart__list">
              {loading ? (
                <p>Connecting to the server... </p>
              ) : (
                cartUser.map((p, index) => (
                  <li className="cart__item" key={index}>
                    <img
                      className="cart__item-img"
                      src={
                        p.imageLink ||
                        'https://localhost:7096/public/products/img-product-empty.png'
                      }
                    ></img>
                    <div className="cart__item-info">
                      <label className="cart__item-info-name">
                        {p.productName} - {p.option} - {p.color}
                      </label>
                      <p className="cart__item-info-price">
                        {Number(p.price).toLocaleString()} đ
                      </p>
                      <p className="cart__item-info-old-price">
                        {(
                          (Number(p.price) * (100 + p.percent)) /
                          100
                        ).toLocaleString()}
                        đ
                      </p>
                      <span className="cart__item-info-percent">
                        -{p.percent}%
                      </span>
                      <span className="cart__item-info-installment">
                        <i className="cart__item-info-installment-icon fa fa-tag"></i>
                        Trả góp 0%
                      </span>
                      <div className="cart__item-quantity">
                        <button
                          className="cart__item-quantity-edit"
                          onClick={(e) => {
                            handleClickMinusQuantity(p.productName);
                          }}
                        >
                          -
                        </button>
                        <input
                          className="cart__item-quantity-input"
                          defaultValue={p.quantity}
                          readOnly
                        />
                        <button
                          className="cart__item-quantity-edit"
                          onClick={(e) => {
                            handleClickAddQuantity(p.productName);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className="cart__item-remove"
                      onClick={(e) => {
                        handleClickRemoveProduct(p.productName);
                      }}
                    >
                      <i className="cart__item-remove-icon fa fa-trash"></i>
                      Xóa
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

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
                handleLoadingPage(1);
                window.setTimeout(() => {
                  window.location.href = '/cart/info';
                }, 2000);
              }}
            >
              Proceed to order
            </button>
            <button
              className="cart__control-btn cart__control-btn--more"
              onClick={(e) => {
                window.location.href = '/home';
              }}
            >
              Select more products
            </button>
            <button
              className="cart__control-btn cart__control-btn--remove-all"
              onClick={handleClickRemoveAll}
            >
              <i className="cart__control-icon fa fa-trash"></i>
              Delete all orders
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
