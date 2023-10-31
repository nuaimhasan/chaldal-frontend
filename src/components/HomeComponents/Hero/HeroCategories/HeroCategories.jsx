import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";

export default function HeroCategories() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((category) => (
      <li key={category?._id}>
        <Link
          to={`/shops?category=${category?.slug}`}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 duration-300"
        >
          <img src={category?.icon} alt="" className="w-6" />
          {category?.name}
        </Link>
      </li>
    ));
  }
  return <ul className="flex flex-col text-[15px]">{content}</ul>;
}
