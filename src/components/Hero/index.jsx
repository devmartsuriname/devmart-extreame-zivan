import React, { useEffect, useState } from 'react';
import VideoModal from '../VideoModal';
import TextTransition, { presets } from 'react-text-transition';
import CrossShape from '../icons/shapes/CrossShape';

export default function Hero({ title, subtitle, videoSrc, bgUrl }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex(prevIndex => prevIndex + 1),
      3000, // every 3 seconds
    );

    return () => clearInterval(intervalId); // Use clearInterval here
  }, []);
  return (
    <section className="cs_hero cs_style_1 cs_primary_bg position-relative">
      <div className="container">
        <div className="cs_hero_text text-center position-relative">
          <p className="cs_hero_subtitle cs_accent_color cs_medium cs_fs_18 cs_dancing_animation">
            <TextTransition springConfig={presets.wobbly}>
              {title[index % title.length]}
            </TextTransition>
          </p>
          <h1 className="cs_hero_title cs_white_color cs_fs_68 cs_dancing_animation">
            {subtitle}
          </h1>
        </div>
        <div className="cs_hero_shape position-absolute">
          <CrossShape className="cs_ternary_fill" />
        </div>
      </div>
      <div className="cs_video_block_wrap position-relative">
        <div className="container">
          <VideoModal videoSrc={videoSrc} bgUrl={bgUrl} />
        </div>
      </div>
    </section>
  );
}
