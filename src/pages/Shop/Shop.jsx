import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/product/productApi";
import MobileCategoriesSidebar from "../../components/MobileCategoriesSidebar/MobileCategoriesSidebar";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCards from "../../components/Skeleton/ProductCards/ProductCards";
import Pagination from "../../components/Pagination/Pagination";

export default function Shop() {
  window.scroll(0, 0);
  const params = useParams();
  let category = params?.category ? params?.category : "";
  let subCategory = params?.subCategory ? params?.subCategory : "";
  let subSubCategory = params?.subSubCategory ? params?.subSubCategory : "";
  let brand = params?.brand ? params?.brand : "";

  const query = {};
  const [currentPage, setCurrentPage] = useState(1);
  query["page"] = currentPage;
  query["limit"] = 15;
  query["category"] = category;
  query["subCategory"] = subCategory;
  query["subSubCategory"] = subSubCategory;
  query["brand"] = brand;
  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    ...query,
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
      <ProductCard key={product._id} product={product} />
    ));
  }
  if (!isLoading && !isError && data?.data?.length == 0) {
    content = <div className="text-red-500 p-4">No Product available</div>;
  }

  return (
    <section className="py-5">
      <div className="container">
        <ul className="flex gap-2 items-center text-neutral-content text-sm">
          {subCategory ? (
            <>
              <li>
                <Link to={`/shops/${category}`} className="text-primary">
                  {category.split("_")[0]}
                </Link>
              </li>
            </>
          ) : (
            category && (
              <>
                <li>{category.split("_")[0]}</li>
              </>
            )
          )}

          {subSubCategory ? (
            <>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>
                <Link
                  to={`/shops/${category}/${subCategory}`}
                  className="text-primary"
                >
                  {subCategory.split("_")[0]}
                </Link>
              </li>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>{subSubCategory.split("_")[0]}</li>
            </>
          ) : (
            subCategory && (
              <>
                <li>
                  <MdKeyboardArrowRight />
                </li>
                <li>{subCategory.split("_")[0]}</li>
              </>
            )
          )}
        </ul>

        <div className="mt-4">
          <div className="min-h-[70vh]">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
              {content}
            </div>

            {data?.meta?.total > 15 && (
              <Pagination
                pages={data?.meta?.pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
