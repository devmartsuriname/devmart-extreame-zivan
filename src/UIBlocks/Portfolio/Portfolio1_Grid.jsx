import React from 'react';
import Portfolio from '../../components/Portfolio';

/**
 * @component Portfolio1_Grid
 * @description Grid portfolio with hover effects and filtering
 * @category Portfolio
 * @variant Grid
 * @theme Both (Light & Dark)
 * 
 * @props
 * - data: array - Portfolio items with thumbnailSrc, title, subTitle, url, category
 * 
 * @usedIn Creative Agency, Studio Agency
 * @scss sass/shortcode/_portfolio.scss
 */
export default function Portfolio1_Grid({ data }) {
  return (
    <div className="cs_portfolio_grid">
      <Portfolio data={data} />
    </div>
  );
}
