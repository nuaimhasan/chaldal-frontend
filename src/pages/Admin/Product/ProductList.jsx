import { Link } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { useGetProductsQuery } from "../../../Redux/product/productApi";
import Spinner from "../../../components/Spinner/Spinner";

export default function ProductList() {
  let limit = 12;
  let page = 1;
  const { data, isLoading, isError, error } = useGetProductsQuery({
    limit,
    page,
  });

  console.log(data);

  let content = null;
  if (isLoading) {
    content = <Spinner />;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((product) => (
      <tr>
        <td>
          {product?.title?.length > 40
            ? product?.title.slice(0, 40) + "..."
            : product?.title}
        </td>
        <td>{product?.category}</td>
        <td>${product?.price}</td>
        <td>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/product/edit-product"
              className="flex gap-1 items-center hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
              Edit
            </Link>
            <button className="flex gap-1 items-center text-red-500">
              <AiOutlineDelete />
              Detele
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div class="relative overflow-x-auto shadow-lg">
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
