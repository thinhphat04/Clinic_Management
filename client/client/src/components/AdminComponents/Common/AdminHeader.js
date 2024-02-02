import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLoadingPage } from '../../Common';
import AuthAdminContext from '../../../context/AuthAdminContext';

const AdminHeader = () => {
  const [authAdmin, setAuthAdmin] = useContext(AuthAdminContext);
  const [admin, setAdmin] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  // console.log("adminnnn:: ", admin);

  const handleNevigateInfo = () => {
    handleLoadingPage(1);
    window.setTimeout(() => {
      navigate(`/admin/info-admin`);
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
    <React.Fragment>
      <div className="admin__header">
        <div className="admin__header-title">
        Clinic Online system administration page
        </div>
        <div className="admin__header-admin">
          <div className="admin__header-info">
            Hello,
            <span className="admin__header-name">{admin.user_fullName}</span>
            --
          </div>

          <img src={admin.avatarUrl} className="admin__header-avatar"></img>

          <div className="admin__header-option">
            <div
              className="admin__header-option-item"
              onClick={handleNevigateInfo}
            >
              Personal information
            </div>
            <div
              className="admin__header-option-item"
              onClick={LogOut}
              style={{ color: 'red', fontWeight: 600 }}
            >
              Log out
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminHeader;
