import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function MobileCategories() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

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

  if (!isLoading && !isError && data?.data?.length > 0) {
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
        {data?.data?.map((category) => (
          <SwiperSlide key={category?._id}>
            <Link
              to={`shops/${category.slug}`}
              className="shadow border rounded p-2 flex justify-center items-center text-center h-[90px] hover:bg-primary/5 duration-300"
            >
              <div>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/categories/${
                    category?.icon
                  }`}
                  alt=""
                  className="w-10 h-9 mx-auto"
                />
                <h6 className="mt-2 font-medium text-[10px] md:text-xs lg:text-sm md:font-normal">
                  {category?.name}
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
          Popular Categories
        </h2>
        <div>{content}</div>
      </div>
    </section>
  );
}
