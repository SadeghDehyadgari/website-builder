// src/sections/ProjectsCarousel/ProjectsCarouselSection.jsx
import { useState, useCallback } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./ProjectsCarousel.module.css";
// [NEW] Import security utility for URL validation
import { isSafeUrl } from "../../utils/urlUtils";

/**
Renders a single project slide with mockup image on the RIGHT and info on the LEFT.
@param {Object} props - { logo, title, description, image }
*/
const ProjectSlide = ({ logo, title, description, image }) => {
  return (
    <div className={styles.slideContent}>
      <div className={styles.infoColumn}>
        {/* [UPDATED] Validate logo URL to prevent XSS */}
        {logo && isSafeUrl(logo) && (
          <img src={logo} alt="project logo" className={styles.projectLogo} />
        )}
        {/* [UPDATED] Added fallback for title in alt */}
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
      </div>
      <div className={styles.imageColumn}>
        {/* [UPDATED] Validate image URL to prevent XSS */}
        <img
          src={isSafeUrl(image) ? image : ""}
          alt={title || "پروژه"}
          className={styles.mockupImage}
        />
      </div>
    </div>
  );
};

const ProjectsCarouselSection = ({
  title,
  autoplayInterval = 5000,
  slides,
}) => {
  const [emblaApi, setEmblaApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = slides || [];
  const total = items.length;
  const hasMultiple = total > 1;

  // [UPDATED] Memoize handlers to prevent unnecessary re-renders in Carousel
  const handlePrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const handleIndexChange = useCallback((index) => {
    setCurrentIndex(index);
  }, []);

  // [UPDATED] Memoize render function to prevent unnecessary re-renders in Carousel
  const renderSlide = useCallback(
    (slide) => (
      <ProjectSlide
        logo={slide.logo}
        title={slide.title}
        description={slide.description}
        image={slide.image}
      />
    ),
    [],
  );

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === total - 1;
  const withAutoplay = autoplayInterval > 0;

  if (total === 0) return null;

  return (
    <section className={styles.container}>
      <div className={styles.decorTopLeft} />
      <div className={styles.decorBottomRight} />
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}

      <div className={styles.carouselCard}>
        {hasMultiple && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.arrowPrev}`}
              onClick={handlePrev}
              disabled={isPrevDisabled}
              aria-label="اسلاید قبلی"
            >
              ❮
            </button>
            <button
              className={`${styles.arrowButton} ${styles.arrowNext}`}
              onClick={handleNext}
              disabled={isNextDisabled}
              aria-label="اسلاید بعدی"
            >
              ❯
            </button>
          </>
        )}

        <Carousel
          slides={items}
          renderSlide={renderSlide}
          slidesPerView={1}
          align="center"
          containScroll={false}
          withAutoplay={withAutoplay}
          autoplayDelay={autoplayInterval}
          showArrows={false}
          showDots={false}
          isRTL={true}
          onApiInit={setEmblaApi}
          onIndexChange={handleIndexChange}
          className={styles.carousel}
          fullWidth={true}
        />
      </div>

      {hasMultiple && (
        <div className={styles.dotsContainer}>
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              aria-label={`رفتن به اسلاید ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsCarouselSection;
