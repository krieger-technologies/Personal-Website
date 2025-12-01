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
    if (parentRef?.current && carouselRef?.current) {
      // Calculate carousel's offset relative to parent
      const parentTop = parentRef.current.getBoundingClientRect().top + parentRef.current.scrollTop;
      const carouselTop = carouselRef.current.offsetTop;

      // Scroll parent so that carousel aligns to top
      parentRef.current.scrollTo({ top: carouselTop, behavior: "smooth" });
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

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import { useRef } from "react";
// import "../styles/project-carousel.css";

// export default function ProjectCarousel({ projects, parentRef }) {
//   const swiperRef = useRef(null);

//   const handleSlideChange = () => {
//     // Scroll the parent container to the top of the carousel
//     if (parentRef?.current) {
//       parentRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className="carousel-container">
//       <Swiper
//         ref={swiperRef}
//         modules={[Pagination, Navigation]}
//         pagination={{ clickable: true }}
//         navigation={true}
//         spaceBetween={30}
//         slidesPerView={1}
//         autoHeight={true}  // dynamically adjust height
//         onSlideChangeTransitionStart={handleSlideChange} // scroll parent
//       >
//         {projects.map((proj, index) => {
//           const Component = proj.component;
//           return (
//             <SwiperSlide key={index}>
//               <div className="project-card">
//                 <h2 className="project-title">{proj.title}</h2>
//                 <div className="card-scrollable-content">
//                   <Component />
//                 </div>
//               </div>
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// }

// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Pagination, Navigation } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/pagination";
// // import "swiper/css/navigation";

// // import { useRef } from "react";
// // import "../styles/project-carousel.css";

// // export default function ProjectCarousel({ projects }) {
// //   const swiperRef = useRef(null);

// //   const handleSlideChange = () => {
// //     const activeSlide = swiperRef.current?.swiper.slides[swiperRef.current.swiper.activeIndex];
// //     if (activeSlide) {
// //       activeSlide.scrollTo({ top: 0, behavior: 'smooth' });
// //     }
// //   };

// //   return (
// //     <div className="carousel-container">
// //       <Swiper
// //         ref={swiperRef}
// //         modules={[Pagination, Navigation]}
// //         pagination={{ clickable: true }}
// //         navigation={true}
// //         spaceBetween={30}
// //         slidesPerView={1}
// //         autoHeight={true}  // dynamically adjust height
// //         onSlideChangeTransitionStart={handleSlideChange} // reset scroll
// //       >
// //         {projects.map((proj, index) => {
// //           const Component = proj.component;
// //           return (
// //             <SwiperSlide key={index}>
// //               <div className="project-card">
// //                 <h2 className="project-title">{proj.title}</h2>
// //                 <div className="card-scrollable-content">
// //                   <Component />
// //                 </div>
// //               </div>
// //             </SwiperSlide>
// //           );
// //         })}
// //       </Swiper>
// //     </div>
// //   );
// // }
