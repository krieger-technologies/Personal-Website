import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRef } from "react";
import "../styles/project-carousel.css";

export default function ProjectCarousel({ projects, parentRef, carouselRef }) {
  const swiperRef = useRef(null);

const handleSlideChange = () => {
  const swiper = swiperRef.current?.swiper;
  if (!swiper || !parentRef?.current) return;

  const activeSlide = swiper.slides[swiper.activeIndex];
  const parent = parentRef.current;

  // bounding boxes of parent and slide
  const parentRect = parent.getBoundingClientRect();
  const slideRect = activeSlide.getBoundingClientRect();

  // Slide position relative to parent container
  const relativeTop = slideRect.top - parentRect.top;

  // Use card padding for consistent alignment
  const padding = 16; // px

  parent.scrollTo({
    top: parent.scrollTop + relativeTop - padding,
    behavior: "smooth",
  });
};

  return (
    <div className="carousel-container">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={true}
        spaceBetween={30}
        slidesPerView={1}
        autoHeight={true}
        onSlideChangeTransitionStart={handleSlideChange}
      >
        {projects.map((proj, index) => {
          const Component = proj.component;
          return (
            <SwiperSlide key={index}>
              <div className="project-card">
                <h2 className="project-title">{proj.title}</h2>
                <div className="card-scrollable-content">
                  <Component />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
