// src/sections/TeamCarousel/TeamCarouselSection.jsx
import { useState, useLayoutEffect, useRef, useCallback } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./TeamCarousel.module.css";
import { isSafeUrl } from "../../utils/urlUtils";

/**
TeamCarouselSection
Renders a list of team members with avatar, name, and role.
If members fit in one row → displayed as a centered flex grid.
If they overflow → displayed as an autoplay carousel (no arrows, with dots).
Desktop: 4 slides, Mobile: 3 slides (custom breakpoint)
*/
const TeamCarouselSection = ({
  title = "",
  description = "",
  members = [],
}) => {
  // ✅ ALL HOOKS AT THE TOP (Rules of Hooks)
  const [isCarousel, setIsCarousel] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  // [UPDATED] Memoize render function to prevent unnecessary re-renders in Carousel
  // ✅ Moved BEFORE any early returns to comply with Rules of Hooks
  const renderMember = useCallback(
    (member, index) => (
      <div key={member.id || index} className={styles.memberCard}>
        <img
          // [UPDATED] Validate avatar URL to prevent XSS via malicious URIs
          src={isSafeUrl(member.avatar) ? member.avatar : ""}
          // [UPDATED] Added fallback for alt text
          alt={member.name || "عضو تیم"}
          className={styles.avatar}
        />
        <div className={styles.memberName}>{member.name}</div>
        <div className={styles.memberRole}>{member.role}</div>
      </div>
    ),
    [],
  );

  useLayoutEffect(() => {
    if (!containerRef.current || members.length === 0) {
      setIsReady(true);
      return;
    }
    const container = containerRef.current;
    const hasOverflow = container.scrollWidth > container.clientWidth + 1;
    setIsCarousel(hasOverflow);
    setIsReady(true);
  }, [members]);

  // ✅ NOW we can have early returns (all hooks already called)
  if (members.length === 0) return null;

  if (!isReady) {
    return (
      <div className={styles.teamSection} style={{ opacity: 0 }}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.gridContainer} ref={containerRef}>
          {members.map(renderMember)}
        </div>
      </div>
    );
  }

  if (!isCarousel) {
    return (
      <div className={styles.teamSection}>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.gridContainer} ref={containerRef}>
          {members.map(renderMember)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.teamSection}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      <Carousel
        slides={members}
        renderSlide={renderMember}
        slidesPerView={5}
        align="center"
        slidesToScroll={5}
        loop={true}
        withAutoplay={true}
        autoplayDelay={4000}
        showArrows={false}
        showDots={true}
        isRTL={true}
        className={styles.teamCarousel}
        breakpoints={{
          "(max-width: 768px)": {
            slidesPerView: 3,
            slidesToScroll: 1,
            align: "start",
            containScroll: "trimSnaps",
          },
        }}
      />
    </div>
  );
};

export default TeamCarouselSection;
