import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../Redux/category/categoryApi";
import SideCategory from "../Skeleton/SideCategory/SideCategory";

export default function CategoryLists() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

  let content = null;
  if (isLoading) {
    content = <SideCategory />;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((category) => (
      <li key={category?.uuid}>
        <Link
          to={`/shops/${category?.slug}`}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 duration-300"
        >
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/images/categories/${
              category?.icon
            }`}
            alt=""
            className="w-6 h-6"
          />
          {category?.name}
        </Link>
      </li>
    ));
  }
  return <ul className="flex flex-col text-[15px]">{content}</ul>;
}
