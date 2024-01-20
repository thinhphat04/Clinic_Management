import React, { useEffect } from 'react';
import { Breadcrumbs, Footer, Nav } from '../Common';
import './policy.css';

const PolicyPage = () => {
  useEffect(() => {
    document.title = 'ShopTECH | Chính sách và điều kiện';
  }, []);

  return (
    <>
      <Nav />
      <Breadcrumbs />
      <div className="grid wide">
        <div className="container">
          <div className="policy__container">
            <div className="policy__box">
              <h2 className="policy__header">Product returns policy reforms</h2>
              <p className="policy__describe">
              Return policy when purchasing at Clinic Online
              </p>
              <p className="policy__content">
              In order to bring convenience and satisfaction to customers, ShopTech
                 Have appropriate policies when customers need to exchange/return
                 product. We hope the products customers have chosen are
                 Most satisfactory product. Product exchange/return is subject to terms
                 For specific conditions, please refer to the detailed information below
                 below:{' '}
              </p>
              <ol className="policy__content-group" type="I">
                <li
                  style={{
                    fontWeight: 600,
                    fontSize: '2rem',
                    lineHeight: '2.4rem',
                    padding: '6px 0',
                  }}
                >
                  Exchange/return regulations
                </li>
                <ol type="1">
                  <li>
                    <label className="policy__title">
                    Cases of exchange/return of goods
                    </label>
                    <p>
                      <strong>Delivered goods have technical errors:</strong>
                    </p>
                    <p className="policy__content">
                    The product is only considered a technical defect when confirmed by
                       Technical Center or Product Warranty Center
                       Products. When you have problems with a product ordered at
                       ShopTECH, please perform the following steps:
                    </p>
                    <ul type="disc" className="policy__list-disc">
                      <li>
                        <p>
                        Step 1: Check yourself how to use the product
                           Operations are guided in the “User Manual”
                           included with each product (if any).
                        </p>
                      </li>
                      <li>
                        <p>
                        Step 2: Please contact the technical/security center
                           Office: HOTLINE 1800 6063 or email: info@cliniconline.vn
                           For some typical product lines, you have
                           Warranty information can be found at: Store system
                           nearest.
                        </p>
                      </li>
                      <li>
                        <p>
                        Step 3: Within 07 days from the date of receipt, if
                           You receive confirmation from the Technical Center or
                           The product's warranty center states that the product is defective
                           technique.
                        </p>
                      </li>
                      <li>
                        <p>
                          {' '}
                          If you cannot contact the product's technical/warranty center, please contact ShopTech immediately, HOTLINE: 1800 6063
                        </p>
                      </li>
                    </ul>
                    <p className="policy__content">
                    According to our experience, more than half of the products are refundable
                       Returned due to technical error after being checked by the technical department
                       All inspections assess that the product is in its used condition
                       perfect use. So to save time and convenience
                       For your convenience, please read the user manual carefully or
                       Contact our technical support department directly for consultation
                       product to ensure that the product is assembled, connected and
                       operate correctly before sending the goods back to Clinc Online.
                    </p>
                    <p>
                      <strong>
                      Delivered goods are broken, have wrong content or are missing
                      </strong>
                    </p>
                    <p className="policy__content">
                    ShopTECH encourages customers to check status
                       External condition of containers and products before processing
                       audit to ensure that goods are delivered in the correct category,
                       Quantity, color according to order and party status
                       The outside is not affected (broken/scratched). If you meet school
                       In this case, please refuse to receive the goods and/or report
                       immediately contact customer support HOTLINE: 1800 6063 to
                       We have a timely treatment plan.
                    </p>
                    <p className="policy__content">
                    In case the customer has paid, received the goods and
                       Later, it is discovered that the goods are broken, have incorrect content or otherwise
                       Out of stock, please take a photo of the product and send it to your mailbox
                       info@shoptech.vn for our support with the next steps
                       according to exchange/return or send the missing product to you
                       guest.
                    </p>
                    <p className="policy__content">
                    After 48 hours from when you receive the goods, ShopTech has the right
                       refuse to support complaints according to the above content.
                    </p>
                  </li>
                  <li>
                    <label className="policy__title">
                      {' '}
                      Exemption/return list (products not eligible for return)
                    </label>

                    <ul type="disc" className="policy__list-disc">
                      <li>
                        <p>
                        Promotional products (with prices reduced by 10% or more compared to
                           original price), same price goods.
                        </p>
                      </li>

                      <li>
                        <p>Returned products are not due to technical errors. </p>
                      </li>

                      <li>
                        <p>Accessory. </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <label className="policy__title">Conditions of exchange</label>
                    <p className="policy__content">
                    Please read carefully the regulations stated herein
                       Our return policy ensures that the product
                       The product/goods requested to be exchanged/returned meets all conditions
                       following facts:
                    </p>
                    <ul type="disc" className="policy__list-disc">
                      <li>
                        <p>
                        Products to be returned must be purchased by the customer
                           online or buy at the store system.
                        </p>
                      </li>
                      <li>
                        <p>The packaging is intact and the packaging is not dented.</p>
                      </li>
                      <li>
                        <p>
                        Warranty stamp/card, brand stamp, detailed instructions
                           Magic and accompanying gifts (if any) etc. must be present
                           complete and intact.
                        </p>
                      </li>
                      <li>
                        <p>
                        There is no data in the product that has a storage device.
                        </p>
                      </li>
                      <li>
                        <p>
                        Not dirty, scratched, broken, damaged, or have strange smells
                           or shows signs of having been washed or used.
                        </p>
                      </li>
                      <li>
                        <p>
                        Goods can only be exchanged for a similar product
                           same (same model), another product (same brand) has
                           equivalent value or lower value.
                        </p>
                      </li>
                      <li>
                        <p>
                        You are required to have your purchase invoice when exchanging
                           row. The company does not accept exchanges otherwise
                           Attach the above documents.
                        </p>
                      </li>
                      <li>
                        <p>
                        Parts, details, accessories, manuals
                           Appliances, accompanying gifts (if any), etc. must be complete
                           and has no signs of use.
                        </p>
                      </li>
                      <li>
                        <p>Each order can only be exchanged once.</p>
                      </li>
                      <li>
                        <p>
                        Products can be returned if they do not meet the conditions
                           mentioned above will be automatically returned to the given address
                           registered by you in your order.
                        </p>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <label className="policy__title">Exchange time</label>
                    <p className="policy__content">
                    Time limit for returning goods purchased at the store system
                       For goods in the store system, it takes 3-7 days.
                    </p>
                    <p className="policy__content">
                    For customers ordering at ShopTech's website, time
                       Return time is 3-7 days from the date you receive it
                       product.
                    </p>
                  </li>
                  <li>
                    <label className="policy__title">Return costs</label>
                    <p className="policy__content">
                    For products returned due to technical errors, customers
                       There will be free returns and free shipping
                       The location listed on the return request form.
                    </p>
                    <p className="policy__content">
                    For products returned due to subjective opinions from customers,
                       You will pay two-way shipping fees.{' '}
                    </p>
                  </li>
                </ol>
                <li>
                  <lable
                    style={{
                      fontWeight: 600,
                      fontSize: '2rem',
                      lineHeight: '2.4rem',
                      padding: '6px 0',
                    }}
                  >
                    Return and refund regulations
                  </lable>
                  <p className="policy__content">
                  Depending on the reason for returning the product and the quality assessment results
                     quantity, we will have appropriate return methods
                  </p>
                  <ol type="1">
                    <li>
                      <label className="policy__title">Change to new product</label>
                      <ul type="disc" className="policy__list-disc">
                        <li>
                          <p>
                          This form is applicable to all cases
                             The product is damaged due to manufacturer's error. We
                             will exchange for you a new product of the same design
                             (same product code, same size, same brand...).
                          </p>
                        </li>
                        <li>
                          <p>
                          In case our system is out of code
                             products as in your order, we
                             will exchange for you another product (same brand
                             goods) have equivalent value.
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <label className="policy__title">Refund</label>
                      <ul type="disc" className="policy__list-disc">
                        <li>
                          <p>
                          Refunds (applies only to product cases
                             defective products without replacement products). Completed work
                             Money in this case will be carried through
                             Bank transfer according to account information
                             You provide.
                          </p>
                        </li>
                        <li>
                          <p>
                          Currently, we do not apply refunds
                             Cash at the office for all cases
                             exchange/return product.
                          </p>
                        </li>
                        <li>
                          <p>
                          Processing time: If customer refund request
                             Meet all exchange/return conditions, hol.com.vn
                             will carry out refund procedures for customers within
                             within 30 days from the date of receipt of financial information
                             your account.
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>

            <div className="policy__box">
              <h2 className="policy__header">Shipping policy</h2>
              <ol>
                <li>
                  <label className="policy__title">
                  Mode of transportation & delivery of goods
                  </label>
                  <p className="policy__content">
                  When purchasing at ShopTech, you can choose one
                     in the following forms of transportation and delivery:
                  </p>
                  <ul type="disc" className="policy__list-disc">
                    <li>
                      <p>
                      Clinic Online directly ships and delivers products directly to customers
                         row.
                      </p>
                    </li>
                    <li>
                      <p>
                      Clinic Online delivers goods to customers through suppliers
                         provide delivery services.
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <label className="policy__title">
                  Cost and delivery time
                  </label>
                  <ol type="1">
                    <li>
                      <p>
                      Clinic Online directly ships and delivers products directly to customers
                         row
                      </p>
                      <ul type="disc" className="policy__list-disc">
                        <li>
                          <p>Free delivery: Distance up to 300km.</p>
                        </li>
                        <li>
                          <p>
                          Delivery time frame is from 8:00 a.m. to 9:00 p.m. daily.
                          </p>
                        </li>
                        <li>
                          <p>
                          Delivery costs range from 10$ to 500$
                          </p>
                        </li>
                      </ul>
                    </li>
                    <li>
                    Delivery via delivery service provider
                      <p>
                        <strong>Delivery method:</strong>
                      </p>
                      <ul type="disc" className="policy__list-disc">
                        <li>
                          <p>
                          Clinic Online will select a transfer service provider
                             issued for delivery to the Customer.
                          </p>
                        </li>
                        <li>
                          <p>
                          Delivery time to customer's requested location
                             according to supplier's delivery time targets
                             service level.
                          </p>
                        </li>
                        <li>
                          <p>
                          For convenience and to arrange pick-up time and location
                             suitable products, please proactively contact us
                             Contact the intermediary unit to receive the goods.
                          </p>
                        </li>
                      </ul>
                      <p className="policy__content">
                        <strong>Note:</strong>
                        Before delivering the goods to the shipping intermediary,
                         ShopTech can seal and weigh goods; Therefore,
                         Please and responsibly check the seal
                         and carefully inspect the goods before receiving them.
                      </p>
                      <p>
                        <strong>Sealing specifications:</strong>
                      </p>
                      <ul type="disc" className="policy__list-disc">
                        <li>
                          <p>
                          All Clinic Online goods are sent through intermediaries
                             are weighed and sealed before
                             send.
                          </p>
                        </li>
                        <li>
                          <p>
                          The weight of the consignment, including the packaging, is recorded
                             clearly on the box with a whiteboard marker.
                          </p>
                        </li>
                        <li>
                          <p>
                          Sealed paper with the Company's round seal or
                             apply Clinic Online branded adhesive tape.
                          </p>
                        </li>
                        <li>
                          <p>
                          In case you discover paper
                             The seal is broken, or shows signs of being opened before
                             that and or the goods (including the box) are not heavy enough
                             Quantity listed on the box:
                          </p>
                        </li>
                        <li>
                          <p>
                          You make a record immediately with the intermediary unit
                             transport.
                          </p>
                        </li>
                        <li>
                          <p>
                          Notify Clinic Online sales staff immediately
                             have a timely solution.
                          </p>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </li>
              </ol>
            </div>
            <div className="policy__box">
              <h2 className="policy__header">Warranty Policy</h2>
              <ol>
                <li>
                  <label className="policy__title">Warranty conditions</label>
                  <p className="policy__content">
                  The product meets the following conditions:
                  </p>
                  <ul type="disc" className="policy__list-disc">
                    <li>
                      <p>The product still has a warranty period</p>
                    </li>
                    <li>
                      <p>
                      Technically defective products fall within the standards of the Manufacturer & Distributor
                      </p>
                    </li>
                    <li>
                      <p>
                      Serial number/ IMEI/ Service Tag on the product must remain
                         clearly intact
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <label className="policy__title">Warranty Policy</label>
                  <ul type="disc" className="policy__list-disc">
                    <li>
                      <p>
                      All products sold by Clinic Online are warranted
                         according to the manufacturer's regulations
                      </p>
                    </li>
                    <li>
                      <p>
                      All damaged products will be sent to the manufacturer
                         or a unit authorized by the manufacturer to provide warranty
                         accordance with the manufacturer's warranty policy.
                         Clinic Online is not responsible if the manufacturer and/or
                         or the manufacturer's authorized unit refuses the warranty.
                      </p>
                    </li>
                    <li>
                      <p>
                        
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <label className="policy__title">
                  Clinic Online's warranty center system
                  </label>
                  <ul type="disc" className="policy__list-disc">
                    <li>
                      <p>
                        <strong>Southern Clinic Online Warranty Center</strong>
                        <br />
                        Address: 292/15 Cach Mang Thang Tam, Ward 10, District 3,
                         Ho Chi Minh City
                        <br />
                        Phone: 1800 6865
                        <br />
                        Opening hours: 08:00 - 18:00 every day of the week
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Central Clinic Online Warranty Center</strong>
                        <br />
                        Address: 2nd Floor, 14.16.18 Nguyen Van Linh, Ward Nam
                         Duong, Hai Chau District, Da Nang City
                        <br />
                        Phone: 1800 6865
                        <br />
                        Opening hours: 08:00 - 18:00 from Monday to Saturday (Monday
                         (Sunday off)
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Northern Clinic Online Warranty Center</strong>
                        <br />
                        Address: 62 Tran Dai Nghia, Dong Tam Ward, Hai Ba District
                         Trung, Hanoi City
                        <br />
                        Phone: 1800 6865
                        <br />
                        Opening hours: 08:00 - 18:00 from Monday to Saturday (Monday
                         (Sunday off)
                      </p>
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="policy__box">
              <h2 className="policy__header">Warranty location</h2>
              <iframe
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  margin: '10px',
                  width: 'calc(100% - 20px)',
                }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0886458054415!2d106.7142257757363!3d10.804522458673446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175293dceb22197%3A0x755bb0f39a48d4a6!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBHaWFvIFRow7RuZyBW4bqtbiBU4bqjaSBUaMOgbmggUGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1689474234718!5m2!1svi!2s"
                width="100%"
                height="500"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PolicyPage;
