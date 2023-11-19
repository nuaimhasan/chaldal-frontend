import { Link } from "react-router-dom";
import { BiSolidPencil } from "react-icons/bi";
import Spinner from "../../../components/Spinner/Spinner";
import { useGetCategoriesQuery } from "../../../Redux/category/categoryApi";

export default function Categories() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery({});

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((category, i) => (
      <tr key={category?.id}>
        <td>{i + 1}</td>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/images/categories/${
                category?.icon
              }`}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            {category?.name}
          </div>
        </td>
        <td>
          <div className="flex items-center gap-4">
            <Link
              to={`/admin/category/edit/${category?.id}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
              Edit
            </Link>
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
            <th>SL</th>
            <th>Product name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </div>
  );
}
