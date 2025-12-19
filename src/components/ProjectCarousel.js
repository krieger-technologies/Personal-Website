import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRef } from "react";
import "../styles/project-carousel.css";

export default function ProjectCarousel({
  projects,
  parentRef,
  carouselRef,
  newsSummaryBarChartUrl,
  newsDetailTableUrl,
}) {
  const swiperRef = useRef(null);

  const syncTopPagination = (swiper) => {
    const bottomEl = swiper.el.querySelector(".swiper-pagination-bottom");
    const topEl = swiper.el.querySelector(".swiper-pagination-top");
    if (!bottomEl || !topEl) return;

    topEl.innerHTML = bottomEl.innerHTML;

    const topBullets = topEl.querySelectorAll(".swiper-pagination-bullet");
    topBullets.forEach((b, idx) => {
      b.onclick = (e) => {
        e.preventDefault();
        swiper.slideTo(idx);
      };
    });

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

    swiper.once("transitionEnd", () => {
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (!activeSlide) return;

      const card = activeSlide.querySelector(".project-card");
      if (!card) return;

      let target = card.offsetTop;
      let p = card.offsetParent;
      while (p && p !== parent) {
        target += p.offsetTop;
        p = p.offsetParent;
      }

      const padding = 16;

      requestAnimationFrame(() => {
        parent.scrollTo({
          top: target - padding,
          behavior: "smooth",
        });
      });
    });
  };
  // update scroll height
  const updateHeight = () => {
  const swiper = swiperRef.current?.swiper;
  if (!swiper) return;

  requestAnimationFrame(() => {
    swiper.updateAutoHeight(0);
    swiper.update();
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
        pagination={{
          clickable: true,
          el: ".swiper-pagination-bottom",
        }}
        onSwiper={(swiper) => {
          swiper.pagination.init();
          swiper.pagination.render();
          swiper.pagination.update();

          syncTopPagination(swiper);

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
                    <Component
                        newsSummaryBarChartUrl={
                          proj.title === "News Scraper" ? newsSummaryBarChartUrl : undefined
                        }
                        newsDetailTableUrl={
                          proj.title === "News Scraper" ? newsDetailTableUrl : undefined
                        }
                        onContentReady={updateHeight}
                      />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        <div className="swiper-pagination swiper-pagination-top" />
        <div className="swiper-pagination swiper-pagination-bottom" />
      </Swiper>
    </div>
  );
}