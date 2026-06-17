// src/components/Carousel/Carousel.jsx
// NEW FILE: Reusable Carousel component using Embla Carousel

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Carousel.module.css";

/**
 * Carousel component – a headless wrapper around embla-carousel.
 *
 * @param {Array} slides - Array of slide data
 * @param {Function} renderSlide - Function to render each slide: (slide, index) => ReactNode
 * @param {number} slidesPerView - Number of slides visible at once (default: 1)
 * @param {boolean} withAutoplay - Enable autoplay (default: false)
 * @param {number} autoplayDelay - Autoplay interval in ms (default: 5000)
 * @param {boolean} showArrows - Show prev/next buttons (default: true)
 * @param {boolean} showDots - Show dot indicators (default: true)
 * @param {boolean} isRTL - Right-to-left direction (default: true)
 * @param {string} className - Additional CSS class for the container
 * @param {Function} onApiInit - Callback when Embla API is ready
 */
const Carousel = ({
  slides,
  renderSlide,
  slidesPerView = 1,
  withAutoplay = false,
  autoplayDelay = 5000,
  showArrows = true,
  showDots = true,
  isRTL = true,
  className = "",
  onApiInit,
  onIndexChange,
}) => {
  // --- Embla setup with plugins ---
  const plugins = withAutoplay ? [Autoplay({ delay: autoplayDelay })] : [];

  // UPDATED: Added slidesPerView to options for proper snap behavior
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps", // Ensures snapping to adjacent slides
      direction: isRTL ? "rtl" : "ltr",
      slidesToScroll: 1,
      slidesPerView: slidesPerView, // NEW: Dynamic slides per view from props
      breakpoints: {
        "(max-width: 768px)": {
          slidesPerView: 1, // Mobile: 1 slide
        },
      },
    },
    plugins,
  );

  // --- State for navigation (dots & current index) ---
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  // Helper: sync internal state from emblaApi
  const syncEmblaState = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  // NEW: Call onApiInit when emblaApi becomes available
  useEffect(() => {
    if (emblaApi && onApiInit) {
      onApiInit(emblaApi);
    }
  }, [emblaApi, onApiInit]);

  // Effect: subscribe to Embla events and sync initial state
  useEffect(() => {
    if (!emblaApi) return;

    // Subscribe to 'select' events
    emblaApi.on("select", syncEmblaState);

    // Use requestAnimationFrame to avoid synchronous setState in effect
    const rafId = requestAnimationFrame(() => {
      syncEmblaState();
    });

    // Cleanup: unsubscribe and cancel animation frame
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

  // --- Navigation commands ---
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

  // --- Render nothing if no slides ---
  if (!slides || slides.length === 0) {
    return null;
  }

  const hasMultiple = slides.length > 1;

  // Use simple arrows without tails
  const PrevIcon = isRTL ? "❯" : "❮";
  const NextIcon = isRTL ? "❮" : "❯";

  return (
    <div className={`${styles.carouselContainer} ${className}`}>
      {/* Embla viewport */}
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.slideList}>
          {slides.map((slide, index) => (
            <div className={styles.slide} key={index}>
              {renderSlide(slide, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
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

      {/* Dots */}
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
