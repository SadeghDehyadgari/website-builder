// src/sections/LogosStrip/LogosStripSection.jsx
// UPDATED: Adjusted carousel props and added className for scoped styles.

import { useState, useLayoutEffect, useRef } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./LogosStrip.module.css";

const LogosStripSection = ({ logos = [] }) => {
  const [isCarousel, setIsCarousel] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current || logos.length === 0) {
      setIsReady(true);
      return;
    }
    const container = containerRef.current;
    const hasOverflow = container.scrollWidth > container.clientWidth + 1;
    setIsCarousel(hasOverflow);
    setIsReady(true);
  }, [logos]);

  if (logos.length === 0) return null;

  const renderLogo = (logo, index) => (
    <div key={logo.id || index} className={styles.logoItem}>
      <img
        src={logo.imageUrl}
        alt={logo.alt || "لوگوی مشتری"}
        className={styles.logoImage}
      />
    </div>
  );

  if (!isReady) {
    return (
      <div className={styles.logosStrip} style={{ opacity: 0 }}>
        <div className={styles.gridContainer} ref={containerRef}>
          {logos.map(renderLogo)}
        </div>
      </div>
    );
  }

  // Grid mode (no carousel) – using flex with gap and centering
  if (!isCarousel) {
    return (
      <div className={styles.logosStrip}>
        <div className={styles.gridContainer} ref={containerRef}>
          {logos.map(renderLogo)}
        </div>
      </div>
    );
  }

  // Carousel mode – use Carousel component with scoped className
  // Show up to 5 slides per view on desktop, fallback to 1 on mobile (handled by Carousel breakpoints)
  const slidesPerView = Math.min(logos.length, 5);

  return (
    <div className={styles.logosStrip}>
      <Carousel
        slides={logos}
        renderSlide={renderLogo}
        slidesPerView={slidesPerView}
        align="center"
        containScroll="trimSnaps"
        withAutoplay={true}
        autoplayDelay={4000}
        showArrows={false}
        showDots={false}
        isRTL={true}
        className={styles.logosCarousel} // ← scoped class for overrides
      />
    </div>
  );
};

export default LogosStripSection;
