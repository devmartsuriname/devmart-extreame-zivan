import React, { useState, useRef, useEffect } from 'react';
import Spacing from '../../components/Spacing';
import SectionHeading from '../../components/SectionHeading';

/**
 * Accordion Item Component
 */
function AccordionItem({ title, content, isOpen, onClick }) {
  const accordionContentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (accordionContentRef.current) {
      setContentHeight(accordionContentRef.current.offsetHeight);
    }
  }, [isOpen]);

  const accordionClass = isOpen ? 'cs_accordian active' : 'cs_accordian';

  return (
    <>
      <div className={accordionClass}>
        <div className="cs_accordian_head" onClick={onClick}>
          <h2 className="cs_accordian_title cs_fs_21 cs_semibold">{title}</h2>
          <span className="cs_accordian_toggle cs_accent_color" />
        </div>
        <div
          className="cs_accordian_body_wrap"
          style={{ height: isOpen ? `${contentHeight}px` : '0' }}
        >
          <div className="cs_accordian_body" ref={accordionContentRef}>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * @component FAQ1_Accordion
 * @description FAQ section with expandable accordion items
 * @category FAQ
 * @variant Accordion
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - FAQ items with title and content
 * - variant: string - Style variant class
 * - sectionTitle: string - Section heading
 * - sectionSubTitle: string - Section subtitle
 * 
 * @usedIn Creative Agency, Marketing Agency
 * @scss sass/shortcode/_accordion.scss
 */
export default function FAQ1_Accordion({ data, variant, sectionTitle, sectionSubTitle }) {
  const [openItemIndex, setOpenItemIndex] = useState(0);
  const [firstItemOpen, setFirstItemOpen] = useState(true);

  const handleItemClick = index => {
    if (index === openItemIndex) {
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };

  useEffect(() => {
    if (firstItemOpen) {
      setOpenItemIndex(0);
      setFirstItemOpen(false);
    }
  }, [firstItemOpen]);

  return (
    <>
      <Spacing lg="143" md="75" />
      <div className="container">
        {sectionTitle && (
          <>
            <div className="cs_section_heading cs_style_1 text-center">
              <SectionHeading title={sectionTitle} subTitle={sectionSubTitle} />
            </div>
            <Spacing lg="85" md="45" />
          </>
        )}
        <div className={`cs_accordians cs_style_1 ${variant ? variant : ''}`}>
          {data.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={index === openItemIndex}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
      <Spacing lg="150" md="80" />
    </>
  );
}
