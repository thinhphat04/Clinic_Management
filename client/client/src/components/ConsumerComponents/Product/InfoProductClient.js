import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/info-product.css";
import { Breadcrumbs, Footer, Nav } from "../Common";
import { Toast, handleLoadingPage } from "../../Common";
import axios from "axios";

const InfoProductClient = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const { name } = useParams();
  const [imageList, setImageList] = useState([]);
  const [option, setOption] = useState([]);
  const [optionEdit, setOptionEdit] = useState("");
  const [color, setColor] = useState([]);
  const [colorEdit, setColorEdit] = useState([]);
  const [priceEdit, setPriceEdit] = useState(0);
  const [promotes, setPromotes] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Clinic Online | " + name;
    // console.log("name:: ", name);
    const fetchAPIs = () => {
      fetch("https://localhost:7096/api/Products/search/" + name)
        .then((res) => res.json())
        .then((data) => {
          if (!data) {
            window.alert("Sản phẩm hiện không có sẵn hoặc đã bị xóa");
            handleLoadingPage(999);
            return;
          }
          setProduct(data[0]);
        });
    };
    fetchAPIs();
  }, []);
  // console.log("product:: ", comments);

 
  useEffect(() => {
    const fetchAPIs = () => {
      fetch("https://localhost:7096/api/Products/" + product.product_type)
        .then((res) => res.json())
        .then((data) => {
          // console.log("ABCDproducttype:: ", product.product_type);
          setProducts(data);
          setLoading(false);
        });


        fetch("https://localhost:7096/api/Feedback")
        .then((res) => res.json())
        .then((data) => {
           console.log("dataABCD:: ", data);
          setComments(data);
          setLoading(false);  
        });
    };
    fetchAPIs();
  }, [product.product_type]);



  console.log("productAAAA: ", product);

  console.log("comments:: ", comments)

  useEffect(() => {
    // show các khuyến mãi dành cho sản phẩm
    var indexPromote = 1;
    promotes.map((promote, index) => {
      const promoteElement = document.querySelectorAll(
        ".info-product__detail-promote-item"
      )[index];
      const promoteIndex = promoteElement.querySelector(
        ".info-product__detail-promote-item-index"
      );
      products.map((product, i) => {
        if (name === product.product_name) {
          if (
            String(promote.apply)
              .toLowerCase()
              .includes(String(product.type).toLowerCase())
          ) {
            promoteIndex.innerHTML = `<span>${indexPromote}</span>`;
            promoteElement.style.display = "flex";
            indexPromote++;
          }
        }
      });
    });

    // show thông tin sản phẩm tương tự
    products.map((p, index) => {
      const infoProductSimilar = document.querySelectorAll(
        ".product__sell-item"
      )[index];
      if (p.type === product.type) {
        infoProductSimilar.style.display = "block";
      }
    });

    // show thông tin đánh giá sản phẩm
    comments.map((comment, index) => {
      const infoVote = document.querySelectorAll(".info-product__review-item")[
        index
      ];
      console.log("product.product_id:: ", product.product_id);
      console.log("comment.productId:: ", comment.productId);
      if (product.product_id === comment.productId) {
        infoVote.style.display = "block";
      }
    });

    handleFormatCrumbs();
   // handleFeedbackEmpty();
  });

  const handleFormatCrumbs = () => {
    const crumbLinks = document.querySelectorAll(".crumb-link");
    crumbLinks.forEach((crumbLink) => {
      if (crumbLink.innerHTML.includes("%")) {
        crumbLink.style.display = "none";
      }
    });
  };

  const handleFeedbackEmpty = () => {
    const feedbackGroup = document.querySelectorAll(
      ".info-product__review-item-feedback"
    );
    feedbackGroup.forEach((feedbackItem, index) => {
      const feedbackContent = feedbackItem.querySelector(
        ".info-product__review-item-feedback-content"
      );
      if (feedbackContent.textContent === "")
        feedbackItem.style.display = "none";
    });
  };

  const handleFormatStarProduct = (starOfProduct) => {
    if (starOfProduct < 1) {
      return `☆☆☆☆☆`;
    } else if (starOfProduct < 2) {
      return `★☆☆☆☆`;
    } else if (starOfProduct < 3) {
      return `★★☆☆☆`;
    } else if (starOfProduct < 4) {
      return `★★★☆☆`;
    } else if (starOfProduct < 5) {
      return `★★★★☆`;
    } else {
      return `★★★★★`;
    }
  };

  const handleSelectOption = (optionData, data) => {
    const optionList = document.querySelector(".info-product__detail-option");
    const optionItems = optionList.querySelectorAll(
      ".info-product__detail-option-item"
    );
    document.querySelector(".info-product__detail-current-price").textContent =
      `${Number(data).toLocaleString()} đ`;
    const colorList = document.querySelectorAll(
      ".info-product__detail-option"
    )[1];
    const colorItemPrices = colorList.querySelectorAll(
      ".info-product__detail-option-item-price"
    );
    colorItemPrices.forEach((colorItemPrice, i) => {
      colorItemPrice.innerHTML = `${Number(data).toLocaleString()} đ`;
    });
    optionItems.forEach((optionItem, index) => {
      optionItem.onclick = () => {
        const optionItemActive = optionList.querySelector(
          ".info-product__detail-option-item.info-product__detail-option-item--active"
        );
        if (optionItemActive) {
          optionItemActive.classList.remove(
            "info-product__detail-option-item--active"
          );
          optionItem.classList.add("info-product__detail-option-item--active");
        } else {
          optionItem.classList.add("info-product__detail-option-item--active");
        }
      };
    });
    setOptionEdit(optionData);
    setPriceEdit(data);
  };

  const handleSelectColor = (data) => {
    const colorList = document.querySelectorAll(
      ".info-product__detail-option"
    )[1];
    const colorItems = colorList.querySelectorAll(
      ".info-product__detail-option-item"
    );
    colorItems.forEach((colorItem, index) => {
      colorItem.onclick = () => {
        const colorItemActive = colorList.querySelector(
          ".info-product__detail-option-item.info-product__detail-option-item--active"
        );
        if (colorItemActive) {
          colorItemActive.classList.remove(
            "info-product__detail-option-item--active"
          );
          colorItem.classList.add("info-product__detail-option-item--active");
        } else {
          colorItem.classList.add("info-product__detail-option-item--active");
        }
      };
    });
    setColorEdit(data);
  };

  const changeImage = (fileName) => {
    const imageElement = document.querySelector(".info-product__image-primary");
    imageElement.style.backgroundImage = `url(${fileName})`;
    imageElement.style.animation = `toRight 0.2s linear`;

    const imgItems = document.querySelectorAll(".info-product__image-item");
    imgItems.forEach((imgItem, index) => {
      imgItem.onclick = () => {
        const imgItemActive = document.querySelector(
          ".info-product__image-item.info-product__image-item--active"
        );
        if (imgItemActive) {
          imgItemActive.classList.remove("info-product__image-item--active");
          imgItem.classList.add("info-product__image-item--active");
        } else {
          imgItem.classList.add(".info-product__image-item--active");
        }
      };
    });
  };

  const arrayImage = [];
  arrayImage.push(product.imagePrimary, product.product_img);
  imageList.map((imageItem, i) => {
    arrayImage.push(imageItem);
  });

  let indexImageInArray = 0;
  const handleNextImage = () => {
    if (indexImageInArray >= arrayImage.length - 1) indexImageInArray = -1;
    indexImageInArray++;
    const imageElement = document.querySelector(".info-product__image-primary");
    imageElement.style.backgroundImage = `url(${arrayImage[indexImageInArray]})`;
  };
  const handlePrevImage = () => {
    if (indexImageInArray <= 0) indexImageInArray = arrayImage.length;
    indexImageInArray--;
    const imageElement = document.querySelector(".info-product__image-primary");
    imageElement.style.backgroundImage = `url(${arrayImage[indexImageInArray]})`;
  };

  const showSuccessMessage = () => {
    Toast({
      title: "More success",
      message: "Your product has been added to your cart. View now!",
      type: "success",
      duration: 3000,
    });
  };
  const showErrorMessage = () => {
    Toast({
      title: "Unable to add product to cart",
      message: "Please choose all versions and colors of the product!",
      type: "error",
      duration: 3000,
    });
  };
  const showErrorNotLoginMessage = () => {
    Toast({
      title: "You have not logged in to Clinic Online",
      message: "Please log in to use this feature!",
      type: "error",
      duration: 4000,
    });
  };

  const handleClickAddToCart = () => {
    const elementClickActive = document.querySelector(
      ".info-product__detail-option-item.info-product__detail-option-item--active"
    );
    // if (elementClickActive) {
      
      if (!window.localStorage.getItem("auth")) {
        showErrorNotLoginMessage();
        return;
      }
      console.log("KHAIproduct:: ", product.product_id);
      console.log("KHAIusser:: ",JSON.parse(window.localStorage.getItem("auth")).id );
      console.log("KHAIproductquantity:: ", 1);

      axios.post(
          "https://localhost:7096/api/Cart",          
          {
            user_id : String(JSON.parse(window.localStorage.getItem("auth"))?.id),
            product_id: String(product.product_id),
            product_quantity: 1
          }
        )
        .then((response) => {
          console.log("response::: ", response);   
          showSuccessMessage();
          handleLoadingPage(1);
          window.setTimeout(() => {
            window.location.href ='/cart';
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
    // } else {
    //   // showErrorMessage();
    // }
  };

  const handleClickBuyNow = () => {
    const elementClickActive = document.querySelector(
      ".info-product__detail-option-item.info-product__detail-option-item--active"
    );
    if (elementClickActive) {
      if (!window.localStorage.getItem("auth")) {
        showErrorNotLoginMessage();
        return;
      }

      axios
        .put(
          "https://server-Clinic Online.onrender.com/api/users/add-product-to-cart-user/" +
            JSON.parse(window.localStorage.getItem("auth")).user._id,
          {
            imageLink: product.product_img,
            productName: name,
            option: optionEdit,
            color: colorEdit,
            price: priceEdit,
            percent: product.percent,
            quantity: 1,
            voted: false,
          }
        )
        .then((response) => {
          handleLoadingPage(1);
          window.setTimeout(() => {
            window.location.href = "/cart/info";
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      showErrorMessage();
    }
  };

  // console.log("productINFO:: ", product.product_type);

  // var product = product[0]

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div id="toast-with-navbar"></div>
      <div className="container">
        <div className="grid wide">
          <div className="info-product__container">
            <div className="info-product__header">
              <label className="info-product__header-name">{name}</label>
              <p className="info-product__header-star">
                {handleFormatStarProduct(product.product_star)}
              </p>
              {/* <p className="info-product__header-voters">
                ({product.voter} người bình chọn)
              </p> */}
            </div>

            <div className="info-product__box">
              <div className="info-product__image-group">
                <div
                  className="info-product__image-primary"
                  style={{
                    backgroundImage: `url(${product.product_img})`,
                    backgroundPosition: "center center",
                    backgroundColor: "transparent",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                  }}
                >
                  <div
                    className="info-product__image-pre-btn--prev"
                    onClick={handlePrevImage}
                  >
                    <i className="fa fa-arrow-left"></i>
                  </div>
                  <div
                    className="info-product__image-pre-btn--next"
                    onClick={handleNextImage}
                  >
                    <i className="fa fa-arrow-right"></i>
                  </div>
                </div>
                <label className="info-product__image-label">
                Images of the product
                </label>
                <ul className="info-product__image-list">
                  <li
                    style={{
                      backgroundImage: `url(${product.product_img})`,
                      backgroundPosition: "center center",
                      backgroundColor: "transparent",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "contain",
                    }}
                    className="info-product__image-item info-product__image-item--active"
                    onClick={(e) => {
                      changeImage(product.product_img);
                    }}
                  ></li>

                  {/* {loading ? (
                    <p>Đang kết nối đến server ... </p>
                  ) : (
                    imageList.map((image, i) => (
                      <li
                        key={i}
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundPosition: "center center",
                          backgroundColor: "transparent",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                        }}
                        className="info-product__image-item"
                        onClick={(e) => {
                          changeImage(image);
                        }}
                      ></li>
                    ))
                  )} */}
                </ul>
                <div className="info-product__policy">
                  <label className="info-product__policy-header">
                  PRODUCT POLICY
                  </label>
                  <div className="info-product__policy-item">
                    <i className="info-product__policy-item-icon fa fa-wrench"></i>
                    <p className="info-product__policy-item-content">
                    Warranty genuine{" "}
                      <span style={{ fontWeight: "bold" }}>12 months </span> in
                       Authorized warranty center of our store system
                       Clinic Online
                      <button className="info-product__policy-item-btn">
                        (See details)
                      </button>
                    </p>
                  </div>
                  <div className="info-product__policy-item">
                    <i className="info-product__policy-item-icon fa fa-refresh"></i>
                    <p className="info-product__policy-item-content">
                      <span style={{ fontWeight: "bold" }}>1 SWITCH 1 </span>in
                       within the first 30 days of use and{" "}
                      <span style={{ fontWeight: "bold" }}>
                      WHAT IS BREAKED IS CHANGED{" "}
                      </span>{" "}
                      within 90 days
                      <button className="info-product__policy-item-btn">
                        (See details)
                      </button>
                    </p>
                  </div>
                  <div className="info-product__policy-item">
                    <i className="info-product__policy-item-icon fa fa-retweet"></i>
                    <p className="info-product__policy-item-content">
                    Policy{" "}
                      <span style={{ fontWeight: "bold" }}>
                      Trade-in is born{" "}
                      </span>{" "}
                      Always support for every product
                      <button className="info-product__policy-item-btn">
                        (See details)
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="info-product__detail">
                <label className="info-product__detail-label info-product__detail-label-price">
                Product price:
                </label>
                <div className="info-product__detail-price">
                  <label className="info-product__detail-current-price">
                    {Number(product.product_price || 0).toLocaleString()} đ
                  </label>
                  <label className="info-product__detail-old-price">
                    {(
                      (Number(product.product_price || 0) *100) / product.product_percent
                    ).toLocaleString()}{" "}
                    đ
                  </label>
                  <label className="info-product__detail-percent">
                    -{product.product_percent || 0}%
                  </label>
                </div>
                <label className="info-product__detail-installment">
                  <i className="info-product__detail-installment-icon fa fa-tag"></i>
                  Installment 0%
                </label>
                <div className="info-product__detail-option">
                  <p
                    className="info-product__policy-item-content"
                    style={{ marginRight: "10px" }}
                  >
                    {product.product_description}
                  </p>
                </div>
                <div className="info-product__detail-promote">
                  <label className="info-product__detail-promote-label">
                    <i className="info-product__detail-promote-label-icon fa fa-gift"></i>
                    OTHER ATTRACTIVE OFFERS
                  </label>
                  {loading ? (
                    <p>Connecting to the server... </p>
                  ) : (
                    promotes.map((promote, i) => (
                      <div
                        className="info-product__detail-promote-item"
                        key={i}
                      >
                        <p className="info-product__detail-promote-item-index">
                          {i + 2}
                        </p>
                        <label className="info-product__detail-promote-item-content">
                          {promote.name}
                          <button className="info-product__detail-promote-item-content-btn">
                            (See details)
                          </button>
                        </label>
                      </div>
                    ))
                  )}
                </div>
                <div className="info-product__detail-payment">
                  <button
                    className="info-product__detail-payment-btn"
                    onClick={handleClickBuyNow}
                  >
                    BUY NOW
                    <p className="info-product__detail-payment-describe">
                    Pick up in store or deliver to your door
                    </p>
                  </button>
                  <button
                    className="info-product__detail-payment-btn-cart"
                    onClick={handleClickAddToCart}
                  >
                    <i className="info-product__detail-payment-btn-icon fa fa-cart-plus"></i>
                    Add to cart
                    <p className="info-product__detail-payment-describe">
                    Add products to buy later
                    </p>
                  </button>
                  <button className="info-product__detail-payment-btn-installment">
                    <i className="info-product__detail-payment-btn-icon fa fa-credit-card"></i>
                    BUY IN 0% INSTALLMENTS
                    <p className="info-product__detail-payment-describe">
                    Online review in 5 minutes
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div className="info-product__similar">
              <div className="info-product__similar-label">
              SIMILAR PRODUCT
              </div>
              <ul className="info-product__similar-list">
                {loading ? (
                  <p>Connecting to the server... </p>
                ) : (
                  products.map((product, index) => (
                    <li
                      className="product__sell-item"
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/product/${product.product_type}/${product.product_name}`;
                      }}
                    >
                      <img
                        src={product.product_img}
                        className="product__sell-item-img"
                      ></img>
                      <label className="product__sell-item-label">
                        {product.product_name}
                      </label>
                      <label className="product__sell-item-price">
                        {Number(product.product_price).toLocaleString()} ₫
                      </label>
                      <span className="product__sell-item-percent">
                        {(
                          Number(product.product_price) * 1.065
                        ).toLocaleString()}
                        đ
                      </span>
                      <label className="product__sell-item-sold">
                      Evaluate:
                        <span className="product__sell-item-star">
                          {handleFormatStarProduct(product.product_star)}
                        </span>
                      </label>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="info-product__review-container">
              <div className="info-product__rating-box">
                <label className="info-product__rating-label">
                PRODUCT REVIEWS
                </label>
                <p className="info-product__rating-star">
                  {Number(product.product_star).toFixed(1)}/5
                </p>
                <p className="info-product__rating-star-icon">
                  {handleFormatStarProduct(Number(product.product_star))}
                </p>
                {/* <p className="info-product__rating-number">
                  {product.voter} lượt đánh giá
                </p> */}
              </div>

              <ul className="info-product__review-list">
                <label className="info-product__review-label">Comment</label>
                {comments.map((comment, index) => (
                  <li className="info-product__review-item" key={index}>
                    <div className="info-product__review-item-title">
                      <div className="info-product__review-item-info">
                        <div
                          className="info-product__review-item-avatar"
                          style={{
                            backgroundImage: `url("https://i.pinimg.com/564x/8f/a2/78/8fa2789888f34e2b1013964df0c5738c.jpg")`,
                          }}
                        ></div>
                        <div className="info-product__review-item-fullname">
                          {comment.fullname}
                        </div>
                      </div>
                      {/* <p className="info-product__review-item-time">
                        <i className="info-product__review-item-time-icon fa fa-clock"></i>
                        {comment.feedbackId}
                      </p> */}
                    </div>

                    <div className="info-product__review-item-vote">
                      <label className="info-product__review-item-vote-title">
                      Product reviews:
                        <span className="info-product__review-item-vote-start">
                          {handleFormatStarProduct(comment.rating)}
                        </span>
                      </label>
                    </div>

                    <div className="info-product__review-item-feedback">
                      <label className="info-product__review-item-feedback-title">
                      Product reviews:
                      </label>
                      <div className="info-product__review-item-feedback-box">
                        <p className="info-product__review-item-feedback-content">
                          {comment.descrisption}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <p className="app-copyright">
        ©️ Copyright belongs to Clinic Online - 2023 <br />
        Address: 391 Nam Ky Khoi Nghia, Vo Thi Sau ward. District 3, Ho Chi Minh
        City.
      </p>
    </>
  );
};

export default InfoProductClient;