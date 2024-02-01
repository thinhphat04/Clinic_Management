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
    document.title = 'Clinic Online | Add products';
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
            <label class="add__option-item-label">Option:</label>
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

  var product_img_a = 'Images/'+ product_img ;
  console.log('product_img_a:: ', product_img_a);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://localhost:7096/api/Products`,
        {
          product_name,
          product_description, 
          product_type,
          product_img: product_img_a,
          product_quantity,
          product_price,

           product_percent,

          product_star,
        },

      //   {
      //     product_name: "Acetylcystein 200 Imexpharm",
      //     product_description: "Ingredient: Acetylcysteine 200mg...",
      //     product_type: "Medical",
      //     product_img: "Images/Screenshot243731255.png",
      //     product_quantity: 20,
      //     product_price: 50,
      //     // product_percent:20,
      //     product_star: 5
      // }
      );

   
      console.log("resssProduct:: ", res);
      if (res && res.data !== null) {
        alert('Added product successfully');
        handleLoadingPage(1);
        window.setTimeout(() => {
          navigate('/admin/product');
        }, 1000);
      } else {
        window.alert('An error occurred while creating! Please try again');    
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };
  console.log("aaaa", product_type);
  console.log('product_percent',product_percent);
  console.log('product_price',product_price);   console.log('product_star',product_star);   console.log('product_quantity',product_quantity);  

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
                // type="file"
                className="add__input"
                onChange={(e) => {
                  setImg(e.target.value);
                  // setImg(e.target.files[0]);
                }}
                // onChange={(e) => {
                //   const file = e.target.files[0];
                //   if (file) {
                //     console.log(file.name); // In tên file vào console
                //     setImg(file.name); 
                //   }
                // }}
              />

              <label className="add__label">Product type</label>
              <select
                style={{ fontWeight: '500' }}
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
            Confirm
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
