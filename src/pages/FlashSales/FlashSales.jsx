import { useGetActiveFlashDealQuery } from "../../Redux/flashDeal/flashDeal";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCards from "../../components/Skeleton/ProductCards/ProductCards";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

export default function FlashSales() {
  const { data, isLoading, isError, error } = useGetActiveFlashDealQuery();

  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = data?.data?.map((deal) => (
      <div>
        <h1 className="md:text-xl font-medium md:font-semibold text-neutral">
          {deal?.title}
        </h1>

        <div>
          <Swiper
            navigation={true}
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            className="mySwiper w-full h-full"
          >
            {deal?.flashProducts?.map((product) => (
              <SwiperSlide key={product._id}>
                <ProductCard key={product?._id} product={product?.product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    ));
  }

  return (
    <section className="py-5">
      <div className="container">{content}</div>
    </section>
  );
}
