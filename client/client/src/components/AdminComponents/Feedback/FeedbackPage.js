import React, { useState, useEffect } from 'react';
import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import { handleLoadingPage } from '../../Common';
import EditButtonCustomer from '../../EditButton/EditButtonCustomer';
import EditButtonReply from '../../EditButton/EditButtonReply';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchAPIs = () => {
    document.title = 'Clinic Online | Phản hồi khách hàng';
    fetch('https://localhost:7096/api/Contact')
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
      });
  };

  useEffect(() => {
    fetchAPIs();
    handleLoadOptionSelected(5);
  }, []);

  const handleFillterByType = (type) => {
    var feedbackByType = [];
    fetch('https://localhost:7096/api/Contact')
      .then((res) => res.json())
      .then((data) => {
        data.map((feedback) => {
          if (feedback.type === type) {
            feedbackByType.push(feedback);
          }
        });
        setFeedbacks(feedbackByType);
      });

    const fillterList = document.querySelectorAll('.search-control__btn');
    fillterList.forEach((item) => {
      item.onclick = () => {
        fillterList.forEach((btn) =>
          btn.classList.remove('search-control__btn--active'),
        );
        item.classList.add('search-control__btn--active');
      };
    });
  };
  console.log("feedbacksAAA: ", feedbacks);

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
          List of customer comments
          </label>

          <div className="admin__list" style={{ maxHeight: 'none' }}>
            <div
              style={{ marginLeft: '0', marginBottom: '20px' }}
              className="search-control"
            >
              <button
                className="search-control__btn search-control__btn--active"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    window.location.reload();
                  }, 1000);
                }}
              >
                All
              </button>
              <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleFillterByType('Account');
                  }, 1000);
                }}
              >
                Account problem
              </button>
              <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleFillterByType('Promotion');
                  }, 1000);
                }}
              >
                Promotion problem
              </button>
              <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleFillterByType('System');
                  }, 1000);
                }}
              >
                System improvements
              </button>
              <button
                className="search-control__btn"
                onClick={(e) => {
                  handleLoadingPage(1);
                  setTimeout(() => {
                    handleFillterByType('Other');
                  }, 1000);
                }}
              >
                Other problems
              </button>
            </div>

            <table className="table">
              <thead>
                <tr className="table__thead-primary">
                  <td>STT</td>
                  <td>Customer's full name</td>
                  <td>Email</td>
                  <td>Type of comments</td>
                  <td>Nội dung</td>
                  <td>Reply</td>
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
                      {index + 1}
                    </td>
                    <td
                      style={{
                        color: '#333',
                        fontWeight: 700,
                        textAlign: 'left',
                      }}
                    >
                      {feedback.fullname}
                    </td>
                    <td>{feedback.email}</td>
                    <td style={{ fontWeight: 700, color: 'red' }}>
                      {feedback.type}
                    </td>
                    <td
                      style={{
                        fontWeight: 400,
                        textAlign: 'justify',
                        fontSize: '1.4rem',
                        fontStyle: 'italic',
                      }}
                    >
                      "{feedback.content || 'None'}"
                    </td>
                      <td>
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
                        <EditButtonReply product={feedback.email} />
                      </div>
                    </div>
                      </td> 
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

export default FeedbackPage;
