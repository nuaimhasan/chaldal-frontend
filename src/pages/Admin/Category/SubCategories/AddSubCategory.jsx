import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";

export default function AddSubCategory() {
  const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoriesQuery();
  const [icons, seticons] = useState([]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const order = e.target.order.value;

    if (!icon) {
      return Swal.fire("", "Icon is required", "error");
    }
    if (name === "" && category === "") {
      return Swal.fire("", "Category is required", "error");
    }

    const formData = new FormData();
    formData.append("icon", icon);
    formData.append("name", name);
    formData.append("order", order);

    // addCategory(formData);
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     Swal.fire("", "add success", "success");
  //     navigate("/admin/category/categories");
  //   }
  //   if (isError) {
  //     Swal.fire("", "Add category fail, please try again", "error");
  //   }
  // }, [isSuccess, isError, navigate]);

  return (
    <form
      onSubmit={handleAddCategory}
      className="p-4 bg-base-100 shadhow rounded sm:w-1/2"
    >
      <div className="form_group mt-2">
        <p className="text-neutral-content">Sub Category name</p>
        <input type="text" name="name" />
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Category</p>
        <select name="category">
          {isSuccess &&
            data?.data?.map((category) => (
              <option value={category?.name}>{category?.name}</option>
            ))}
        </select>
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Order</p>
        <input type="number" name="order" />
      </div>

      <div className="mt-4">
        <button
          className="primary_btn text-sm"
          // disabled={isLoading && "disabled"}
        >
          Add Sub Category
          {/* {isLoading ? "Loading.." : "Add category"} */}
        </button>
      </div>
    </form>
  );
}
