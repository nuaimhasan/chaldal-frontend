import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetFlashDealQuery } from "../../../Redux/flashDeal/flashDeal";
import ProductCard from "../../ProductCard/ProductCard";
import ProductCards from "../../Skeleton/ProductCards/ProductCards";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";

export default function FlashSale() {
  const { data, isLoading, isError, error } = useGetFlashDealQuery();

  const products = data?.data[0]?.flashProducts;

  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = products?.map((product) => (
      <SwiperSlide key={product._id}>
        <ProductCard key={product?._id} product={product?.product} />
      </SwiperSlide>
    ));
  }

  return (
    <div className="mt-2">
      <div className="container bg-base-100 p-4 rounded-lg shadow-lg">
        <div className="flex justify-between sm:items-center border-b pb-2 border-primary">
          <h1 className="md:text-xl font-medium md:font-semibold text-neutral">
            {data?.data[0]?.title}
          </h1>

          <div>
            <Link
              to="/shops"
              className="w-max flex items-center text-primary font-semibold hover-go"
            >
              <h1 className="text-sm md:text-[15px] font-normal">Shop More</h1>
              <MdKeyboardArrowRight className="text-[22px] pt-px duration-200" />
            </Link>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-2">
          {content}
        </div> */}
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
            {content}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
