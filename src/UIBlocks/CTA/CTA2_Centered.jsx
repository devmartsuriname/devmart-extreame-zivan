import React from 'react';
import Button from '../../components/Button';

/**
 * @component CTA2_Centered
 * @description Simple centered CTA with title and button
 * @category CTA
 * @variant Centered
 * @theme Both (Light & Dark)
 * 
 * @props
 * - title: string - CTA headline
 * - btnText: string - Button text
 * - btnUrl: string - Button URL
 * 
 * @usedIn Various pages
 * @scss sass/shortcode/_cta.scss (.cs_cta.cs_style_2)
 */
export default function CTA2_Centered({ title, btnText, btnUrl }) {
  return (
    <section className="cs_cta cs_style_2 position-relative text-center">
      <div className="container">
        <h2 className="cs_cta_title cs_fs_50 mb-0">{title}</h2>
        <Button btnText={btnText} btnUrl={btnUrl} />
      </div>
    </section>
  );
}
