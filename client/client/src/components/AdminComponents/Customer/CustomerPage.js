import React, { useState, useEffect } from 'react';
import './styles/customer-style.css';
import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import EditButtonCustomer from '../../EditButton/EditButtonCustomer';

const CustomerPage = () => {
  const [users, setUsers] = useState([]);
  const [countCustomer, setCountCustomers] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Clinic Online | Khách hàng';
    const fetchAPI = () => {
      fetch('https://localhost:7096/api/User')
        .then((res) => res.json())
        .then((data) => {
         
          setUsers(data);
          setLoading(false);
          setCountCustomers(data.length);
        });
    };
    fetchAPI();
    handleLoadOptionSelected(1);
  }, []);

  // console.log("dataUserAAA:: ", users);

  return (
    <div className="customer__container">
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">
          Have a nice day, admin!
          </label>
          <label className="admin__tilte-describe">
          Customer management page
          </label>
        </div>
        <div className="customer__group">
          <div className="customer__header">
            <label className="customer__header-title">
            List of customers
            </label>
            <div className="customer__header-counting">
            Customers number:
              <span className="customer__header-counting-number">
                {countCustomer}
              </span>
            </div>
          </div>

          <div className="customer__table-cover">
            <table className="table">
              <thead>
                <tr className="table__thead-primary">
                  <td>STT</td>
                  <td>Account name</td>
                  <td>Customer's full name</td>
                  <td>Email</td>
                  <td>Phone number</td>
                  <td>Address</td>
                  <td>Edit</td>
                </tr>
              </thead>
              <tbody className="table__tbody-primary">
                {loading ? (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr className="table__row-loading" key={index}>
                      <td
                        style={{
                          textAlign: 'center',
                          background: '#ffcdd2',
                          fontWeight: 700,
                        }}
                      >
                        {index + 1}
                      </td>
                      <td style={{ color: 'red', fontWeight: 700 }}>
                        {user.userName}
                      </td>
                      <td
                        style={{
                          textAlign: 'left',
                          backgroundColor: 'var(--primary-color',
                          fontWeight: 700,
                          color: 'white',
                        }}
                      >
                        {user.user_fullName}
                      </td>
                      <td style={{ textAlign: 'left' }}>
                        {user.email || 'None'}
                      </td>
                      <td style={{ backgroundColor: '#fff2c1' }}>
                        {user.phoneNumber || 'None'}
                      </td>
                      <td style={{ textAlign: 'left' }}>
                        {user.user_address || 'None'}
                      </td>
                      <td>
                        <div className="table__edit-btn">
                          {<EditButtonCustomer user={user} />}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
