import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRef } from "react";
import "../styles/project-carousel.css";

export default function ProjectCarousel({ projects, parentRef, carouselRef }) {
  const swiperRef = useRef(null);

  const syncTopPagination = (swiper) => {
    // find bottom and top pagination containers
    const bottomEl = swiper.el.querySelector(".swiper-pagination-bottom");
    const topEl = swiper.el.querySelector(".swiper-pagination-top");
    if (!bottomEl || !topEl) return;

    // copy bullets markup
    topEl.innerHTML = bottomEl.innerHTML;

    // remove any previous handlers to avoid duplicates (delegation below handles it)
    // add click handlers to top bullets to navigate swiper
    const topBullets = topEl.querySelectorAll(".swiper-pagination-bullet");
    topBullets.forEach((b, idx) => {
      // ensure it's not duplicating listeners
      b.onclick = (e) => {
        e.preventDefault();
        swiper.slideTo(idx);
      };
    });

    // set active class to match bottom (in case swiper didn't update top yet)
    const bottomActive = bottomEl.querySelector(".swiper-pagination-bullet-active");
    if (bottomActive) {
      const activeIndex = Array.from(bottomEl.querySelectorAll(".swiper-pagination-bullet")).indexOf(bottomActive);
      topEl.querySelectorAll(".swiper-pagination-bullet").forEach((b, i) => {
        b.classList.toggle("swiper-pagination-bullet-active", i === activeIndex);
      });
    }
  };

const handleSlideChange = () => {
  const swiper = swiperRef.current?.swiper;
  const parent = parentRef?.current;
  if (!swiper || !parent) return;

  // Use Swiper's transitionEnd event for precise timing
  swiper.once("transitionEnd", () => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (!activeSlide) return;

    const card = activeSlide.querySelector(".project-card");
    if (!card) return;

    // Walk up offsetParents to calculate true top relative to parent
    let target = card.offsetTop;
    let p = card.offsetParent;
    while (p && p !== parent) {
      target += p.offsetTop;
      p = p.offsetParent;
    }

    const padding = 16;

    // Run scroll in next frame to sync with DOM updates
    requestAnimationFrame(() => {
      parent.scrollTo({
        top: target - padding,
        behavior: "smooth", // keeps smooth scroll
      });
      // debugging logs
      // console.log(
      //   "Autoscroll fired:",
      //   "activeIndex =", swiper.activeIndex,
      //   "scrollTop =", target - padding
      // );
    });
  });
};

  return (
    <div className="carousel-container">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation]}
        navigation={true}
        spaceBetween={30}
        slidesPerView={1}
        autoHeight={true}
        speed={150}
        // Let Swiper manage the bottom pagination only
        pagination={{
          clickable: true,
          el: ".swiper-pagination-bottom",
        }}
        onSwiper={(swiper) => {
          // Ensure bottom pagination initialized normally
          swiper.pagination.init();
          swiper.pagination.render();
          swiper.pagination.update();

          // Mirror the initial bullets into the top pagination
          syncTopPagination(swiper);

          // Listen for pagination updates and slide changes and re-sync top pagination
          swiper.on("paginationUpdate", () => syncTopPagination(swiper));
          swiper.on("slideChange", () => {
            syncTopPagination(swiper);
            handleSlideChange();
          });
          swiper.on("paginationRender", () => syncTopPagination(swiper));
        }}
        onSlideChangeTransitionStart={handleSlideChange}
        >
        {projects.map((proj, index) => {
          const Component = proj.component;
          return (
            <SwiperSlide key={index}>
              <div className="slide-inner">
                <div className="project-card">
                  <h2 className="project-title">{proj.title}</h2>
                  <div className="card-scrollable-content">
                  <Component />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {/* TOP pagination (inside Swiper) */}
        <div className="swiper-pagination swiper-pagination-top" />

        {/* BOTTOM pagination (inside Swiper) */}
        <div className="swiper-pagination swiper-pagination-bottom" />
      </Swiper>
    </div>
  );
}
