import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Validator from '../../Common/Validator';
import { Toast, handleLoadingPage } from '../../Common';
import { Breadcrumbs, Nav } from '../Common';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterClient = () => {
  const [usernameRegister, setUsernameRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const [fullnameRegister, setFullnameRegister] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [phoneRegister, setPhoneRegister] = useState('');
  const [addressRegister, setAddressRegister] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('auth')) {
      window.location.href = '/account';
    }
    document.title = 'Clinic Online | Đăng ký';
    Validator({
      form: '#form-1',
      error: '.form-message',
      rules: [
        Validator.isRequired('#username'),
        Validator.isMinLength('#username', 5),

        Validator.isRequired('#password'),
        Validator.isPassword('#password'),
        Validator.isMinLength('#password', 8),
        Validator.isPassword('#password',  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/),

        Validator.isRequired('#password_confirmation'),
        Validator.isConfirmed('#password_confirmation', () => {
          return document.getElementById('password').value;
        }),

        Validator.isRequired('#fullname'),
        Validator.isMinLength('#fullname', 5),

        Validator.isRequired('#email'),
        Validator.isEmail('#email'),

        Validator.isRequired('#phone'),
        Validator.isMinLength('#phone', 10),
        Validator.isMaxLength('#phone', 10),

        Validator.isRequired('#address'),
        Validator.isMinLength('#address', 5),
      ],
    });
  }, []);

  const showSuccessToast = () => {
    Toast({
      title: 'Sign Up Success',
      message: 'Returning to the login page!',
      type: 'success',
      duration: 3000,
    });
  };

const [registrationErrors, setRegistrationErrors] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://localhost:7096/api/Account/register`,
        {
          username: String(usernameRegister),
          password: passwordRegister,
          confirmPassword: passwordRegister,
          email: emailRegister,
          phoneNumber: phoneRegister,
          address: addressRegister,
          fullname: fullnameRegister,
        }
      );

      console.log("RESSS: ", res);
      if (res && res.status === 200) {
        if (
          res.data.message ===
          "This account has been registered by someone else!"
        ) {
          window.alert(res.data.message);
        } else {
          window.alert("Sign Up Success! Returning to the login page");
          // showSuccessToast();
          handleLoadingPage(1);

          window.setTimeout(() => {
            window.location.href = "/login";
          }, 2000);
        }
      } else {
        window.alert("An error occurred while registering! Please try again 1");
      }
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response && error.response.data && error.response.data.errors) {
        // Set specific errors for display
        setRegistrationErrors(error.response.data.errors);
      } else {
        // General error handling
        window.alert("An error occurred while registering! Please try again 2");
      }
    }
  };

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div className="container">
        <div className="grid wide">
          <div className="login-client__box">
            <div className="login-client__col-2">
              <div className="login-client__container">
                <form className="form" id="form-1" onSubmit={handleSubmit}>
                  <label className="login-client__label-login">
                    REGISTER A NEW ACCOUNT
                  </label>
                  {/* Display registration errors if any */}
                  {registrationErrors && (
                    <div>
                      <p>Registration failed due to the following errors:</p>
                      <ul>
                        {Object.keys(registrationErrors).map((field, index) => (
                          <li key={index}>
                            {field}: {registrationErrors[field].join(", ")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="spacer"></div>

                  <div className="form-group">
                    <label htmlFor="username" className="form-label">
                      User name
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Ex: customer01 ..."
                      onChange={(e) => setUsernameRegister(e.target.value)}
                      value={usernameRegister}
                      className="form-control"
                    ></input>
                    <span className="form-message"></span>
                  </div>

                  <div
                    className="form-group form-group-2-col"
                    style={{ paddingRight: "4px" }}
                  >
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => setPasswordRegister(e.target.value)}
                      value={passwordRegister}
                      className="form-control"
                    ></input>
                    <span className="form-message"></span>
                  </div>

                  <div
                    className="form-group form-group-2-col"
                    style={{ paddingLeft: "4px" }}
                  >
                    <label
                      htmlFor="password_confirmation"
                      className="form-label"
                    >
                      Confirm password
                    </label>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      placeholder="Confirm password"
                      type="password"
                      className="form-control"
                    ></input>
                    <span className="form-message"></span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fullname" className="form-label">
                      Full name
                    </label>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      placeholder="Ex: Thinh Phat ..."
                      onChange={(e) => setFullnameRegister(e.target.value)}
                      value={fullnameRegister}
                      className="form-control"
                    ></input>
                    <span className="form-message"></span>
                  </div>

                  <div
                    className="form-group form-group-2-col"
                    style={{ paddingRight: "4px" }}
                  >
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      placeholder="Ex: email@domain.com"
                      onChange={(e) => setEmailRegister(e.target.value)}
                      value={emailRegister}
                      className="form-control"
                    ></input>
                    <span className="form-message"></span>
                  </div>

                  <div
                    className="form-group form-group-2-col"
                    style={{ paddingLeft: "4px" }}
                  >
                    <label htmlFor="phone" className="form-label">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="number"
                      maxLength="10"
                      placeholder="Ex: 0983281932 ..."
                      onChange={(e) => setPhoneRegister(e.target.value)}
                      value={phoneRegister}
                      className="form-control"
                    ></input>
                    <span className="form-message"></span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="address" className="form-label">
                      Address:
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Ex: Ham Nghi, TPHCM"
                      onChange={(e) => setAddressRegister(e.target.value)}
                      value={addressRegister}
                      className="form-control"
                    ></input>
                    <span className="form-message"></span>
                  </div>

                  <button className="login-client__btn">REGISTER NOW</button>
                </form>
                <div className="login-client__direct">
                  <div>
                    <label className="login-client__question">
                      Already a member of Clinic Online?
                    </label>
                    <a
                      className="login-client__register"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                      }}
                    >
                      Return to the Login page
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="login-client__col-1">
              <div className="login-client__panel">
                <div className="login-client__panel-img"></div>
                <label className="login-client__panel-title">
                  Become a member
                </label>
                <p className="login-client__panel-desb">
                  Enjoy great experiences and incentives when you become a
                  member member of the Clinic Online family!!!
                </p>
              </div>
              <div className="login-client__panel-controll">
                <button className="login-client__panel-btn"></button>
                <button className="login-client__panel-btn"></button>
                <button className="login-client__panel-btn"></button>
                <button className="login-client__panel-btn"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterClient;
