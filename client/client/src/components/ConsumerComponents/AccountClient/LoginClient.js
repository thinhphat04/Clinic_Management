import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Nav, Breadcrumbs } from '../Common';
import { Toast, handleLoadingPage } from '../../Common';
import AuthContext from '../../../context/AuthContext';
import './styles/account-client.css';

const LoginClient = () => {
  const [details, setDetails] = useState({ username: '', password: '' });
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('auth') && auth.username) {
      window.location.href = '/account';
    }
  }, [auth]);

  useEffect(() => {
    document.title = 'Clinic Online | Login';
  }, []);

  const showErrorToast = () => {
    Toast({
      title: 'Login failed',
      message: 'Account name or password is incorrect!',
      type: 'error',
      duration: 3000,
    });
  };

  const showSuccessToast = () => {
    Toast({
      title: 'Logged in successfully',
      message: 'Congratulations, you have successfully logged in!',
      type: 'success',
      duration: 1000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://localhost:7096/api/Account/login`,
        {
          userName: details.username,
          password: details.password,
        },
      );
      console.log("ress:  ", res.data);
      if (res && res.data) {
        localStorage.setItem('auth', JSON.stringify(res.data));
        setAuth({
          ...auth,
          // userName: res.data.user.username,
          token: res.data.token,
        });
        showSuccessToast();
        //handleLoadingPage(1);
        window.setTimeout(() => {          
          navigate('/account');
          window.location.reload();
        }, 2000);
      } else {
        showErrorToast();
      }
    } catch (error) {
      console.log(error);
      showErrorToast();
    }
  };

  return (
    <React.Fragment>
      <div id="toast-with-navbar"></div>
      <Nav />
      <Breadcrumbs />
      <div className="container">
        <div className="grid wide">
          <div className="login-client__box">
            <div className="login-client__col-1">
              <div className="login-client__panel">
                <div className="login-client__panel-img"></div>
                <label className="login-client__panel-title">
                  Become a member
                </label>
                <p className="login-client__panel-desb">
                Enjoy great experiences and incentives when you become a member
                member of the Clinic Online family!!!
                </p>
              </div>
              <div className="login-client__panel-controll">
                <button className="login-client__panel-btn"></button>
                <button className="login-client__panel-btn"></button>
                <button className="login-client__panel-btn"></button>
                <button className="login-client__panel-btn"></button>
              </div>
            </div>

            <div className="login-client__col-2">
              <div className="login-client__container">
                <form className="login-client__form" onSubmit={handleSubmit}>
                  <label className="login-client__label-login">
                  Log in to your Account
                  </label>
                  <label className="login-client__label" htmlFor="username">
                  Please enter your account name
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="login-client__input"
                    onChange={(e) => {
                      setDetails({ ...details, username: e.target.value });
                    }}
                    value={details.username}
                    required
                    minLength={5}
                    placeholder="Username ..."
                  />

                  <label className="login-client__label" htmlFor="password">
                  Please enter a password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="login-client__input"
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                    value={details.password}
                    required
                    minLength={6}
                    placeholder="Password ..."
                  />
                  <a href="" className="login-client__forgot">
                  You forgot your password?
                  </a>
                  <button className="login-client__btn">LOGIN</button>
                </form>
                <p className="login-client__label-or">
                  __________Or__________
                </p>

                <div className="login-client__direct">
                  <button className="login-client__direct-btn">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                      alt=""
                      width="32"
                      className="login-client__direct-img"
                    />
                    <label className="login-client__direct-label">
                      Facebook
                    </label>
                  </button>

                  <button className="login-client__direct-btn">
                    <img
                      src="https://static.wixstatic.com/media/1d4581_ffeec63d86cc43d3b4bca95fa3ce5ec3~mv2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/imgpsh_fullsize_anim.jpg"
                      alt=""
                      width="30"
                      className="login-client__direct-img"
                    />
                    <label className="login-client__direct-label">Google</label>
                  </button>

                  <button className="login-client__direct-btn">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                      alt=""
                      width="32"
                      className="login-client__direct-img"
                    />
                    <label className="login-client__direct-label">
                      Instagram
                    </label>
                  </button>
                  <div>
                    <label className="login-client__question">
                    If you have not had an account before?
                    </label>
                    <a
                      className="login-client__register"
                      href="/login"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLoadingPage(1);
                        window.setTimeout(() => {
                          navigate('/register');
                        }, 1000);
                      }}
                    >
                      Register now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginClient;
