import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRef } from "react";
import "../styles/project-carousel.css";

export default function ProjectCarousel({ projects }) {
  const swiperRef = useRef(null);

  const handleSlideChange = () => {
    const activeSlide = swiperRef.current?.swiper.slides[swiperRef.current.swiper.activeIndex];
    if (activeSlide) {
      const scrollable = activeSlide.querySelector(".card-scrollable-content");
      if (scrollable) scrollable.scrollTop = 0;
    }
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
        autoHeight={true}  // dynamically adjust height
        onSlideChange={handleSlideChange} // reset scroll
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


// export default function ProjectCarousel({ projects }) {
//   return (
//     <div className="carousel-container">
//       <Swiper
//         modules={[Pagination, Navigation]}
//         pagination={{ clickable: true }}
//         navigation={true}
//         spaceBetween={30}
//         slidesPerView={1}
//         autoHeight={true}   // <-- custom fits height of each card
//         style={{ width: "100%", height: "100%" }}
//       >
//         {projects.map((proj, index) => {
//           const Component = proj.component; // <-- assign to uppercase
//           return (
//             <SwiperSlide key={index}>
//               <div className="project-card">
//                 <h2 className="project-title">{proj.title}</h2>
//                 <div className="card-scrollable-content">
//                   <Component />   {/* <-- render dynamically */}
//                 </div>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// }
