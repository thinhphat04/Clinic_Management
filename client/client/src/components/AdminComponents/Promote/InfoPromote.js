import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./styles/promote-style.css";
import AdminHeader from "../Common/AdminHeader";
import AdminSidebar, { handleLoadOptionSelected } from "../Common/AdminSidebar";
import { changeFilename, handleLoadingPage } from "../../Common";
import axios from "axios";

const InfoPromote = () => {
  const [promote, setPromote] = useState({});
  const { id } = useParams();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Clinic Online | Thông tin khuyến mãi";
    // const fetchAPI = () => {
    //   fetch('https://localhost:7096/api/promotes/' + id)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setPromote(data);
    //     });
    // };
    // fetchAPI();
    handleLoadOptionSelected(5);
  }, []);



  const handleConfirmChange = async (e) => {
    e.preventDefault();
    // const inputName = document.querySelector(".info-promote__input-name");
    const inputElements = document.querySelectorAll(".info-promote__input");
    if (
      window.confirm("You want to reply feedback?") ==
      true
    ) {
      try {
        const res = await axios.post(
          `https://localhost:7096/api/Mail/Reply`,

          {
            toEmail: id,
            subject: inputElements[0].value,
            body: inputElements[1].value,
          }
        );

        if (res.data != null) {
          alert("Reply success");
        }
      } catch (error) {
        alert(error);
      }
    }
  };


  return (
    <React.Fragment>
      <AdminSidebar />
      <div id="admin-box">
        <AdminHeader />
        <div className="admin__title">
          <label className="admin__tilte-label">Have a nice day, admin!</label>
          <label className="admin__tilte-describe">
            Customer management page
          </label>
        </div>

        <div className="info-page__group">
          <div className="info-promote__header">REPLY FEEDBACK</div>

          <div className="info-promote__body">
            {/* <label
              style={{ textAlign: 'center', fontWeight: '600' }}
              className="info-page__label"
            >
             REPLY FEEDBACK
            </label> */}

            <div className="info-promote__box-info">
              <div className="info-promote__col-1">
                <label className="info-promote__label">Subject</label>
                <input
                  type="text"
                  className="info-promote__input"
                  // defaultValue={promote.timeStart}
                />

                <label className="info-promote__label">Reply feedback</label>
                <input
                  type="text"
                  className="info-promote__input"
                  // defaultValue={promote.timeEnd}
                />
              </div>

              <div className="info-promote__col-2">
                {/* <label
                  style={{ fontWeight: 'bold', color: 'red' }}
                  className="info-promote__label"
                >
                  Percentage (%) decrease
                </label>
                <input
                  type="number"
                  className="info-promote__input"
                  defaultValue={promote.percent}
                /> */}

                <label className="info-promote__label">To email:</label>
                <input className="info-promote__input" defaultValue={id} />
              </div>
            </div>
          </div>

          <div className="info-page__footer">
            {/* <button
              className="info-page__btn"
              style={{ backgroundColor: 'red' }}
            //  onClick={handleDelete}
            >
              Delete promotion<i className="ti-close"></i>
            </button> */}
            <button className="info-page__btn" onClick={handleConfirmChange}>
              Confirm<i className="ti-check"></i>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InfoPromote;
