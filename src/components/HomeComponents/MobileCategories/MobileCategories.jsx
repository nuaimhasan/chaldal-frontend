import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryCard from "../../Skeleton/CategoryCard/CategoryCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
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
        breakpoints={{
          100: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          350: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {data?.data?.map((category) => (
          <SwiperSlide>
            <Link
              key={category?._id}
              to={`shops/${category.slug}`}
              className="shadow border rounded p-4 flex justify-center items-center text-center h-[100px]"
            >
              <div>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/categories/${
                    category?.icon
                  }`}
                  alt=""
                  className="w-11 h-10 mx-auto"
                />
                <h6 className="mt-2 font-medium text-[11px]">
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
    <section className="mt-2 md:hidden">
      <div className="container">{content}</div>
    </section>
  );
}
