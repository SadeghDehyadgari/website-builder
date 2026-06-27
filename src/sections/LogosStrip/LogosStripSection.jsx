// src/sections/LogosStrip/LogosStripSection.jsx
import { useState, useLayoutEffect, useRef, useCallback } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./LogosStrip.module.css";
import { isSafeUrl } from "../../utils/urlUtils";

const LogosStripSection = ({ logos = [] }) => {
  // ✅ ALL HOOKS AT THE TOP (Rules of Hooks)
  const [isCarousel, setIsCarousel] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  // [UPDATED] Memoize render function to prevent unnecessary re-renders in Carousel
  const renderLogo = useCallback(
    (logo, index) => (
      <div key={logo.id || index} className={styles.logoItem}>
        <img
          src={isSafeUrl(logo.imageUrl) ? logo.imageUrl : ""}
          alt={logo.alt || "لوگوی مشتری"}
          className={styles.logoImage}
        />
      </div>
    ),
    [],
  );

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

  if (!isReady) {
    return (
      <div className={styles.logosStrip} style={{ opacity: 0 }}>
        <div className={styles.gridContainer} ref={containerRef}>
          {logos.map(renderLogo)}
        </div>
      </div>
    );
  }

  if (!isCarousel) {
    return (
      <div className={styles.logosStrip}>
        <div className={styles.gridContainer} ref={containerRef}>
          {logos.map(renderLogo)}
        </div>
      </div>
    );
  }

  const slidesPerView = Math.min(logos.length, 5);

  return (
    <div className={styles.logosStrip}>
      <Carousel
        slides={logos}
        renderSlide={renderLogo}
        slidesPerView={slidesPerView}
        align="center"
        loop={true}
        withAutoplay={true}
        autoplayDelay={4000}
        showArrows={false}
        showDots={false}
        isRTL={true}
        className={styles.logosCarousel}
        breakpoints={{
          "(max-width: 768px)": {
            slidesPerView: 1,
            align: "center",
          },
        }}
      />
    </div>
  );
};

export default LogosStripSection;
