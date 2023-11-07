import CategoryLists from "../../CategoryLists/CategoryLists";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

export default function Hero() {
  return (
    <section>
      <div className="container">
        <div className="lg:flex items-start gap-4">
          <div className="hidden lg:block w-[270px] border rounded-b">
            <CategoryLists />
          </div>

          <div className="hero_slider h-40 md:h-[402px] mt-2 lg:mt-0">
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="mySwiper w-full h-full"
            >
              <SwiperSlide>
                <img
                  src="/images/hero/hero1.jpg"
                  alt=""
                  className="w-full h-full rounded"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/hero/hero2.png"
                  alt=""
                  className="w-full h-full rounded"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/hero/hero3.webp"
                  alt=""
                  className="w-full h-full rounded"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
