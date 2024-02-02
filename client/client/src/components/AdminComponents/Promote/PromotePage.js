import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/promote-style.css';
import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import { handleLoadingPage } from '../../Common';
import EditButtonPromote from '../../EditButton/EditButtonPromote';

const PromotePage = () => {
  const [promotes, setPromotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = () => {
      document.title = 'Clinic Online | Chương trình khuyến mãi';
      fetch('https://localhost:7096/api/GiftCode')
        .then((res) => res.json())
        .then((data) => {
          setPromotes(data);
          setLoading(false);
        });
    };
    fetchAPI();
    handleLoadOptionSelected(4);
  }, []);

  console.log("promotes::: ", promotes);

  const handleAddPromote = (event) => {
    event.preventDefault();
    handleLoadingPage(1);
    window.setTimeout(() => {
      navigate('/admin/promote/add');
    }, 1000);
  };

  return (
    <>
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">
          Good day, admin!
          </label>
          <label className="admin__tilte-describe">
          Promotions management page
          </label>
        </div>

        <div className="promote__group">
          <div className="promote__header">
            <label className="promote__header-title">
            List of promotions
            </label>
          </div>

          {/* <div className="promote__btn-container">
            <button className="promote__btn-add" onClick={handleAddPromote}>
            Add promotions
            </button>
          </div> */}

          <table className="table">
            <thead>
              <tr className="table__thead-primary">
                <td>Code ID</td>
                <td>Program name</td>
                 {/* <td>Từ ngày</td> */}
                <td>Describe</td> 
                <td>% reduce</td>
                <td>Apply for</td>
                {/* <td>Edit</td> */}
              </tr>
            </thead>
            <tbody className="table__tbody-primary">
              {loading ? (
                <tr>
                  <td>Loading...</td>
                </tr>
              ) : (
                promotes.map((promote, index) => (
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
                      {promote.giftName}
                    </td>
                    {/* <td style={{ backgroundColor: '#e0f1d4' }}>
                      {promote.timeStart}
                    </td> */}
                    <td style={{ backgroundColor: '#d5a2f7', fontWeight: 700 }}>
                      {promote.describe}
                    </td>
                    <td
                      style={{
                        fontWeight: 600,
                        textAlign: 'center',
                        fontSize: '2.4rem',
                        color: 'red',
                      }}
                    >
                      {promote.percentReduce || 'None'} %
                    </td>
                    <td style={{ backgroundColor: '#fff2c1' }}>
                      {promote.applyFor}
                    </td>
                    {/* <td>
                      <div className="table__edit-btn">
                        {<EditButtonPromote promote={promote} />}
                      </div>
                    </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PromotePage;
