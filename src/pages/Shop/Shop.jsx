import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../Redux/product/productApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCards from "../../components/Skeleton/ProductCards/ProductCards";
import ShopCategories from "./ShopCategories/ShopCategories";

export default function Shop() {
  window.scroll(0, 0);
  const params = useParams();
  let category = params?.category ? params?.category : "";

  const { data, isLoading, isError, error } = useGetProductsQuery({
    category,
  });

  let content = null;
  if (isLoading) {
    content = <ProductCards />;
  }
  if (!isLoading && isError) {
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }
  if (!isLoading && !isError && data?.data?.length == 0) {
    content = <div>No Product available</div>;
  }

  return (
    <section className="py-5 bg-gray-50 min-h-[70vh]">
      <div className="container">
        <ul className="flex gap-2 items-center text-neutral-content text-sm">
          <li>
            <Link to="/" className="text-primary">
              Home
            </Link>
          </li>
          <li>
            <MdKeyboardArrowRight />
          </li>

          {category ? (
            <>
              <li>
                <Link to="/shops" className="text-primary">
                  Shops
                </Link>
              </li>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>{category}</li>
            </>
          ) : (
            <li>Shops</li>
          )}
        </ul>

        <div className="md:flex gap-4 mt-4">
          <ShopCategories />

          <div className="shop_products min-h-[70vh]">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
