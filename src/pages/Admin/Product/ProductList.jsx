import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../Redux/product/productApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function ProductList() {
  const query = {};
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  query["page"] = page;
  query["limit"] = limit;

  const { data, isLoading, isError, error } = useGetAllProductsQuery({
    ...query,
  });

  const [
    deleteProduct,
    { isSuccess, isError: deleteIsError, error: deleteError },
  ] = useDeleteProductMutation();

  const handleDeleteProduct = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      await deleteProduct(id);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return;
    if (data?.meta?.total && pageNumber > data?.meta.total / limit) return;

    setPage(pageNumber);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "Product Delete Success", "success");
    }
    if (deleteIsError) {
      Swal.fire(
        "",
        deleteError?.message
          ? deleteError?.message
          : "something went worng, please try again",
        "error"
      );
    }
  }, [isSuccess, deleteIsError, deleteError]);

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error?.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <tr key={product?._id}>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                product?.images[0]
              }`}
              alt=""
              className="w-9 h-9 rounded-lg"
            />
            {product?.title?.length > 30
              ? product?.title.slice(0, 30) + "..."
              : product?.title}
          </div>
        </td>
        <td>{product?.category?.name}</td>
        <td>
          {product?.featured ? (
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                checked={product?.featured && product?.featured}
                type="checkbox"
                value={product?.featured}
                class="sr-only peer"
                disabled
              />
              <div class="w-11 h-[23px] bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          ) : (
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                checked={product?.featured && product?.featured}
                type="checkbox"
                value={product?.featured}
                class="sr-only peer"
                disabled
              />
              <div class="w-11 h-[23px] bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:start-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          )}
        </td>
        <td>
          $
          {product?.variants?.length
            ? product?.variants[0]?.sellingPrice
            : product?.sellingPrice}
        </td>
        <td>
          {product?.variants?.length > 0
            ? product?.variants?.reduce(
                (quantity, item) =>
                  parseInt(quantity) + parseInt(item.quantity),
                0
              )
            : product?.quantity}
        </td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/product/edit-product/${product?._id}`}
              className="hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
            </Link>
            <button
              onClick={() => handleDeleteProduct(product?._id)}
              className="text-red-500"
            >
              <AiOutlineDelete />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Link
          to="/admin/product/add-product"
          className="text-sm bg-primary text-base-100 px-6 py-2 rounded"
        >
          Add New Product
        </Link>
      </div>

      <div className="bg-base-100 shadow-lg min-h-[80vh] flex flex-col justify-between">
        <div className="relative overflow-x-auto">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>Product name</th>
                <th>Category</th>
                <th>Featured</th>
                <th>Price</th>
                <th>Total Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{content}</tbody>
          </table>
        </div>

        {/* pagination */}
        {data?.data?.length > 0 && (
          <div className="flex items-end justify-end m-4">
            <div className="flex items-center space-x-1 border border-gray-300 rounded overflow-hidden text-sm">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <FaArrowLeft />
              </button>
              <button className="px-4 py-2 bg-gray-700 text-gray-100 font-medium focus:outline-none">
                {page}
              </button>
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => handlePageChange(page + 1)}
                disabled={
                  data?.meta?.total && page === data?.meta?.total / limit
                }
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
