import React from 'react';
import { Link } from 'react-router-dom';

export default function PostStyle3({ date, title, thumbnailSrc, href }) {
  return (
    <div className="cs_post cs_style_2">
      <Link
        to={href}
        className="cs_post_thumb cs_radius_15 overflow-hidden cs_image_blur_effect"
      >
        <img src={thumbnailSrc} alt={title} />
        <img src={thumbnailSrc} alt={title} />
      </Link>
      <div className="cs_post_right">
        <span className="cs_posted_by">{date}</span>
        <h2 className="cs_post_title cs_fs_21 mb-0">
          <Link to={href}>{title}</Link>
        </h2>
      </div>
    </div>
  );
}
