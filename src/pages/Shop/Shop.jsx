/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useGetAllProductsQuery } from "../../Redux/product/productApi";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductCards from "../../components/Skeleton/ProductCards/ProductCards";
import ShopCategories from "./ShopCategories/ShopCategories";

export default function Shop() {
  window.scroll(0, 0);
  const params = useParams();
  let category = params?.category ? params?.category : "";
  let subCategory = params?.subCategory ? params?.subCategory : "";
  let subSubCategory = params?.subSubCategory ? params?.subSubCategory : "";

  console.log(category, subCategory, subSubCategory);

  const query = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);

  query["page"] = page;
  query["limit"] = limit;
  query["category"] = category;
  query["subCategory"] = subCategory;
  query["subSubCategory"] = subSubCategory;

  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    ...query,
  });

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (data?.meta?.total && pageNumber > data?.meta.total / limit) return;

    setPage(pageNumber);
  };

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
            </>
          ) : (
            <li>Shops</li>
          )}

          {category && subCategory ? (
            <>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>
                <Link to={`/shops/${category?.slug}`} className="text-primary">
                  {category.split("_")[0]}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>{category.split("_")[0]}</li>
            </>
          )}

          {category && subCategory && subSubCategory ? (
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
            <>
              <li>
                <MdKeyboardArrowRight />
              </li>
              <li>{subCategory}</li>
            </>
          )}
        </ul>

        <div className="md:flex gap-4 mt-4">
          <ShopCategories />

          <div className="shop_products min-h-[70vh]">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {content}
            </div>

            {data?.data?.length > 0 && (
              <div className="flex items-center justify-center mt-16">
                <div className="flex items-center space-x-1 border border-gray-300 rounded overflow-hidden text-sm">
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    <FaArrowLeft />
                  </button>
                  <button className="px-4 py-2 bg-gray-700 text-gray-100 font-medium focus:outline-none">
                    Page {page}
                  </button>
                  <button
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={
                      data?.meta?.total && page === data?.meta.total / limit
                    }
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
