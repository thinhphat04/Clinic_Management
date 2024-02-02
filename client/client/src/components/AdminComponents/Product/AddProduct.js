import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";
import { handleLoadingPage } from "../../Common";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
  // const [name, setName] = useState('');
  const [type, setType] = useState();
  const [product_name, setName] = useState("");
  const [product_type, setEnType] = useState("");
  const [product_description, setDes] = useState("");
  const [product_price, setPrice] = useState(0);
  const [product_percent, setPercent] = useState(0);
  const [product_quantity, setQuantity] = useState(0);
  const [product_img, setImg] = useState(null);
  const [product_star, setStar] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Clinic Online | Add products";
  }, []);

  const handleAddOption = () => {
    const optionList = document.querySelector(".add__option-list");
    if (optionList) {
      const item = document.createElement("div");
      item.classList.add("add__option-item");

      item.onclick = function (e) {
        if (e.target.closest(".add__option-item--remove")) {
          optionList.removeChild(item);
        }

        if (e.target.closest(".add__option-item--done")) {
          handleConfirmOption(item);
        }
      };

      item.innerHTML = `
            <input class="add__option-item-input" placeholder='Tên ...' />
            <input class="add__option-item-input" type="number" placeholder="Giá..." />
            <button class="add__option-item--remove">
            <i class="fa fa-close"></i>
            <button class="add__option-item--done">
            <i class="fa fa-check"></i>
            </button>
        `;
      optionList.appendChild(item);
    }
  };

  const handleConfirmOption = (item) => {
    item.querySelectorAll(".add__option-item-input");
    const itemName = item.querySelectorAll(".add__option-item-input")[0].value;
    const itemPrice = item.querySelectorAll(".add__option-item-input")[1].value;
    var objItem = {
      data: itemName,
      price: Number(itemPrice),
    };

    item.innerHTML = `
        <div class="add__option-item--confirm">
            <label class="add__option-item-label">Option:</label>
            <p style="font-weight: 400; line-height: 2rem">${itemName}</p>
        </div>
        <div class="add__option-item--confirm">
            <label class="add__option-item-label">Giá:</label>
            <p style="font-weight: 600; color: red;">${Number(
              itemPrice
            ).toLocaleString()} đ</p>
        </div>
        `;
    // setOption([...option, objItem]);
  };

  const randomPercent = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };


  const handleAddProduct = async (e) => {
    e.preventDefault();
    // Tạo một đối tượng FormData mới để gửi dữ liệu dạng multipart/form-data
    const formData = new FormData();
    // Thêm các trường dữ liệu vào FormData
    formData.append("product_name", product_name);
    formData.append("product_description", product_description);
    formData.append("product_type", product_type);
    formData.append("product_img", "");
    formData.append("product_quantity", product_quantity);
    formData.append("product_price", product_price);
    formData.append("product_percent", product_percent);
    formData.append("product_star", product_star);
    formData.append("Image", product_img);
    try {
      const res = await axios.post(
        `https://localhost:7096/api/Products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("resssProduct:: ", res);
      if (res && res.data !== null && res.status === 200) {
         alert("Added product successfully");
      //  toast('teast')

        handleLoadingPage(1); // Giả định rằng bạn đã định nghĩa hàm này ở nơi nào đó
        window.setTimeout(() => {
          navigate('/admin/product'); // Giả định rằng bạn đã định nghĩa hàm navigate ở nơi nào đó
        }, 1000);
      } else {
        window.alert("An error occurred while creating! Please try again");
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
  console.log("product_img: ", product_img);

  return (
    <div className="add-product__container">
      <div className="add__cover">
        <div className="add">
          <div className="add__header">ADD NEW PRODUCTS</div>
          <div className="add__body">
            <div className="add__col-right">
              <label className="add__title">Product information</label>

              <label className="add__label">Product's name</label>
              <input
                className="add__input"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <label className="add__label">Description</label>
              <input
                className="add__input"
                onChange={(e) => {
                  setDes(e.target.value);
                }}
              />
              <label className="add__label">Image</label>
              <input
                type="file"
                className="add__input"
                onChange={(e) => {
                  // Đảm bảo rằng một file đã được chọn
                  if (e.target.files.length > 0) {
                    // Cập nhật state bằng file đầu tiên được chọn
                    setImg(e.target.files[0]);
                  }
                }}
              />

              <label className="add__label">Product type</label>
              <select
                style={{ fontWeight: "500" }}
                className="add__input"
                onChange={(e) => {
                  setEnType(e.target.value);
                }}
                value={product_type}
              >
                <option value="">Select product type...</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Scientific">Scientific</option>
              </select>
              <label className="add__label">Product price</label>
              <input
                type="number"
                className="add__input"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />

              <label className="add__label">Quantity</label>
              <input
                type="number"
                className="add__input"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
              <label className="add__label">Star</label>
              <input
                type="number"
                className="add__input"
                onChange={(e) => {
                  setStar(e.target.value);
                }}
              />
              <label className="add__label">Percent</label>
              <input
                type="number"
                className="add__input"
                onChange={(e) => {
                  setPercent(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="add__footer">
            <button className="add__btn-confirm" onClick={handleAddProduct}>
              Confirm
              <i className="add__btn-icon fa fa-check"></i>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/product");
              }}
              className="add__btn-close"
            >
              Close
              <i className="add__btn-icon fa fa-sign-out"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
