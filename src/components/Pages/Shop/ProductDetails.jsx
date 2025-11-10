import React, { useState } from 'react';
import Spacing from '../../Spacing';
import SectionHeadingStyle3 from '../../SectionHeading/SectionHeadingStyle3';
import Ratings from '../../Ratings';
import FormateNumber from '../../../helpers/FormateNumber';
import ImageView from '../../ShopComponents/ImageView';
import CartAmountToggle from '../../ShopComponents/CartAmountToggle';
import { NavLink } from 'react-router-dom';
import { pageTitle } from '../../../helpers/PageTitle';

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState(3);
  const handleTabClick = tabNumber => {
    setActiveTab(tabNumber);
  };
  pageTitle('Product Details');
  return (
    <>
      <Spacing lg="70" md="70" />
      <Spacing lg="140" md="80" />
      <SectionHeadingStyle3
        title="Product details"
        subTitle="Shop"
        variant="text-center"
        href="/shop"
      />
      <Spacing lg="75" md="60" />
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <ImageView />
          </div>
          <div className="col-lg-6">
            <div className="cs_single-product-details">
              <h2>Awesome men t-shirt</h2>
              <div className="cs_single_product-price_review">
                <div className="cs_single_product_price cs_accent_color cs_primary_font cs_semi_bold">
                  <FormateNumber number={20} />
                </div>
                <Ratings ratingNumber={4.5} />
              </div>
              <div className="cs_height_25 cs_height_lg_25" />
              <div className="cs_single-product-details-text">
                <p>
                  Our t-shirt features a classic design with a crew neckline and
                  short sleeves, making it a versatile piece that can be dressed
                  up or down. The relaxed fit is perfect for all body types,
                  providing ample room for movement and ensuring a flattering
                  silhouette. <br />
                  <br />
                  Available in a range of colors, our men's t-shirt is the
                  perfect choice for any occasion. Wear it with jeans and
                  sneakers for a casual look or dress it up with slacks and a
                  blazer for a more formal event. No matter how you style it,
                  you're sure to look and feel your best. So why wait? Add our
                  men's t-shirt to your wardrobe today and experience the
                  ultimate combination of comfort and style.
                </p>
              </div>
              <div className="cs_height_35 cs_height_lg_35" />
              <div className="cs_quantity_and_btn">
                <CartAmountToggle quantity={1} />
                <NavLink
                  to="/shop/cart"
                  className="cs_product_btn cs_semi_bold"
                >
                  Add to cart
                </NavLink>
              </div>
              <div className="cs_height_40 cs_height_lg_30" />
              <ul className="cs_single_product_info">
                <li>
                  <b>SKU: </b>0215552
                </li>
                <li>
                  <b>Categories: </b>Graphics
                </li>
                <li>
                  <b>Tags: </b>Design, Brand, Clothing
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Spacing lg="100" md="60" />
        <div className="cs_product_meta_info">
          <div className="cs_tabs cs_style1">
            <ul className="cs_tab_links cs_product_tab cs_primary_font cs_semi_bold">
              <li
                className={`tab-item ${activeTab === 1 ? 'active' : ''}`}
                onClick={() => handleTabClick(1)}
              >
                <button type="button">Description</button>
              </li>
              <li
                className={`tab-item ${activeTab === 2 ? 'active' : ''}`}
                onClick={() => handleTabClick(2)}
              >
                <button type="button">Additional information</button>
              </li>
              <li
                className={`tab-item ${activeTab === 3 ? 'active' : ''}`}
                onClick={() => handleTabClick(3)}
              >
                <button type="button">Review (1)</button>
              </li>
            </ul>
            <Spacing lg="40" md="40" />
            <div className="cs_tab_body">
              {activeTab === 1 && (
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum sagittis orci ac odio dictum tincidunt. Donec ut
                  metus leo. Class aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos. Sed luctus, dui eu
                  sagittis sodales, nulla nibh sagittis augue, vel porttitor
                  diam enim non metus. Vestibulum aliquam augue neque. Phasellus
                  tincidunt odio eget ullamcorper efficitur. Cras placerat ut
                  turpis pellentesque vulputate. Nam sed consequat tortor.
                  Curabitur finibus sapien dolor. Ut eleifend tellus nec erat
                  pulvinar dignissim. Nam non arcu purus. Vivamus et massa
                  massa.
                </div>
              )}

              {activeTab === 2 && (
                <div>
                  <table className="m-0">
                    <tbody>
                      <tr>
                        <td>Color</td>
                        <td>Blue, Gray, Green, Red, Yellow</td>
                      </tr>
                      <tr>
                        <td>Size</td>
                        <td>Large, Medium, Small</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                </div>
              )}

              {activeTab === 3 && (
                <div>
                  <ul className="cs_client_review_list">
                    <li>
                      <div className="cs_client_review">
                        <div className="cs_review_media">
                          <div className="cs_review_media_thumb">
                            <img src="/images/shop/avatar.png" alt="Avatar" />
                          </div>
                          <div className="cs_review_media_right">
                            <Ratings ratingNumber={4.5} smallSize />
                            <p className="m-0 cs_primary_color cs_semi_bold">
                              Zhon Abony
                            </p>
                          </div>
                        </div>
                        <div className="cs_review_posted_by">
                          August 12, 2023
                        </div>
                        <div className="cs_review_text">
                          I recently purchased the Zivan T-shirts and I'm
                          thoroughly impressed. The sound quality is
                          exceptional, the wireless connectivity is seamless,
                          and the noise cancellation technology is a standout
                          feature. They're a bit pricey, but well worth the
                          investment. Highly recommend.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Spacing lg="150" md="80" />
    </>
  );
}
