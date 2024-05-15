import { Link } from "react-router-dom";
import { useAllBrandsQuery } from "../../../Redux/brand/brandApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function ChooseByBrand() {
  const { data, isLoading, isError, error } = useAllBrandsQuery();

  let content = null;
  if (isLoading) {
    content = (
      <div className="grid grid-cols-5 gap-2">
        <CategoryCard />
      </div>
    );
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError) {
    content = (
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          100: {
            slidesPerView: 2,
            spaceBetween: 3,
          },
          350: {
            slidesPerView: 4,
            spaceBetween: 3,
          },
          600: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
      >
        {data?.data?.map((brand) => (
          <SwiperSlide key={brand?._id}>
            <Link
              to={`shops/${brand.slug}`}
              className="shadow border rounded p-2 flex justify-center items-center text-center h-[90px] hover:bg-primary/5 duration-300"
            >
              <div>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/brands/${
                    brand?.icon
                  }`}
                  alt=""
                  className="w-10 h-9 mx-auto"
                />
                <h6 className="mt-2 font-medium text-[10px] md:text-xs lg:text-sm md:font-normal">
                  {brand?.name}
                </h6>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-2xl text-center font-semibold text-neutral mb-3">
          Popular Brands
        </h2>
        <div>{content}</div>
      </div>
    </section>
  );
}
