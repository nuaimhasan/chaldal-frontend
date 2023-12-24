import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../Redux/product/productApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function ProductList() {
  const { data, isLoading, isError, error } = useGetAllProductsQuery({});

  const [
    deleteProduct,
    { isSuccess, isError: deleteIsError, error: deleteError },
  ] = useDeleteProductMutation();

  const handleDeleteProduct = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      deleteProduct(id);
    }
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
              src={`${import.meta.env.VITE_BACKEND_URL}/images/products/${
                product?.image
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
        <td>${product?.price}</td>
        <td>
          <div className="flex items-center gap-4">
            <Link
              to={`/admin/product/edit-product/${product?.id}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
              Edit
            </Link>
            <button
              onClick={() => handleDeleteProduct(product?.id)}
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
    </div>
  );
}
