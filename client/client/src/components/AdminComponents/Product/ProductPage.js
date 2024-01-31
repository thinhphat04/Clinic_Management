import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css';
import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import { handleLoadingPage } from '../../Common';
import EditButtonProduct from '../../EditButton/EditButtonProduct';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [countProduct, setCountProduct] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Clinic Online | Dữ liệu sản phẩm';
    const fetchAPI = () => {
      fetch('https://localhost:7096/api/Products')
        .then((res) => res.json())
        .then((data) => {
          console.log("data:: ", data);
          setProducts(data);
          setCountProduct(data.length);
          setLoading(false);
        });
    };
    fetchAPI();
    handleLoadOptionSelected(2);
  }, []);

  const navigate = useNavigate();

  const handleClickBtnAdd = (e) => {
    handleLoadingPage(1);
    window.setTimeout(() => {
      navigate('/admin/product/add');
    }, 1000);
  };

  return (
    <>
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">
          Have a nice day, admin!
          </label>
          <label className="admin__tilte-describe">
          Product management page
          </label>
        </div>

        <div className="product__group">
          <div className="product__header">
            <label className="product__header-title">List of products</label>
            <div className="product__header-counting">
              {' '}
              Total product quantity:
              <span className="customer__header-counting-number">
                {countProduct}
              </span>
            </div>
          </div>

          <div className="product__list">
            {loading ? (
              <p>Connecting to the server... </p>
            ) : (
              products.map((product, index) => (
                <div className="product__item" key={index}>
                  <label style={{ color: 'white' }} className="admin__item-id">
                    STT: 0{index + 1}
                  </label>
                  <div className="product__item-avatar">
                    <img
                      src={product.product_img}
                      className="product__item-img"
                    ></img>
                  </div>
                  <label
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 'bold',
                      lineHeight: '2.2rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    className="admin__item-admin-name"
                  >
                    {product.product_name}
                  </label>

                  <div className="admin__item-info">
                    <label className="admin__item-info-label">
                    Product Type:
                    </label>
                    <p className="admin__item-info-content">{product.product_type}</p>
                  </div>
                  <div className="admin__item-info">
                    <label className="admin__item-info-label">
                    Status:
                    </label>
                    <p className="admin__item-info-content">
                      {' '}
                      {product.status || 'Trống!'}
                    </p>
                  </div>
                  <div className="admin__item-info--last">
                    <div className="admin__item-info-price">
                      <p
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: 'bold',
                          color: 'red',
                          textAlign: 'right',
                          width: '100%',
                        }}
                        className="admin__item-info-content"
                      >
                        {Number(product.product_price).toLocaleString() || 'Trống!'} VNĐ{' '}
                      </p>
                    </div>
                    <div className="admin__item-eidt">
                      <div
                        style={{
                          fontSize: '2rem',
                          fontWeight: 'bold',
                          color: 'red',
                          textAlign: 'right',
                          width: '100%',
                        }}
                        className="admin__item-info-content"
                      >
                        <EditButtonProduct product={product} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="product__btn-container">
            <button className="product__btn-add" onClick={handleClickBtnAdd}>
            Add new products
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
