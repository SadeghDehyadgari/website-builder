// src/sections/TeamCarousel/TeamCarouselSection.jsx
// FIX: Added slidesToScroll={4} and changed align to "center" to fix loop overlap
// Removed containScroll to use default behavior

import { useState, useLayoutEffect, useRef } from "react";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./TeamCarousel.module.css";

/**
 * TeamCarouselSection
 * Renders a list of team members with avatar, name, and role.
 * - If members fit in one row → displayed as a centered flex grid.
 * - If they overflow → displayed as an autoplay carousel (no arrows, with dots).
 * - Desktop: 4 slides, Mobile: 1 slide (default breakpoint)
 */
const TeamCarouselSection = ({
  title = "",
  description = "",
  members = [],
}) => {
  const [isCarousel, setIsCarousel] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

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

  if (members.length === 0) return null;

  const renderMember = (member, index) => (
    <div key={member.id || index} className={styles.memberCard}>
      <img src={member.avatar} alt={member.name} className={styles.avatar} />
      <div className={styles.memberName}>{member.name}</div>
      <div className={styles.memberRole}>{member.role}</div>
    </div>
  );

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
        slidesPerView={4}
        align="center" // CHANGED: from "start" to "center" for smoother loop
        slidesToScroll={4} // NEW: scroll 4 slides at a time (matches slidesPerView)
        loop={true}
        withAutoplay={true}
        autoplayDelay={4000}
        showArrows={false}
        showDots={true}
        isRTL={true}
        className={styles.teamCarousel}
      />
    </div>
  );
};

export default TeamCarouselSection;
