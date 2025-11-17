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
          <div className="cs_section_subtitle cs_fs_18 cs_fs_20 cs_medium">
            {subTitle}
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
