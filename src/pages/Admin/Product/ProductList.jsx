/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
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
    content = <p>{error.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <tr key={product?.id}>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/products/${
                product?.images[0]
              }`}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            {product?.title?.length > 40
              ? product?.title.slice(0, 40) + "..."
              : product?.title}
          </div>
        </td>
        <td>{product?.category}</td>
        <td>${product?.sellPrice}</td>
        <td>
          <div className="flex items-center gap-4">
            <Link
              to={`/admin/product/edit-product/${product?._id}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
              Edit
            </Link>
            <button
              onClick={() => handleDeleteProduct(product?._id)}
              className="flex gap-1 items-center text-red-500"
            >
              <AiOutlineDelete />
              Detele
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div className="relative overflow-x-auto shadow-lg">
      <table className="dashboard_table">
        <thead>
          <tr>
            <th>Product name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>

      {data?.data?.length > 0 && (
        <div className="flex items-center justify-center mt-16 mb-5">
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
              disabled={data?.meta?.total && page === data?.meta.total / limit}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
