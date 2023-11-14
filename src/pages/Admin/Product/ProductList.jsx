import { Link } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetProductsQuery } from "../../../Redux/product/productApi";
import Spinner from "../../../components/Spinner/Spinner";
import Swal from "sweetalert2";

export default function ProductList() {
  const { data, isLoading, isError, error } = useGetProductsQuery({});

  const handleDeleteProduct = async (uuid) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/product/delete/${uuid}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${localStorage.getItem("aesthetic_jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data?.success) {
            Swal.fire("", "Product Delete Success", "success");
            location.reload();
          } else {
            Swal.fire("", "something went worng, please try again", "error");
          }
        });
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <tr key={product?.uuid}>
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
              to={`/admin/product/edit-product/${product?.uuid}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
              Edit
            </Link>
            <button
              onClick={() => handleDeleteProduct(product?.uuid)}
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
