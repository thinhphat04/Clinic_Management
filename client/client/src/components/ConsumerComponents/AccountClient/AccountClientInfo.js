import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAccount, { handleLoadOptionSidebar } from "./SidebarAccount";
import { Breadcrumbs, Nav } from "../Common";
import { changeFilename, handleLoadingPage } from "../../Common";
import Validator from "../../Common/Validator";
const AccountClientInfo = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [product_img, setImg] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPAss, setConfirmPass] = useState("");
  useEffect(() => {
    Validator({
      form: "#form-1",
      error: ".form-message",
      rules: [
        Validator.isRequired("#oldpasword"),
        // Validator.isPassword("#oldpassword"),
        Validator.isMinLength("#oldpassword", 8),

        Validator.isRequired("#newpassword"),
        Validator.newPassword("#newpassword"),
        Validator.isMinLength("#newpassword", 8),

        Validator.isRequired("#confirmnewpassword"),
        Validator.isConfirmed("#confirmnewpassword", () => {
          return document.getElementById("newpassword").value;
        }),
      ],
    });
  }, []);

  useEffect(() => {
    document.title = "Clinic Online | Personal information";
    const fetchAPIs = () => {
      fetch(
        `https://localhost:7096/api/User/user/${
          JSON.parse(window.localStorage.getItem("auth")).id
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
        });
    };
    fetchAPIs();
    handleLoadOptionSidebar(1);
  }, []);
  // console.log("userr:: ",user);

  const changeImageUser = () => {
    const preview = document.querySelector(".account__box-info-avatar");
    const imageUser = document.querySelector("#avatar-change").files[0];

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

  const handleEditInfo = async (e) => {
    e.preventDefault();
    const inputElements = document.querySelectorAll(".account__box-info-input");
    // Tạo một đối tượng FormData mới để gửi dữ liệu dạng multipart/form-data
    const formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    formData.append("Id", JSON.parse(window.localStorage.getItem("auth")).id);
    formData.append("Username", inputElements[0].value);
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
        alert("Update profile successfully");
        handleLoadingPage(1);
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        window.alert("An error occurred while creating! Please try again");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.log(
          "Server responded with error status:",
          error.response.status
        );

        if (error.response.status === 400) {
          // Handle specific error for duplicate email
          const errorMessage = error.response.data
            ? error.response.data
            : "Bad Request";

          // Show the error message to the user
          window.alert(`Error: ${errorMessage}`);
        } else {
          // For other 4xx or 5xx errors
          window.alert(
            `Error: ${error.response.data.message || "Bad Request"}`
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from the server");
        window.alert("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error during request setup:", error.message);
        window.alert("Error during request setup");
      }
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();

    const inputElements = document.querySelectorAll(".account__box-info-input");
    try {
      const aaa = String(JSON.parse(window.localStorage.getItem("auth")).id);
      const res = await axios.put(
        "https://localhost:7096/api/Account/ChangePassword/" + aaa,
        // Tạo một đối tượng FormData mới để gửi dữ liệu dạng multipart/form-data
        {
          // Id: JSON.parse(window.localStorage.getItem("auth")).id,
          oldPassword: inputElements[5].value,
          newPassword: inputElements[6].value,
          confirmNewPassword: inputElements[7].value,
        }
        // console.log(inputElements[5].value);
      );

      console.log("resssProduct:: ", res);
      if (res && res.data !== null && res.status === 200) {
        alert("Update pass successfully");
        handleLoadingPage(1);
        window.setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        window.alert("An error occurred while creating! Please try again");
      }
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response && error.response.data && error.response.data.errors) {
        // Set specific errors for display
        setErrorMessage(error.response.data.errors);
      } else {
        // General error handling
        window.alert("An error occurred while registering! Please try again 2");
      }
    }
  };

  console.log(JSON.parse(window.localStorage.getItem("auth")).id);
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
                <div className="account__box-info-container">
                  <img
                    className="account__box-info-avatar"
                    src={
                      user.avatarUrl ||
                      "https://localhost:7096/public/img-avatar-empty.png"
                    }
                  ></img>

                  <input
                    type="file"
                    id="avatar-change"
                    onChange={(e) => {
                      // Đảm bảo rằng một file đã được chọn
                      if (e.target.files.length > 0) {
                        // Cập nhật state bằng file đầu tiên được chọn
                        changeImageUser(user.id);
                        setImg(e.target.files[0]);
                      }
                    }}
                    hidden
                  ></input>
                  <label
                    className="account__box-info-avatar-btn"
                    htmlFor="avatar-change"
                  >
                    Change Avatar
                  </label>
                </div>

                <label className="account__box-info-label">HELLO</label>
                <label className="account__box-info-fullname">
                  {user.userName}
                </label>
                <label className="account__box-info-header">
                  PERSONAL INFORMATION
                </label>

                <label className="account__box-info-title">Username:</label>
                <input
                  className="account__box-info-input"
                  defaultValue={user.userName}
                  name="username"
                />

                <label className="account__box-info-title">Full name:</label>
                <input
                  className="account__box-info-input"
                  defaultValue={user.user_fullName}
                  name="fullname"
                />

                <label className="account__box-info-title">Email:</label>
                <input
                  className="account__box-info-input"
                  defaultValue={user.email}
                  name="email"
                />

                <label className="account__box-info-title">Phone number:</label>
                <input
                  className="account__box-info-input"
                  type="text"
                  defaultValue={user.phoneNumber}
                  name="phone"
                />

                <label className="account__box-info-title">Address:</label>
                <input
                  className="account__box-info-input"
                  defaultValue={user.user_address}
                  name="address"
                />

                <button
                  className="account__box-info-btn"
                  onClick={handleEditInfo}
                >
                  Update information
                </button>

                <label className="account__box-info-header">
                  CHANGE PASSWORD
                </label>
                <div>
                  {/* Display registration errors if any */}
                  {errorMessage && (
                    <div>
                      <p>You can not change your password because:</p>
                      <ul>
                        {Object.keys(errorMessage).map((field, index) => (
                          <li key={index}>
                            {field}: {errorMessage[field].join(", ")}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <form
                  className="form"
                  id="form-1"
                  onSubmit={handleChangePassword}
                >
                  <div className="form-group">
                    <label className="account__box-info-title">
                      Old Password:
                    </label>

                    <input
                      id="oldpassword"
                      name="oldpassword"
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                      className="form-control account__box-info-input"
                    ></input>

                    <span className="form-message"></span>
                  </div>

                  <div className="form-group">
                    <label className="account__box-info-title">
                      New Password:
                    </label>

                    <input
                      id="newpassword"
                      name="newpassword"
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      className="form-control account__box-info-input"
                    ></input>

                    <span className="form-message"></span>
                  </div>

                  <div className="form-group">
                    <label className="account__box-info-title">
                      Confirm New Password:
                    </label>

                    <input
                      id="confirmnewpassword"
                      name="confirmnewpassword"
                      type="password"
                      placeholder="Enter password"
                      onChange={(e) => setConfirmPass(e.target.value)}
                      value={confirmPAss}
                      className="form-control account__box-info-input"
                    ></input>

                    <span className="form-message"></span>
                  </div>
                </form>
                <button
                  className="account__box-info-btn"
                  onClick={handleChangePassword}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountClientInfo;
