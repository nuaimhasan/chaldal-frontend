import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";
import CategoryWaysProduct from "../../Skeleton/CategoryWaysProduct/CategoryWaysProduct";
import ProductSection from "../ProductsSection/ProductSection";

export default function CategoryWaysProducts() {
  const {
    data: categories,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery();

  let content = null;

  if (isLoading) {
    content = <CategoryWaysProduct />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error || "something went wrong"}</p>;
  }
  if (!isLoading && !isError && categories?.data?.length > 0) {
    content = categories?.data?.map((category) => (
      <ProductSection key={category?._id} category={category} />
    ));
  }

  return <>{content}</>;
}
