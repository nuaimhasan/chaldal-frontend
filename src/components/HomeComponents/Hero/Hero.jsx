import CategoryLists from "../../CategoryLists/CategoryLists";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { useGetBannersQuery } from "../../../Redux/banner/bannerApi";
import Banner from "../../Skeleton/Banner/Banner";

export default function Hero() {
  const { data, isLoading, isError } = useGetBannersQuery();

  let content = null;

  if (isLoading) {
    content = <Banner />;
  }
  if (!isLoading && !isError) {
    content = data?.data?.map((banner) => (
      <SwiperSlide key={banner._id}>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/images/banners/${
            banner?.image
          }`}
          alt=""
          className="w-full h-full rounded"
        />
      </SwiperSlide>
    ));
  }

  return (
    <section>
      <div className="container">
        <div className="lg:flex items-start gap-4">
          <div className="hidden lg:block w-[270px] border rounded-b">
            <CategoryLists />
          </div>

          <div className="hero_slider h-40 md:h-[400px] mt-2 lg:mt-0">
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              className="mySwiper w-full h-full"
            >
              {content}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
