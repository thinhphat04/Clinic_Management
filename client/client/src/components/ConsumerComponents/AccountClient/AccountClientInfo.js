import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAccount, { handleLoadOptionSidebar } from "./SidebarAccount";
import { Breadcrumbs, Nav } from "../Common";
import { changeFilename, handleLoadingPage } from "../../Common";

const AccountClientInfo = () => {
  const [user, setUser] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [product_img, setImg] = useState(null);

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

  // const handleEditInfo = async (e) => {

  //   e.preventDefault();
  //   const inputElements = document.querySelectorAll('.account__box-info-input');
  //   if (window.confirm('You want to modify personal information!') == true) {
  //     try {
  //       if (imageFile) {
  //         const formData = new FormData();
  //         formData.append(
  //           'avatar-change',
  //           imageFile,
  //           changeFilename(imageFile.name, user.id),
  //         );

  //         axios
  //           .post(
  //             'https://localhost:7096/api/users/upload-image',
  //             formData,
  //           )
  //           .then((response) => {
  //             console.log(response);
  //             axios
  //               .put(
  //                 `${process.env.REACT_APP_API}/api/users/update/${
  //                   JSON.parse(window.localStorage.getItem('auth')).user._id
  //                 }`,
  //                 {
  //                   avatarUrl: response.data.path,
  //                   fullname: inputElements[0].value,
  //                   email: inputElements[1].value,
  //                   phone: inputElements[2].value,
  //                   address: inputElements[3].value,
  //                 },
  //               )
  //               .then((res) => {
  //                 if (res && res.data.success) {
  //                   alert('Successfully updated!');
  //                   handleLoadingPage(1);
  //                   window.setTimeout(() => {
  //                     window.location.reload();
  //                   }, 1000);
  //                 } else {
  //                   alert('Update information failed');
  //                 }
  //               });
  //           })
  //           .catch((error) => {
  //             alert('Lỗi khi upload:' + error);
  //             console.error(error);
  //           });
  //       } else {
  //         axios
  //           .put(
  //             `${process.env.REACT_APP_API}/api/users/update/${
  //               JSON.parse(window.localStorage.getItem('auth')).user._id
  //             }`,
  //             {
  //               avatarUrl: user.avatarUrl,
  //               fullname: inputElements[0].value,
  //               email: inputElements[1].value,
  //               phone: inputElements[2].value,
  //               address: inputElements[3].value,
  //             },
  //           )
  //           .then((res) => {
  //             if (res && res.data.success) {
  //               alert('Successfully updated!');
  //               handleLoadingPage(1);
  //               window.setTimeout(() => {
  //                 window.location.reload();
  //               }, 1000);
  //             } else {
  //               alert('Update information failed');
  //             }
  //           });
  //       }
  //     } catch (error) {
  //       alert(error);
  //     }
  //   }
  // };

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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountClientInfo;
