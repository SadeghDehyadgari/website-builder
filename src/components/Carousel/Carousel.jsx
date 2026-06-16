// src/components/Carousel/Carousel.jsx
// UPDATED: Added onApiInit prop for external control

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Carousel.module.css";

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
  onApiInit, // NEW: callback when emblaApi is ready
}) => {
  const plugins = withAutoplay ? [Autoplay({ delay: autoplayDelay })] : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      containScroll: "trimSnaps",
      direction: isRTL ? "rtl" : "ltr",
      slidesToScroll: 1,
      breakpoints: {
        "(min-width: 768px)": {
          slidesToScroll: slidesPerView > 1 ? slidesPerView : 1,
        },
      },
    },
    plugins,
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

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
  const PrevIcon = isRTL ? "<" : ">";
  const NextIcon = isRTL ? ">" : "<";

  return (
    <div className={`${styles.carouselContainer} ${className}`}>
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
