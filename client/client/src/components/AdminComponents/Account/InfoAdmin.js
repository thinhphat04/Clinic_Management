import React, { useState, useEffect } from 'react';
import './styles/info-style.css';
import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import axios from 'axios';
import { changeFilename, handleLoadingPage } from '../../Common';

const InfoAdmin = () => {
  const [admin, setAdmin] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    document.title = 'ShopTECH | Quản trị viên';
    const fetchAPI = () => {
      fetch(
        `https://localhost:7096/api/User/user/${
          JSON.parse(window.localStorage.getItem('authAdmin')).id
        }`,
      )
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data);
        });
    };
    fetchAPI();
    handleLoadOptionSelected(6);
  }, []);

  const changeImageAdmin = () => {
    const preview = document.querySelector('.info-page__avatar-img');
    const imageAdmin = document.querySelector('#avatar-change-input').files[0];

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        preview.src = reader.result;
      },
      false,
    );

    if (imageAdmin) {
      reader.readAsDataURL(imageAdmin);
      setImageFile(imageAdmin);
    }
  };

  const handleConfirmChange = async (e) => {
    e.preventDefault();
    const inputElements = document.querySelectorAll('.info-page__input');
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append(
          'avatar-admin',
          imageFile,
          changeFilename(imageFile.name, admin._id),
        );
        axios
          .post(
            'https://localhost:7096/api/admins/upload-image',
            formData,
          )
          .then((response) => {
            axios
              .put(
                `${process.env.REACT_APP_API}/api/admins/update-info/${
                  JSON.parse(window.localStorage.getItem('authAdmin')).admin._id
                } `,
                {
                  avatarUrl: response.data.path,
                  fullname: inputElements[1].value,
                  email: inputElements[2].value,
                  phone: inputElements[3].value,
                  address: inputElements[4].value,
                },
              )
              .then((res) => {
                if (res && res.data.success) {
                  alert('Cập nhật thông tin thành công!');
                  handleLoadingPage(1);
                  window.location.reload();
                } else {
                  alert('Cập nhật thông tin thất bại');
                }
              });
          })
          .catch((error) => {
            alert('Lỗi khi upload ảnh: ' + error);
            console.log(error);
          });
      } else {
        axios
          .put(
            `${process.env.REACT_APP_API}/api/admins/update-info/${
              JSON.parse(window.localStorage.getItem('authAdmin')).id
            } `,
            {
              avatarUrl: admin.avatarUrl,
              fullname: inputElements[1].value,
              email: inputElements[2].value,
              phone: inputElements[3].value,
              address: inputElements[4].value,
            },
          )
          .then((res) => {
            if (res && res.data.success) {
              alert('Cập nhật thông tin thành công!');
              handleLoadingPage(1);
              window.location.reload();
            } else {
              alert('Cập nhật thông tin thất bại');
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">
          Good day, admin!
          </label>
          <label className="admin__tilte-describe">
          Admin information page
          </label>
        </div>

        <div className="info-page__group">
          <div className="info-page__header">
          EDIT ADMIN INFORMATION
          </div>

          <div className="info-page__body">
            <div className="info-page__col-1">
              <div className="info-page__avatar">
                +
                <img
                  className="info-page__avatar-img"
                  src={admin.avatarUrl}
                ></img>
              </div>
              <input
                type="file"
                name="avatar-admin"
                className="info-page__avatar-input"
                id="avatar-change-input"
                onChange={(e) => {
                  changeImageAdmin();
                }}
                hidden
              ></input>
              <label
                className="info-page__avatar-btn"
                htmlFor="avatar-change-input"
              >
                Change Avatar
              </label>
              <label className="info-page__user-id">{admin.user_fullName}</label>
            </div>

            <div className="info-page__col-2">
              <label className="info-page__title">Personal information</label>

              <div className="info-page__box-info">
                <label className="info-page__label">Administrator code</label>
                <input
                  style={{ fontWeight: 'bold' }}
                  readOnly
                  className="info-page__input info-page__input--readonly"
                  value={String(admin.id).toUpperCase()}
                />

                <label className="info-page__label">Full name</label>
                <input
                  className="info-page__input"
                  defaultValue={admin.user_fullName}
                />

                <label className="info-page__label">Email</label>
                <input
                  className="info-page__input"
                  defaultValue={admin.email}
                />

                <label className="info-page__label">Phone number</label>
                <input
                  className="info-page__input"
                  minLength="10"
                  maxLength="10"
                  defaultValue={admin.phoneNumber}
                />

                <label className="info-page__label">Address</label>
                <input
                  className="info-page__input"
                  defaultValue={admin.user_address}
                />
              </div>
            </div>
          </div>

          <div className="info-page__footer">
            <button className="info-page__btn" onClick={handleConfirmChange}>
            Confirm<i className="ti-check"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoAdmin;
