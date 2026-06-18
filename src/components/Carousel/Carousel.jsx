// src/components/Carousel/Carousel.jsx
// UPDATED: Removed unused props. Kept only necessary ones.

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Carousel.module.css";

/**
 * Carousel component – a headless wrapper around embla-carousel.
 *
 * @param {Array} slides - Array of slide data
 * @param {Function} renderSlide - Function to render each slide: (slide, index) => ReactNode
 * @param {number|string} slidesPerView - Number of slides visible at once (default: 1)
 * @param {string} align - Alignment of slides: "start", "center", "end" (default: "start")
 * @param {string|boolean} containScroll - "trimSnaps", "keepSnaps", or false (default: "trimSnaps")
 * @param {boolean} loop - Enable infinite loop scrolling (default: false)
 * @param {boolean} withAutoplay - Enable autoplay (default: false)
 * @param {number} autoplayDelay - Autoplay interval in ms (default: 5000)
 * @param {boolean} showArrows - Show prev/next buttons (default: true)
 * @param {boolean} showDots - Show dot indicators (default: true)
 * @param {boolean} isRTL - Right-to-left direction (default: true)
 * @param {string} className - Additional CSS class for the container
 * @param {Function} onApiInit - Callback when Embla API is ready
 * @param {Function} onIndexChange - Callback when slide index changes
 * @param {boolean} fullWidth - If true, slides take 100% width with no padding
 */
const Carousel = ({
  slides,
  renderSlide,
  slidesPerView = 1,
  align = "start",
  containScroll = "trimSnaps",
  loop = false,
  withAutoplay = false,
  autoplayDelay = 5000,
  showArrows = true,
  showDots = true,
  isRTL = true,
  className = "",
  onApiInit,
  onIndexChange,
  fullWidth = false,
}) => {
  const plugins = withAutoplay ? [Autoplay({ delay: autoplayDelay })] : [];

  // Default breakpoints: mobile → 1 slide with center alignment (for backward compatibility)
  const defaultBreakpoints = {
    "(max-width: 768px)": {
      slidesPerView: 1,
      align: "center",
      containScroll: "trimSnaps",
    },
  };

  const options = {
    align: align,
    containScroll: containScroll,
    loop: loop,
    direction: isRTL ? "rtl" : "ltr",
    slidesToScroll: 1,
    slidesPerView: slidesPerView,
    breakpoints: defaultBreakpoints, // Keep default breakpoints
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const syncEmblaState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && onApiInit) {
      onApiInit(emblaApi);
    }
  }, [emblaApi, onApiInit]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", syncEmblaState);

    const rafId = requestAnimationFrame(() => {
      syncEmblaState();
    });

    return () => {
      emblaApi.off("select", syncEmblaState);
      cancelAnimationFrame(rafId);
    };
  }, [emblaApi, syncEmblaState]);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(selectedIndex);
    }
  }, [selectedIndex, onIndexChange]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  if (!slides || slides.length === 0) {
    return null;
  }

  const hasMultiple = slides.length > 1;
  const PrevIcon = isRTL ? "❯" : "❮";
  const NextIcon = isRTL ? "❮" : "❯";

  const containerClasses = [
    styles.carouselContainer,
    fullWidth ? styles.fullWidth : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.slideList}>
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              {renderSlide(slide, index)}
            </div>
          ))}
        </div>
      </div>

      {showArrows && hasMultiple && (
        <>
          <button
            className={`${styles.arrowButton} ${styles.arrowPrev}`}
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            {PrevIcon}
          </button>
          <button
            className={`${styles.arrowButton} ${styles.arrowNext}`}
            onClick={scrollNext}
            aria-label="Next slide"
          >
            {NextIcon}
          </button>
        </>
      )}

      {showDots && hasMultiple && (
        <div className={styles.dotsContainer}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ""}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
