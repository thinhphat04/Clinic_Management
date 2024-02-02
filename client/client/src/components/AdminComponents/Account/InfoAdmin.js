import React, { useState, useEffect } from "react";
import "./styles/info-style.css";
import AdminHeader from "../Common/AdminHeader";
import AdminSidebar, { handleLoadOptionSelected } from "../Common/AdminSidebar";
import axios from "axios";
import { changeFilename, handleLoadingPage } from "../../Common";

const InfoAdmin = () => {
  const [admin, setAdmin] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [product_img, setImg] = useState(null);

  useEffect(() => {
    document.title = "ShopTECH | Quản trị viên";
    const fetchAPI = () => {
      fetch(
        `https://localhost:7096/api/User/user/${
          JSON.parse(window.localStorage.getItem("authAdmin")).id
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data);
        });
    };
    fetchAPI();
    handleLoadOptionSelected(6);
  }, []);

  // const changeImageAdmin = () => {
  //   const preview = document.querySelector(".info-page__avatar-img");
  //   const imageAdmin = document.querySelector("#avatar-change-input").files[0];

  //   const reader = new FileReader();
  //   reader.addEventListener(
  //     "load",
  //     () => {
  //       preview.src = reader.result;
  //     },
  //     false
  //   );

  //   if (imageAdmin) {
  //     reader.readAsDataURL(imageAdmin);
  //     setImageFile(imageAdmin);
  //   }
  // };

  const handleConfirmChange = async (e) => {
    e.preventDefault();
    const inputElements = document.querySelectorAll(".info-page__input");
    // Tạo một đối tượng FormData mới để gửi dữ liệu dạng multipart/form-data
    const formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    formData.append("Id", JSON.parse(window.localStorage.getItem("authAdmin")).id);
    formData.append("Username", "admin");
    formData.append("Fullname", inputElements[1].value);
    formData.append("Address", inputElements[4].value);
    formData.append("PhoneNumber", inputElements[3].value);
    formData.append("Email", inputElements[2].value);
    formData.append("Image", product_img);
    formData.append("AvatarUrl", "");

    try {
      const res = await axios.put(`https://localhost:7096/api/User`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("resssProduct:: ", res);
      if (res && res.data !== null && res.status === 200) {
        alert("Update profile Admin successfully");
        handleLoadingPage(1);
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        window.alert("An error occurred while creating! Please try again");
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };


  const changeImageUser = () => {
    const preview = document.querySelector(".info-page__avatar-img");
    const imageUser = document.querySelector("#avatar-change-input").files[0];

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result;
      },
      false
    );

    if (imageUser) {
      reader.readAsDataURL(imageUser);
      setImageFile(imageUser);
    }
  };

  return (
    <>
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">Good day, admin!</label>
          <label className="admin__tilte-describe">
            Admin information page
          </label>
        </div>

        <div className="info-page__group">
          <div className="info-page__header">EDIT ADMIN INFORMATION</div>

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
                  // Đảm bảo rằng một file đã được chọn
                  if (e.target.files.length > 0) {
                    // Cập nhật state bằng file đầu tiên được chọn
                    changeImageUser(admin.id);
                    setImg(e.target.files[0]);
                  }
                }}
                hidden
              ></input>
              <label
                className="info-page__avatar-btn"
                htmlFor="avatar-change-input"
              >
                Change Avatar
              </label>
              <label className="info-page__user-id">
                {admin.user_fullName}
              </label>
            </div>

            <div className="info-page__col-2">
              <label className="info-page__title">Personal information</label>

              <div className="info-page__box-info">
                <label className="info-page__label">Administrator code</label>
                <input
                  style={{ fontWeight: "bold" }}
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
