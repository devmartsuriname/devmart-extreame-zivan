import React, { useState, useEffect, useCallback, useRef } from 'react';
import WaterWave from 'react-water-wave';
import Spacing from '../../components/Spacing';
import parse from 'html-react-parser';
import PlayButton from '../../components/icons/PlayButton';

/**
 * @component Video1_Modal
 * @description Video modal with water ripple effect and play button
 * @category Video
 * @variant Modal with Ripple
 * @theme Both (Light & Dark)
 * 
 * @props
 * - videoSrc: string - YouTube video URL
 * - bgUrl: string - Video thumbnail image
 * - title: string - Optional title above video (supports HTML)
 * - titleVariant: string - Title variant class
 * 
 * @usedIn Marketing Agency, Digital Agency, Tech Startup
 * @dependencies react-water-wave, html-react-parser
 * @scss sass/shortcode/_video.scss
 */
export default function Video1_Modal({ videoSrc, bgUrl, title, titleVariant }) {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('about:blank');
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Determine if video is YouTube to add autoplay parameter
  const getVideoSrcWithAutoplay = useCallback((src) => {
    if (!src) return 'about:blank';
    const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
    if (isYouTube) {
      const separator = src.includes('?') ? '&' : '?';
      return `${src}${separator}autoplay=1&mute=1`;
    }
    return src;
  }, []);

  const handleOpen = useCallback(() => {
    setIframeSrc(getVideoSrcWithAutoplay(videoSrc));
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, [videoSrc, getVideoSrcWithAutoplay]);

  const handleClose = useCallback(() => {
    setIframeSrc('about:blank');
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, handleClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Cleanup body overflow on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {title && (
        <>
          <h2
            className={`cs_video_block_1_title cs_fs_68 text-center mb-0 ${
              titleVariant || 'text-uppercase'
            }`}
          >
            {parse(title)}
          </h2>
          <Spacing lg="80" md="45" />
        </>
      )}

      <WaterWave
        className="cs_video_block cs_style_1 cs_bg_filed cs_radius_15 position-relative d-flex justify-content-center align-items-center cs_ripple_activate overflow-hidden"
        imageUrl={bgUrl}
      >
        {() => (
          <button
            className="cs_hero_video_icon"
            onClick={handleOpen}
            aria-label="Play video"
            type="button"
          >
            <PlayButton />
          </button>
        )}
      </WaterWave>

      <div
        className={isOpen ? 'cs_video_popup active' : 'cs_video_popup'}
        role="dialog"
        aria-modal="true"
        aria-label="Video player"
        ref={modalRef}
      >
        <div
          className="cs_video_popup_overlay"
          onClick={handleClose}
          aria-hidden="true"
        />
        <div className="cs_video_popup_content">
          <div className="cs_video_popup_layer" />
          <div className="cs_video_popup_container">
            <div className="cs_video_popup_align">
              <div className="embed-responsive embed-responsive-16by9">
                {isOpen && (
                  <iframe
                    className="embed-responsive-item"
                    src={iframeSrc}
                    title="Video player"
                    allow="autoplay; fullscreen; picture-in-picture"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
            </div>
            <button
              ref={closeButtonRef}
              className="cs_video_popup_close"
              onClick={handleClose}
              aria-label="Close video"
              type="button"
            />
          </div>
        </div>
      </div>
    </>
  );
}
