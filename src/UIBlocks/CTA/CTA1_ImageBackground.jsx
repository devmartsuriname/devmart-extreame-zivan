import React from 'react';
import Button from '../../components/Button';

/**
 * @component CTA1_ImageBackground
 * @description CTA section with image background and animated geometric shapes
 * @category CTA
 * @variant Image Background
 * @theme Both (Light & Dark)
 * 
 * @props
 * - title: string - CTA headline
 * - btnText: string - Button text
 * - btnUrl: string - Button URL
 * - bgUrl: string - Background image URL
 * - variant: string - Style variant (cs_style_1, cs_style_2)
 * - noShape: boolean - Hide animated shapes
 * 
 * @usedIn All home variants
 * @scss sass/shortcode/_cta.scss (.cs_cta.cs_style_1)
 */
export default function CTA1_ImageBackground({
  title,
  btnText,
  btnUrl,
  bgUrl,
  variant = 'cs_style_1',
  noShape = false,
}) {
  return (
    <section
      className={`cs_cta ${variant} cs_bg_filed position-relative`}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="container position-relative">
        <h2 className="cs_cta_title cs_fs_50 mb-0">{title}</h2>
        <Button btnText={btnText} btnUrl={btnUrl} />
      </div>
      {!noShape && (
        <div className="cs_cta_shape_1 position-absolute">
          <svg
            width={481}
            height={569}
            viewBox="0 0 481 569"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M194.296 568.569L1.11304 313.506L479.845 0.683594L194.296 568.569Z"
              stroke="#A3A3A3"
            />
          </svg>
        </div>
      )}
    </section>
  );
}
