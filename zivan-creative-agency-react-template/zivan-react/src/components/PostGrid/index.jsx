import React from 'react';
import PostStyle2 from '../Post/PostStyle2';
import PostStyle3 from '../Post/PostStyle3';

export default function PostGrid({ data }) {
  return (
    <div className="cs_grid_style_1">
      {data?.map((item, index) =>
        index === 0 ? (
          <div key={index}>
            <PostStyle2
              date={item.date}
              title={item.title}
              thumbnailSrc={item.thumbnailSrc}
              href={item.href}
            />
          </div>
        ) : (
          <div key={index}>
            <PostStyle3
              date={item.date}
              title={item.title}
              thumbnailSrc={item.thumbnailSrc}
              href={item.href}
            />
          </div>
        ),
      )}
    </div>
  );
}
