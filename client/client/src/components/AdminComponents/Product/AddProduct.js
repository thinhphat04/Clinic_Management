import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css';
import { handleLoadingPage } from '../../Common';
import axios from 'axios';

const AddProduct = () => {
  // const [name, setName] = useState('');
   const [type, setType] = useState();
  // const [enType, setEnType] = useState('');
  // const [brand, setBrand] = useState('');
  // const [price, setPrice] = useState(0);
  // const [option, setOption] = useState([]);
  // const [color, setColor] = useState([]);
  // const [status, setStatus] = useState('');
  const [product_name, setName] = useState('');
  const [product_type, setEnType] = useState('');
  const [product_description, setDes] = useState('');
  const [product_price, setPrice] = useState(0);
  const [product_percent, setPercent] = useState(0);
  const [product_quantity,setQuantity ] =useState(0);
  const [product_img, setImg] = useState('');
  const [product_star, setStar] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Clinic Online | Thêm sản phẩm';
  }, []);

  const handleAddOption = () => {
    const optionList = document.querySelector('.add__option-list');
    if (optionList) {
      const item = document.createElement('div');
      item.classList.add('add__option-item');

      item.onclick = function (e) {
        if (e.target.closest('.add__option-item--remove')) {
          optionList.removeChild(item);
        }

        if (e.target.closest('.add__option-item--done')) {
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
    item.querySelectorAll('.add__option-item-input');
    const itemName = item.querySelectorAll('.add__option-item-input')[0].value;
    const itemPrice = item.querySelectorAll('.add__option-item-input')[1].value;
    var objItem = {
      data: itemName,
      price: Number(itemPrice),
    };

    item.innerHTML = `
        <div class="add__option-item--confirm">
            <label class="add__option-item-label">Tùy chọn:</label>
            <p style="font-weight: 400; line-height: 2rem">${itemName}</p>
        </div>
        <div class="add__option-item--confirm">
            <label class="add__option-item-label">Giá:</label>
            <p style="font-weight: 600; color: red;">${Number(
              itemPrice,
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
    try {
      const res = await axios.post(
        `https://localhost:7096/api/Products`,
        {
          product_name,
          product_type,
          product_description, 
          product_price,
          product_quantity,
          product_percent,
          product_img,
          product_star,
          feedbacks: [
            {
                "user_id": "1",  
                "feedback_description": "Good product!",
                "feedback_rating": 5
            }
          ]
        },
      );


      console.log("resssProduct:: ", res);
      if (res && res.data !== null) {
        alert('Thêm sản phẩm thành công');
        handleLoadingPage(1);
        window.setTimeout(() => {
          navigate('/admin/product');
        }, 1000);
      } else {
        window.alert('Đã gặp lỗi khi tạo! Vui lòng thử lại');
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
  console.log("aaaa", product_name);

  return (
    <div className="add-product__container">
      <div className="add__cover">
        <div className="add">
          <div className="add__header">THÊM SẢN PHẨM MỚI</div>
          <div className="add__body">
            <div className="add__col-right">
              <label className="add__title">Thông tin sản phẩm</label>

              <label className="add__label">Tên sản phẩm</label>
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

              <label className="add__label">Hình ảnh</label>
              <input
                className="add__input"
                onChange={(e) => {
                  setImg(e.target.value);
                }}
              />

              <label className="add__label">Loại sản phẩm</label>
              <select
                style={{ fontWeight: '500' }}
                className="add__input"
                onChange={(e) => {
                  setType(e.target.value);
                  switch (e.target.value.toLowerCase()) {
                    case 'Medical':
                      setEnType('Medical');
                      break;
                    case 'Education':
                      setEnType('Education');
                      break;
                    case 'Scientific':
                      setEnType('Scientific');
                      break;
                    // case 'phụ kiện':
                    //   setEnType('accessories');
                    //   break;
                  }
                }}
                value={type}
              >
                <option value="">Chọn loại sản phẩm ...</option>
                <option value="Education">Education</option>
                <option value="Medical">Medical</option>
                <option value="Scientific">Scientific</option>
                {/* <option value="Phụ kiện">Phụ kiện công nghệ</option> */}
              </select>

              {/* <label className="add__label">Thương hiệu</label>
              <input
                className="add__input"
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              /> */}
{/* 
              <label className="add__label">Tùy chọn sản phẩm</label>
              <div className="add__option">
                <ul className="add__option-list"></ul>
                <button className="add__option-btn" onClick={handleAddOption}>
                  +
                </button>
              </div> */}

              {/* <label className="add__label">Màu sắc</label>
              <input
                type="text"
                className="add__input"
                onChange={(e) => {
                  var arrayColor = e.target.value.split(', ');
                  setColor(arrayColor);
                }}
                placeholder="(Mỗi màu sắc được ngăn cách bằng dấu phẩy). Vd: Đỏ, Vàng, ..."
              /> */}

              <label className="add__label">Giá sản phẩm</label>
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

              {/* <label className="add__label">Trạng thái sản phẩm</label>
              <select
                className="add__input"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                value={status}
              >
                <option value="" selected>
                  Chọn giá trị...
                </option>
                <option value="Sẵn hàng">Sẵn hàng</option>
                <option value="Cháy hàng">Cháy hàng</option>
              </select> */}
            </div>
          </div>

          <div className="add__footer">
            <button className="add__btn-confirm" onClick={handleAddProduct}>
              Xác nhận
              <i className="add__btn-icon fa fa-check"></i>
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/admin/product');
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
