// src/sections/ProjectsCarousel/ProjectsCarouselSection.jsx
// UPDATED: Moved dotsContainer outside carouselCard so dots appear below the slide card.

import { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./ProjectsCarousel.module.css";

/**
 * Renders a single project slide with mockup image on the RIGHT and info on the LEFT.
 */
const ProjectSlide = ({ logo, title, description, image }) => {
  return (
    <div className={styles.slideContent}>
      <div className={styles.infoColumn}>
        {logo && (
          <img src={logo} alt="project logo" className={styles.projectLogo} />
        )}
        <h3 className={styles.projectTitle}>{title}</h3>
        <p className={styles.projectDescription}>{description}</p>
      </div>
      <div className={styles.imageColumn}>
        <img src={image} alt={title} className={styles.mockupImage} />
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

  if (total === 0) return null;

  const handlePrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const handleNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const handleIndexChange = (index) => {
    setCurrentIndex(index);
  };

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === total - 1;
  const withAutoplay = autoplayInterval > 0;

  return (
    <section className={styles.container}>
      <div className={styles.decorTopLeft} />
      <div className={styles.decorBottomRight} />

      {title && <h2 className={styles.sectionTitle}>{title}</h2>}

      {/* Carousel card – contains slides and arrows */}
      <div className={styles.carouselCard}>
        {hasMultiple && (
          <>
            <button
              className={`${styles.arrowButton} ${styles.arrowPrev}`}
              onClick={handlePrev}
              disabled={isPrevDisabled}
              aria-label="Previous slide"
            >
              ❮
            </button>
            <button
              className={`${styles.arrowButton} ${styles.arrowNext}`}
              onClick={handleNext}
              disabled={isNextDisabled}
              aria-label="Next slide"
            >
              ❯
            </button>
          </>
        )}

        <Carousel
          slides={items}
          renderSlide={(slide) => (
            <ProjectSlide
              logo={slide.logo}
              title={slide.title}
              description={slide.description}
              image={slide.image}
            />
          )}
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

      {/* UPDATED: Dots moved OUTSIDE the carousel card */}
      {hasMultiple && (
        <div className={styles.dotsContainer}>
          {items.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
              onClick={() => emblaApi && emblaApi.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsCarouselSection;
