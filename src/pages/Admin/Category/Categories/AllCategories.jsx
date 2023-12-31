import { BiSolidPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";
import Spinner from "../../../../components/Spinner/Spinner";

export default function AllCategories() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  // console.log(error.data.error);
  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((category, i) => (
      <tr key={category?._id}>
        <td>{i + 1}</td>
        <td>
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/categories/${
                category?.icon
              }`}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            {category?.name}
          </div>
        </td>
        <td>{category?.order}</td>
        <td>
          <div className="flex items-center gap-4">
            <Link
              to={`/admin/category/edit/${category?._id}`}
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
    <div>
      {data?.data?.length < 10 && (
        <div className="flex justify-end mb-2">
          <Link
            to="/admin/category/add-category"
            className="primary_btn text-sm"
          >
            Add New Category
          </Link>
        </div>
      )}

      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Category</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
