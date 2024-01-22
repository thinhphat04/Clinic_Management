import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './styles/contact.css';
import { Nav, Footer, Breadcrumbs } from '../Common/';
import { Toast, handleLoadingPage } from '../../Common';
import axios from 'axios';

const ContactPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const form = useRef();

  useEffect(() => {
    document.title = 'Clinic Online | Liên hệ';
  }, []);

  const showSuccessMessage = () => {
    Toast({
      title: 'Gửi góp ý thành công',
      message: 'Cám ơn bạn với góp ý dành cho Clinic Online!',
      type: 'success',
      duration: 5000,
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        'Bạn chắc chắn muốn gửi những thông tin bạn nhập vào cho đội ngũ quản trị viên!',
      ) === true
    ) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/feedbacks/send`,
          {
            name: name,
            email: email,
            type: type,
            content: content,
          },
        );
        if (res && res.data.success) {
          emailjs
            .sendForm(
              'service_tz648gc',
              'template_2tugvgr',
              form.current,
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
          showSuccessMessage();
          setTimeout(() => {
            handleLoadingPage(1);
            window.location.reload();
          }, 5000);
        } else {
          alert('Gửi phản ánh thất bại');
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div id="toast-with-navbar"></div>
      <div className="container">
        <div className="grid wide">
          <ul className="contact__info-list">
            <li className="contact__info-item">
              <i className="contact__info-item-icon fa fa-map-marker"></i>
              <label className="contact__info-item-title">Headquarters</label>
              <p className="contact__info-item-content">
              391A Nam KY Khoi Nghia, Vo Thi Sau Ward, District 3, Ho Chi Minh City
              </p>
            </li>

            <li className="contact__info-item">
              <i className="contact__info-item-icon fa fa-phone"></i>
              <label className="contact__info-item-title">Hotline</label>
              <p className="contact__info-item-content">(+84) 38 551 1320</p>
            </li>

            <li className="contact__info-item">
              <i className="contact__info-item-icon fa fa-envelope"></i>
              <label className="contact__info-item-title">Email</label>
              <p className="contact__info-item-content">contact@ClinicOnline.uth</p>
            </li>

            <li className="contact__info-item">
              <i className="contact__info-item-icon fa fa-headphones"></i>
              <label className="contact__info-item-title">Operator</label>
              <p className="contact__info-item-content">24/7 support</p>
            </li>

            <li className="contact__info-item">
              <i className="contact__info-item-icon fa fa-fax"></i>
              <label className="contact__info-item-title">Fax</label>
              <p className="contact__info-item-content">212-222-2932</p>
            </li>
          </ul>

          <div className="contact__box">
            <label className="contact__box-title">CONTACT ONLINE CLINIC</label>
            <form
              ref={form}
              className="contact__box-form"
              onSubmit={handleSend}
            >
              <input
                style={{
                  color: 'green',
                  fontWeight: 'bold',
                }}
                required
                name="name"
                className="contact__box-form-input"
                type="text"
                placeholder="Fill in your full name..."
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                required
                className="contact__box-form-input"
                type="email"
                name="email"
                placeholder="Name email ..."
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <select
                required
                className="contact__box-form-select"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                name="type"
                value={type}
              >
                <option className="contact__box-form-option" value="...">
                Select an issue to comment on
                </option>
                <option
                  className="contact__box-form-option"
                  value="Vấn đề tài khoản"
                >
                  Account problem
                </option>
                <option
                  className="contact__box-form-option"
                  value="Vấn đề khuyến mãi"
                >
                  Promotion problem
                </option>
                <option
                  className="contact__box-form-option"
                  value="Cải thiện hệ thống"
                >
                  System improvements
                </option>
                <option
                  className="contact__box-form-option"
                  value="Vấn đề khác"
                >
                  Other problems
                </option>
              </select>

              <label className="contact__box-form-label">Content</label>

              <textarea
                required
                className="contact__box-form-textbox"
                type="text"
                name="content"
                onChange={(e) => setContent(e.target.value)}
                value={content}
              />
              <button className="contact__box-form-btn">Send comments</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
      <p className="app-copyright">
      ©️ Copyright belongs to Clinic Online - 2023 <br />
        Address: 391A Nam KY Khoi Nghia, Vo Thi Sau Ward, District 3, Ho Chi Minh City
      </p>
    </>
  );
};

export default ContactPage;
