import React from 'react';
import { Link } from 'react-router-dom';

export default function PricingTable({
  title,
  subTitle,
  price,
  currency,
  features,
  btnLink,
  btnText,
  timeline,
  popular,
}) {
  return (
    <div className="cs_pricing_table cs_style1 cs_radius_15">
      <h2 className="cs_pricing_title cs_fs_29 cs_semibold">
        {title} {popular && <span>Popular</span>}
      </h2>
      <div className="cs_pricing_info">
        <div className="cs_price">
          <h3 className="cs_accent_color cs_fs_50">
            {currency}
            {price}
          </h3>
          <span className="cs_accent_color cs_medium">
            {timeline && `/${timeline}`}
          </span>
        </div>
        <div className="cs_price_text cs_gray_color_2">{subTitle}</div>
      </div>
      <ul className="cs_pricing_feature cs_mp0 cs_primary_font cs_fs_21">
        {features?.map((item, index) => (
          <li key={index}>
            <span className="cs_feature_icon cs_accent_color">
              <img src="/images/icons/check.svg" alt="Icon" />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="cs_pricing_btn_wrap">
        <Link to={btnLink} className="cs_btn cs_style_1 cs_white_color">
          {btnText}
        </Link>
      </div>
    </div>
  );
}
