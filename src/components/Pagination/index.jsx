import React from 'react';
import Spacing from '../Spacing';
import ChevronRight from '../icons/ChevronRight';

export default function Pagination() {
  return (
    <>
      <Spacing lg="45" md="45" />
      <ul className="cs_pagination_box cs_white_color cs_mp0 cs_semi_bold">
        <li>
          <button type="button" className="cs_pagination_item cs_center active">
            1
          </button>
        </li>
        <li>
          <button type="button" className="cs_pagination_item cs_center">
            2
          </button>
        </li>
        <li>
          <button type="button" className="cs_pagination_item cs_center">
            3
          </button>
        </li>
        <li>
          <button type="button" className="cs_pagination_item cs_center">
            <ChevronRight />
          </button>
        </li>
      </ul>
    </>
  );
}
