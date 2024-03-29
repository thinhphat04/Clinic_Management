import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLoadingPage } from '../../Common';
import AuthAdminContext from '../../../context/AuthAdminContext';

const handleLoadOptionSelected = (index) => {
  const optionItems = document.querySelectorAll('.sidebar__component-item');
  const optionItemActive = document.querySelector(
    '.sidebar__component-item.sidebar__component-item--active',
  );
  optionItems.forEach((item, i) => {
    if (optionItemActive) {
      optionItemActive.classList.remove('sidebar__component-item--active');
    }
  });
  optionItems[index].classList.add('sidebar__component-item--active');
};

const AdminSidebar = () => {
  const [authAdmin, setAuthAdmin] = useContext(AuthAdminContext);
  const [admins, setAdmins] = useState([]);
  const [adminID, setAdminID] = useState('');

  useEffect(() => {
    const fetchAPIs = () => {
      fetch('https://localhost:7096/api/User/user/1')
        .then((res) => res.json())
        .then((data) => {
          // console.log("dataaAAAA: ", data);
          setAdmins([data]);
        });
    };
    fetchAPIs();
  }, []);
  // console.log("admins:: ", admins);

  useEffect(() => {
    admins.map((admin, index) => {
      if (admin.userName == window.localStorage.getItem('adminNameLogin')) {
        setAdminID(admin.adminID);
      }
    });
  }, [admins]);

  const navigate = useNavigate();

  const handleNevigate = (link) => {
    handleLoadingPage(1);
    window.setTimeout(() => {
      navigate(link);
    }, 1000);
  };

  const LogOut = (e) => {
    e.preventDefault();
    setAuthAdmin({ adminName: null, token: '' });
    window.localStorage.removeItem('authAdmin');
    window.alert('Đăng xuất tài khoản thành công');
    handleLoadingPage(1);
    window.setTimeout(() => {
      window.location.href = `/admin`;
    }, 1000);
  };

  return (
    <div id="sidebar">
      <div
        className="sidebar__logo"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = '/admin/dashboard';
        }}
      ></div>

      <div
        className="sidebar__component-item"
        onClick={() => {
          handleNevigate(`/admin/dashboard`);
        }}
      >
        <i
          className="sidebar__component-item-icon fa fa-home"
          aria-hidden="true"
        ></i>
        Statistical
      </div>

      <div className="sidebar__component">
        <label className="sidebar__component-label">Data management</label>
        <div
          className="sidebar__component-item"
          onClick={() => {
            handleNevigate(`/admin/customer`);
          }}
        >
          <i
            className="sidebar__component-item-icon fa fa-users"
            aria-hidden="true"
          ></i>
          Client
        </div>
        <div
          className="sidebar__component-item"
          onClick={() => {
            handleNevigate(`/admin/product`);
          }}
        >
          <i
            className="sidebar__component-item-icon fa fa-table"
            aria-hidden="true"
          ></i>
          Product 
        </div>
        <div
          className="sidebar__component-item"
          onClick={() => {
            handleNevigate(`/admin/order`);
          }}
        >
          <i
            className="sidebar__component-item-icon fa fa-table"
            aria-hidden="true"
          ></i>          
          Order
        </div>

        <div
          className="sidebar__component-item"
          onClick={() => {
            handleNevigate(`/admin/promote`);
          }}
        >
          <i
            className="sidebar__component-item-icon fa fa-tag"
            aria-hidden="true"
          ></i>
          Promotion
        </div>
        <div
          className="sidebar__component-item"
          onClick={() => {
            handleNevigate(`/admin/feedback`);
          }}
        >
          <i
            className="sidebar__component-item-icon fa fa-comments"
            aria-hidden="true"
          ></i>
          Customer reviews
        </div>
      </div>

      <div className="sidebar__component">
        <label className="sidebar__component-label">Option</label>
        <div
          className="sidebar__component-item"
          onClick={() => {
            handleNevigate(`/admin/info-admin/${adminID}`);
          }}
        >
          <i
            className="sidebar__component-item-icon fa fa-user"
            aria-hidden="true"
          ></i>
          Personal information
        </div>
        <div className="sidebar__component-item" onClick={LogOut}>
          <i
            className="sidebar__component-item-icon fa fa-sign-out"
            aria-hidden="true"
          ></i>
          Log out
        </div>
      </div>
    </div>
  );
};

export { handleLoadOptionSelected };
export default AdminSidebar;
