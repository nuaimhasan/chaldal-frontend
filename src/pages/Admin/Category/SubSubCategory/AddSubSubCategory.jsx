// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetCategoriesQuery } from "../../../../Redux/category/categoryApi";

export default function AddSubSubCategory() {
  // const navigate = useNavigate();
  const { data, isSuccess } = useGetCategoriesQuery();

  const handleAddCategory = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const subCategory = e.target.sub_category.value;
    const order = e.target.order.value;

    if (name === "" && category === "" && subCategory === "") {
      return Swal.fire("", "Please fill the all field", "warning");
    }

    const formData = new FormData();
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
        <p className="text-neutral-content">Sub SubCategory Name</p>
        <input type="text" name="name" />
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Category</p>
        <select name="category">
          {isSuccess &&
            data?.data?.map((category) => (
              <option key={category?._id} value={category?.name}>{category?.name}</option>
            ))}
        </select>
      </div>

      <div className="form_group mt-2">
        <p className="text-neutral-content">Sub Category</p>
        <select name="sub_category">
          {isSuccess &&
            data?.data?.map((category) => (
              <option key={category?._id} value={category?.name}>{category?.name}</option>
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
          Add Sub SubCategory
          {/* {isLoading ? "Loading.." : "Add category"} */}
        </button>
      </div>
    </form>
  );
}
