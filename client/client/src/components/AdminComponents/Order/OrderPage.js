import React, { useState, useEffect } from 'react';
import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import { handleLoadingPage } from '../../Common';

const OrderPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchAPIs = () => {
    document.title = 'Clinic Online | Order';
    fetch('https://localhost:7096/api/Order')
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
      });
  };



  useEffect(() => {
    fetchAPIs();
    handleLoadOptionSelected(3);
  }, []);

  console.log('AAfeed: ',feedbacks );


  return (
    <React.Fragment>
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">
          Have a nice day, admin!
          </label>
          <label className="admin__tilte-describe">
          Customer opinion management page
          </label>
        </div>

        <div className="promote__group">
          <label className="dash__group-title">
          List of customer order
          </label>

          <div className="admin__list" style={{ maxHeight: 'none' }}>
            <table className="table">
              <thead>
                <tr className="table__thead-primary">
                  <td>Code</td>
                  <td>Customer's full name</td>
                  <td>Email</td>
                  <td>Address</td>
                  <td>Phone</td>
                  <td>Total price</td>
                  <td>Note</td>
                  <td>Status</td>
                  <td>Time</td>
                </tr>
              </thead>
              <tbody className="table__tbody-primary">
                {feedbacks.map((feedback, index) => (
                  <tr className="table__row-loading" key={index}>
                    <td
                      style={{
                        textAlign: 'center',
                        background: '#ffcdd2',
                        fontWeight: 700,
                      }}
                    >
                      {feedback.order_code}
                    </td>
                    <td
                      style={{
                        color: '#333',
                        fontWeight: 700,
                        textAlign: 'left',
                      }}
                    >
                      {feedback.user.user_fullName}
                    </td>
                    <td>{feedback.user.email}</td>
                    <td>{feedback.order_address}</td>
                    <td style={{ fontWeight: 700, color: 'red' }}>
                      {feedback.order_phone}
                    </td>
                    <td style={{ fontWeight: 700, color: 'red' }}>
                      {feedback.order_total}đ
                    </td>
                    <td
                      style={{
                        fontWeight: 400,
                        textAlign: 'justify',
                        fontSize: '1.4rem',
                        fontStyle: 'italic',
                      }}
                    >
                      "{feedback.order_note || 'None'}"
                    </td>
                    <td style={{ fontWeight: 700, color: 'red' }}>
                      {feedback.order_status}
                    </td>
                    <td>{feedback.order_datetime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderPage;
