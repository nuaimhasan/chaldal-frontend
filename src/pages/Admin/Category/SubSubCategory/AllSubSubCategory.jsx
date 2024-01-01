import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";
import Spinner from "../../../../components/Spinner/Spinner";

export default function AllSubSubCategory() {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();

  let content = null;
  if (isLoading) {
    return (content = <Spinner />);
  }
  if (!isLoading && isError) {
    content = <p>{error?.data?.error}</p>;
  }
  if (!isLoading && !isError && data?.data?.length > 0) {
    content = data?.data?.map((category, i) => (
      <tr key={category?._id}>
        <td>{i + 1}</td>
        <td>Sub Category</td>
        <td>{category?.order}</td>
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
        <td>Sub Category</td>
        <td>
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/category/edit-sub-category/${category?._id}`}
              className="flex gap-1 items-center hover:text-green-700 duration-300"
            >
              <BiSolidPencil />
            </Link>
            <button className="hover:text-red-500">
              <MdOutlineDelete />
            </button>
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
            to="/admin/category/add-sub-sub-category"
            className="primary_btn text-sm"
          >
            Add New Sub Category
          </Link>
        </div>
      )}

      <div className="relative overflow-x-auto shadow-lg">
        <table className="dashboard_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Sub SubCategory</th>
              <th>Order</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
}
