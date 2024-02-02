import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product.css";
import AdminHeader from "../Common/AdminHeader";
import AdminSidebar, { handleLoadOptionSelected } from "../Common/AdminSidebar";
import { changeFilename, handleLoadingPage } from "../../Common";
import axios from "axios";

const InfoProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [type, setType] = useState(product.product_type);
  const [enType, setEnType] = useState("");
  const [imagePrimaryFile, setImagePrimaryFile] = useState(null);
  const [countImageInList, setCountImageInList] = useState(0);
  const [imageFileInList, setImageFileInList] = useState(null);
  const [product_img, setImg] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchAPIs = () => {
      document.title = "Clinic Online | Thông tin sản phẩm";
      fetch("https://localhost:7096/api/Products/search/" + id)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data[0]);
        });
    };
    fetchAPIs();
    handleLoadOptionSelected(2);
  }, []);


  // var type = product.product_type
  console.log("KHAIproduct::", product.product_type);
  // setType(product.product_type)

  const handleConfirmChangeImageLink = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("newImage", product_img);
    

    try {
      const res = await axios.patch(`https://localhost:7096/api/Products/updateProductImage/${product.product_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("resssProduct:: ", res);
      if (res && res.data !== null ) {
        alert("Update image successfully");
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

  // Thay đổi ảnh banner
  const changeImageBanner = () => {
    const preview = document.querySelector(
      ".info-admin-product__image-banner-img"
    );
    const imageProductLink = document.querySelector("#image-banner").files[0];

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        preview.src = reader.result;
      },
      false
    );

    if (imageProductLink) {
      reader.readAsDataURL(imageProductLink);
      setImagePrimaryFile(imageProductLink);
    }
  };

  const handleConfirmChangeImageBanner = async (e) => {
    e.preventDefault();
    var imagePrimaryProduct = "";
    if (imagePrimaryFile) {
      imagePrimaryProduct = `/public/uploads/products/${changeFilename(
        imagePrimaryFile.name,
        "imagePrimary-" + product._id
      )}`;
    }
    if (window.confirm("Bạn muốn cập nhật thông tin sản phẩm?") == true) {
      try {
        if (imagePrimaryFile) {
          const formData = new FormData();
          formData.append(
            "image-banner",
            imagePrimaryFile,
            changeFilename(imagePrimaryFile.name, "imagePrimary-" + product._id)
          );

          axios
            .post(
              "https://localhost:7096/api/products/upload-image-primary",
              formData
            )
            .then((response) => {
              axios
                .put(
                  `${process.env.REACT_APP_API}/api/products/update/image-banner=${id}`,
                  {
                    imagePrimary: response.data.path,
                  }
                )
                .then((res) => {
                  if (res && res.data.success) {
                    window.alert("Thành công!");
                    handleLoadingPage(1);
                    window.setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  } else {
                    alert("Cập nhật thông tin thất bại");
                  }
                });
            })
            .catch((error) => {
              alert("Lỗi khi upload:", error);
            });
        } else {
          const res = await axios.put(
            `${process.env.REACT_APP_API}/api/products/update/image-banner=${id}`,
            {
              imagePrimary: product.imagePrimary,
            }
          );
          if (res && res.data.success) {
            window.alert("Thành công!");
            handleLoadingPage(1);
            window.setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            alert("Cập nhật thông tin thất bại");
          }
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  // Thay đổi ảnh trong list ảnh
  const changeImageInList = () => {
    const preview = document.querySelector(".img-new");
    const elementWapper = document.querySelector(
      ".info-admin-product__image-item--disable"
    );
    console.log(preview);
    const imageProductFile = document.querySelector("#image-list").files[0];

    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        elementWapper.style.display = "block";
        preview.src = reader.result;
      },
      false
    );

    if (imageProductFile) {
      reader.readAsDataURL(imageProductFile);
      setImageFileInList(imageProductFile);
    }
  };

  var arrayImageList = [];
  const handleConfirmEditList = async () => {
    if (imageFileInList) {
    }
    try {
      if (imageFileInList) {
        const formData = new FormData();
        formData.append(
          "image-list",
          imageFileInList,
          changeFilename(
            imageFileInList.name,
            "imageList-" + product._id + "-" + countImageInList
          )
        );

        axios
          .post(
            "https://localhost:7096/api/products/upload-image-list",
            formData
          )
          .then((response) => {
            arrayImageList = [...product.imageList, response.data.path];
            axios
              .put(
                `${process.env.REACT_APP_API}/api/products/update/image-list=${id}`,
                {
                  imageList: arrayImageList,
                }
              )
              .then((res) => {
                if (res && res.data.success) {
                  window.alert("Success!");
                  handleLoadingPage(1);
                  window.setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                } else {
                  alert("Update information failed");
                }
              });
          })
          .catch((error) => {
            alert("Lỗi khi upload:", error);
          });
      } else {
        arrayImageList = [...product.imageList];
        axios
          .put(
            `${process.env.REACT_APP_API}/api/products/update/image-list=${id}`,
            {
              imageList: arrayImageList,
            }
          )
          .then((res) => {
            if (res && res.data.success) {
              window.alert("Thành công!");
              handleLoadingPage(10);
              window.setTimeout(() => {
                window.location.reload();
              }, 1000);
            } else {
              alert("Update information failed");
            }
          });
      }
    } catch (error) {
      alert(error);
    }
  };




  const handleConfirmChangeInfo = async (e) => {
    e.preventDefault();
    const inputElements = document.querySelectorAll(".info-admin-product__input");
    // Tạo một đối tượng FormData mới để gửi dữ liệu dạng multipart/form-data
    const formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    formData.append("product_name", inputElements[0].value);
    formData.append("product_description",inputElements[1].value);
    formData.append("product_type", inputElements[2].value);
    formData.append("product_img", "A");
    formData.append("product_quantity",inputElements[4].value);
    formData.append("product_price",inputElements[6].value);
    formData.append("product_percent",inputElements[6].value);
    formData.append("product_star", inputElements[5].value);
    formData.append("Image", product_img);

    try {
      const res = await axios.put(`https://localhost:7096/api/Products/${product.product_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // console.log("resssProduct:: ", res);
      if (res && res.data !== null && res.status === 200) {
        alert("Update product successfully");
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
    const preview = document.querySelector(".info-admin-product__image-primary-img");
    const imageUser = document.querySelector("#image-primary").files[0];

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

  // Xóa sản phẩm
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete all information about this product??"
      ) == true
    ) {
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_API}/api/products/delete/${id}`
        );
        if (res && res.data.success) {
          window.alert("Delete Successfully!");
          handleLoadingPage(1);
          window.setTimeout(() => {
            window.location.href = "/admin/product";
          }, 1000);
        } else {
          alert("Delete failed");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="customer__container">
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">Have a nice day, admin!</label>
          <label className="admin__tilte-describe">
            Customer management page
          </label>
        </div>

        <div className="info-admin-product__group">
          <div className="info-admin-product__header">
            EDIT PRODUCT INFORMATION
          </div>

          <div className="info-admin-product__body">
            <div className="info-admin-product__col-1">
              <div className="info-admin-product__image-primary">
                <img
                  className="info-admin-product__image-primary-img"
                  src={
                    product.product_img ||
                    "https://localhost:7096/public/img-product-empty.png"
                  }
                ></img>
                <input
                  type="file"
                  id="image-primary"
                  onChange={(e) => {
                    // Đảm bảo rằng một file đã được chọn
                    if (e.target.files.length > 0) {
                      // Cập nhật state bằng file đầu tiên được chọn
                      changeImageUser(product.product_id);
                      setImg(e.target.files[0]);
                    }
                  }}
                  hidden
                ></input>

                <div className="info-admin-product__image-controll">
                  <label
                    htmlFor="image-primary"
                    className="info-admin-product__image-btn"
                  >
                    Edit
                  </label>

                  <button
                    className="info-admin-product__image-btn"
                    style={{ backgroundColor: "#df8129", color: "#fff" }}
                    onClick={handleConfirmChangeImageLink}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>

            <div className="info-admin-product__col-2">
              <div className="info-admin-product__box-info">
                <label className="info-admin-product__label">
                  Product's name
                </label>
                <input
                  style={{ fontWeight: "bold" }}
                  className="info-admin-product__input"
                  defaultValue={product.product_name}
                />

                <label className="info-admin-product__label">Description</label>
                <input
                  type="text"
                  className="info-admin-product__input"
                  defaultValue={product.product_description}
                />

                <label className="info-admin-product__label">
                  Product type
                </label>
                <select
                  style={{ fontWeight: "500" }}
                  className="info-admin-product__input"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  value={type}
                  // defaultValue={product.product_type}
                >
                  <option value="Education">Education</option>
                  <option value="Medical">Medical</option>
                  <option value="Scientific">Scientific</option>
                </select>

                <label className="info-admin-product__label">
                  Product price
                </label>
                <input
                  className="info-admin-product__input"
                  defaultValue={product.product_price}
                  style={{ fontWeight: "bold", color: "red" }}
                />

                <label className="info-admin-product__label">Quantity</label>
                <input
                  type="number"
                  className="info-admin-product__input"
                  defaultValue={product.product_quantity}
                />

                <label className="info-admin-product__label">Star</label>
                <input
                  type="number"
                  className="info-admin-product__input"
                  defaultValue={product.product_star}
                />

                <label className="info-admin-product__label">Percent</label>
                <input
                  type="number"
                  className="info-admin-product__input"
                  defaultValue={product.product_percent}
                />
              </div>
            </div>
          </div>

          <div className="info-admin-product__footer">
            <button
              className="info-admin-product__btn"
              style={{ backgroundColor: "red" }}
              onClick={handleDeleteProduct}
            >
              Xóa sản phẩm<i className="ti-check"></i>
            </button>
            <button
              className="info-admin-product__btn"
              onClick={handleConfirmChangeInfo}
            >
              Xác nhận<i className="ti-check"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoProduct;
