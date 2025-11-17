import React from 'react';
import BlogIcon from '../icons/BlogIcon';
import MailIcon from '../icons/MailIcon';

export default function SectionHeadingStyle3({
  title,
  subTitle,
  variant,
  children,
  shape,
}) {
  return (
    <div className={`cs_section_heading cs_style_3 ${variant ? variant : ''}`}>
      <div className="cs_section_heading_in">
        <div className="cs_section_heading_left">
          <h2
            className="cs_section_title cs_fs_50 mb-0"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        <div className="cs_section_heading_right">
          {children ? (
            children
          ) : (
            <div className="cs_section_subtitle cs_fs_18">
              <div className="cs_section_subtitle_icon cs_center">
                <svg
                  width={44}
                  height={44}
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 13.75L27.5 22L16.5 30.25V13.75Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="cs_section_subtitle_text cs_fs_20 cs_medium">
                {subTitle}
              </div>
            </div>
          )}
        </div>
      </div>
      {shape === 'shape_1' && <div className="cs_shape_1" />}
      {shape === 'shape_2' && <div className="cs_shape_2" />}
      {shape === 'shape_3' && <div className="cs_shape_3" />}
      {shape === 'shape_4' && (
        <div className="cs_shape_4">
          <img src="/images/icons/team_shape.svg" alt="Shape" />
        </div>
      )}
      {shape === 'shape_5' && (
        <div className="cs_shape_5">
          <BlogIcon size={244} />
        </div>
      )}
      {shape === 'shape_6' && (
        <div className="cs_shape_4">
          <MailIcon size={301} />
        </div>
      )}
    </div>
  );
}
import parse from 'html-react-parser';
import Spacing from '../Spacing';
import { Link } from 'react-router-dom';

export default function SectionHeadingStyle3({
  title,
  subTitle,
  variant,
  date,
  avatar,
  avatarLink,
  shape,
  category,
  href,
}) {
  return (
    <div
      className={`cs_section_heading cs_style_1 cs_type_3 ${
        variant ? variant : ''
      }`}
    >
      <div className="container">
        {subTitle && (
          <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0">
            {href ? <Link to={href}>{subTitle}</Link> : subTitle}
          </p>
        )}
        {category && <span className="cs_category">{category}</span>}
        <Spacing lg="20" md="10" />
        <h2 className="cs_section_title cs_fs_68 mb-0">{parse(title)}</h2>
        {date && (
          <div className="cs-post_meta cs-style1 cs-ternary_color">
            <span className="cs-posted_by">{date}</span>
            <Link to={avatarLink} className="cs-post_avatar">
              {avatar}
            </Link>
          </div>
        )}
      </div>
      {shape === 'shape_1' && <div className="cs_shape_1" />}
      {shape === 'shape_2' && <div className="cs_shape_2" />}
      {shape === 'shape_3' && <div className="cs_shape_3" />}
      {shape === 'shape_4' && (
        <div className="cs_shape_4">
          <img src="/images/icons/team_shape.svg" alt="Shape" />
        </div>
      )}
      {shape === 'shape_5' && (
        <div className="cs_shape_5">
          <img src="/images/icons/blog.svg" alt="Icon" />
        </div>
      )}
      {shape === 'shape_6' && (
        <div className="cs_shape_4">
          <img src="/images/icons/mail.svg" alt="Mail" />
        </div>
      )}
    </div>
  );
}
