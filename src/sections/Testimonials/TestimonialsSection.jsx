// src/sections/Testimonials/TestimonialsSection.jsx
// NEW FILE: Testimonials section component

import { useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./Testimonials.module.css";

/**
 * Renders a single testimonial card.
 */
const TestimonialCard = ({ avatar, name, role, quote }) => {
  return (
    <div className={styles.card}>
      {/* Quote icon background */}
      <div className={styles.quoteIcon} />

      <div className={styles.cardHeader}>
        <div className={styles.userInfo}>
          <img src={avatar} alt={name} className={styles.avatar} />
          <span className={styles.userName}>{name}</span>
        </div>
        <span className={styles.userRole}>{role}</span>
      </div>

      <p className={styles.quoteText}>{quote}</p>
    </div>
  );
};

/**
 * Testimonials section – left side: fixed info + nav buttons, right side: carousel.
 * Uses the shared Carousel component with external control via onApiInit.
 */
const TestimonialsSection = ({ title, description, items }) => {
  const [emblaApi, setEmblaApi] = useState(null);

  // Ensure items is an array
  const slides = items || [];

  const handlePrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const handleNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  // If no items, show nothing
  if (slides.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>
      {/* Fixed right panel */}
      <div className={styles.infoPanel}>
        <h2 className={styles.title}>
          {title || "تجربه همکاری از نگاه مشتریان"}
        </h2>
        <p className={styles.description}>
          {description ||
            "بخشی از تجربه کسانی که مسیر ساخت محصولاتشان را با ما شروع کردند."}
        </p>
        <div className={styles.navButtons}>
          <button
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Previous"
          >
            ❮
          </button>
          <button
            className={styles.navButton}
            onClick={handleNext}
            aria-label="Next"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Carousel wrapper */}
      <div className={styles.carouselWrapper}>
        <Carousel
          slides={slides}
          renderSlide={(slide) => (
            <TestimonialCard
              avatar={slide.avatar || "/avatars/avatar-1.png"}
              name={slide.name || "کاربر"}
              role={slide.role || "نقش شغلی"}
              quote={slide.quote || "نظر کاربر"}
            />
          )}
          slidesPerView={1}
          withAutoplay={false}
          showArrows={false} // We control arrows externally
          showDots={false} // No dots needed for this design
          isRTL={true}
          onApiInit={setEmblaApi}
          className={styles.carousel}
        />
      </div>
    </section>
  );
};

export default TestimonialsSection;
