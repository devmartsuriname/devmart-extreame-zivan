import React from 'react';
import parse from 'html-react-parser';
import Spacing from '../Spacing';
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
    <div
      className={`cs_section_heading cs_style_1 cs_type_3 ${
        variant ? variant : ''
      }`}
    >
      <div className="container">
        {subTitle && (
          <p className="cs_section_subtitle cs_accent_color cs_fs_21 mb-0">
            {subTitle}
          </p>
        )}
        {children && children}
        <Spacing lg="20" md="10" />
        <h2 className="cs_section_title cs_fs_68 mb-0">{parse(title)}</h2>
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
