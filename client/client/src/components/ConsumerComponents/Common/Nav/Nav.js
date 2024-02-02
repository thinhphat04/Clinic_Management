import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../../context";
import {  handleLoadingPage } from "../../../Common";
// import { ToastContainer, toast } from 'react-toastify';
import "./nav.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Nav = () => {
  const [countQuantity, setCountQuantity] = useState();
  const [keySearch, setKeySearch] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const [user, setUser] = useState({});


  useEffect(() => {
    const fetchAPI = () => {
      if (localStorage.auth)
        fetch(
          "https://localhost:7096/api/Cart/" +
            JSON.parse(window.localStorage.getItem("auth")).id
        )
          .then((res) => res.json())
          .then((data) => {
            setCountQuantity(data.length);
          });
    };
    fetchAPI();
  }, []);

  const handleLoggout = (e) => {
    e.preventDefault();
    setUser({
      ...user,
      username: null,
      token: "",
    });
    // console.log('Logout button clicked');
    window.alert("Đăng xuất tài khoản thành công");
  //  toast.success('Đăng xuất tài khoản thành công', {
  //   position: 'top-right',
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  // });
  window.localStorage.removeItem("auth");

    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };


  // console.log('auth:: ', auth);
  return (
    <React.Fragment>
      <div className="nav-container">
        <div className="grid wide">
          <nav className="navbar">
            <div
              className="header--logo"
              onClick={(e) => {
                e.preventDefault();
                handleLoadingPage(1);
                window.location.href = "/home";
              }}
            ></div>

            <a
              href="Tel: 00000"
              className="header-btn header-btn__link hide-on-mobile"
            >
              <i className="header--btn-icon fa-solid fa-phone"></i>
              <p className="header--btn-name">
                Support
                <span className="header--btn-describe">1800.4433</span>
              </p>
            </a>
            <div className="header-search">
              <input
                className="header-search__input"
                placeholder="Search product..."
                onChange={(e) => {
                  setKeySearch(e.target.value);
                }}
              ></input>
              <button
                className="header-search__button"
                onClick={(e) => {
                  if (keySearch === "") {
                    alert("Please enter the keyword you want to search for!");
                    return;
                  }
                  handleLoadingPage(1);
                  window.location.href = `/search/${keySearch}`;
                }}
              >
                <i className="fa ti-search"></i>
              </button>
            </div>

            <div className="header__btn-group">
              <button
                className="header-btn header-btn__cart"
                onClick={() => {
                  handleLoadingPage(1);
                  window.location.href = "/cart";
                }}
              >
                <div className="header-btn__red-dot">{countQuantity || 0}</div>
                <i className="header--btn-icon fa-solid fa-shopping-cart"></i>
                <p className="header--btn-name hide-on-mobile">Cart</p>
              </button>

              <button
                className="header-btn hide-on-mobile"
                onClick={(e) => {
                  handleLoadingPage(1);
                  window.location.href = "/account";
                }}
              >
                <i className="header--btn-icon fa-solid fa-user"></i>
                <p className="header--btn-name">Account</p>
              </button>

              <button
                className="header-btn hide-on-mobile"
                onClick={() => {
                  handleLoadingPage(1);
                  window.location.href = "/order";
                }}
              >
                <i className="header--btn-icon fa-solid fa-history"></i>
                <p className="header--btn-name">Order</p>
              </button>
              <button
                className="header-btn hide-on-mobile"
                onClick={() => {
                  handleLoadingPage(1);
                  window.location.href = "/contact";
                }}
              >
                <i className="header--btn-icon fa-solid fa-question"></i>
                <p className="header--btn-name">Contact</p>
              </button>

              {auth.email == null ? (
                <button
                  className="header-btn hide-on-mobile"
                  onClick={(e) => {
                    handleLoadingPage(1);
                    window.location.href = "/login";
                  }}
                >
                  <i className="header--btn-icon fa-solid fa-user"></i>
                  <p className="header--btn-name">Login</p>
                </button>
              ) : (
                <button
                  className="header-btn hide-on-mobile"
                  onClick={handleLoggout}
                >
                  <i className="header--btn-icon fa-solid fa-user"></i>
                  <p className="header--btn-name">Logout</p>
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Nav;
