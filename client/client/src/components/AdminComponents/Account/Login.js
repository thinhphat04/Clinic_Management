import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { handleLoadingPage } from '../../Common';
import ToastMessage, { Toast } from '../../Common/ToastMessage';
import AuthAdminContext from '../../../context/AuthAdminContext';
import './styles/login-style.css';

const Login = () => {
  const [authAdmin, setAuthAdmin] = useContext(AuthAdminContext);
  const [details, setDetails] = useState({ adminName: '', password: '' });

  useEffect(() => {
    document.title = 'ShopTECH | Đăng nhập quản trị viên';
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('authAdmin') && authAdmin) {
      window.location.href = '/admin/dashboard';
    }
  }, [authAdmin]);

  function showErrorToast() {
    Toast({
      title: 'Đăng nhập thất bại',
      message: 'Tên tài khoản hoặc mật khẩu không chính xác!',
      type: 'error',
      duration: 3000,
    });
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/admins/login`,
        {
          adminName: details.adminName,
          password: details.password,
        },
      );
      if (res && res.data.success) {
        localStorage.setItem('authAdmin', JSON.stringify(res.data));
        setAuthAdmin({
          admin: res.data.admin,
          token: res.data.token,
        });

        alert('Đăng nhập thành công');
        handleLoadingPage(1);
        window.setTimeout(() => {
          window.location.href = `/admin/dashboard`;
        }, 1000);
      } else {
        showErrorToast();
      }
    } catch (error) {
      console.log(error);
      showErrorToast();
    }
  };

  return (
    <div className="login--admin-container">
      <ToastMessage />
      <div className="login__logo"></div>
      <div className="login__box">
        <label className="login__label-login">Log in to your Account</label>
        <form className="login__form" onSubmit={handleSubmitLogin}>
          <label className="login__label" htmlFor="adminName">
          Please enter your account name
          </label>
          <input
            className="login__input"
            name="username"
            onChange={(e) =>
              setDetails({ ...details, adminName: e.target.value })
            }
            value={details.adminName}
            required
            minLength={5}
            placeholder="Admin ..."
          />

          <label
            className="login__label login__label--password"
            htmlFor="password"
          >
            Please enter a password
          </label>
          <input
            className="login__input"
            type="password"
            name="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
            required
            minLength={6}
            placeholder="Password ..."
          />
          <button className="login__btn">ĐĂNG NHẬP</button>
        </form>
      </div>
      <p
        className="app-copyright"
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
       ©️ Copyright belongs to Clinic Online - 2023 <br />
      Address: 391 Nam Ky Khoi Nghia, Vo Thi Sau ward. District 3, Ho Chi Minh City.
      </p>
    </div>
  );
};

export default Login;
