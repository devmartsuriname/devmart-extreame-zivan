import React from 'react';
import { Link } from 'react-router-dom';

export default function PostStyle2({ date, title, thumbnailSrc, href }) {
  return (
    <div className="cs_post cs_style_1 cs_type_1 position-relative overflow-hidden cs_radius_15">
      <Link to={href} className="cs_post_thumb cs_image_blur_effect">
        <img src={thumbnailSrc} alt={title} />
        <img src={thumbnailSrc} alt={title} />
      </Link>
      <div className="cs_post_overlay h-100 w-100 position-absolute start-0 bottom-0" />
      <div className="cs_post_info position-absolute w-100 start-0 bottom-0 d-flex flex-column justify-content-end">
        <span className="cs_posted_by">{date}</span>
        <div className="cs_height_10 cs_height_lg_5" />
        <h2 className="cs_post_title cs_fs_29 cs_white_color mb-0">
          <Link to={href}>{title}</Link>
        </h2>
      </div>
    </div>
  );
}
