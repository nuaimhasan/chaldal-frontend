import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../Redux/category/categoryApi";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../../components/Spinner/Spinner";
import { useEffect } from "react";

export default function Editcategory() {
  const { id } = useParams();
  const { data, isLoading } = useGetCategoryQuery(id);
  const category = data?.data;
  const navigate = useNavigate();

  const [updateCategory, { isLoading: updateLoading, isSuccess, isError }] =
    useUpdateCategoryMutation();

  const [icons, seticons] = useState([]);
  const [name, setName] = useState(category?.name);

  const handleUpdateCategory = () => {
    let icon = icons[0]?.file;

    const formData = new FormData();
    formData.append("name", name);
    if (icons?.length > 0) {
      formData.append("icon", icon);
    }

    updateCategory({ id, formData });
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "update success", "success");
      seticons([]);
      navigate("/admin/category/categories");
    }
    if (isError) {
      Swal.fire("", "update fail, please try again", "error");
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="p-4 bg-base-100 shadhow rounded sm:w-1/2">
      <div>
        <p>Icon</p>
        <ImageUploading
          value={icons}
          onChange={(icn) => seticons(icn)}
          dataURLKey="data_url"
        >
          {({ onImageUpload, onImageRemove, dragProps }) => (
            <div
              className="border rounded border-dashed p-4 w-max"
              {...dragProps}
            >
              <div className="flex items-center gap-2">
                <span
                  onClick={onImageUpload}
                  className="px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                >
                  Choose Image
                </span>

                <p className="text-neutral-content">or Drop here</p>
              </div>

              {icons?.length <= 0 && category?.icon && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/categories/${
                    category?.icon
                  }`}
                  alt=""
                  className="w-32 mt-4"
                />
              )}

              <div className={`${icons?.length > 0 && "mt-4"} `}>
                {icons?.map((img, index) => (
                  <div key={index} className="image-item relative">
                    <img src={img["data_url"]} alt="" className="w-40" />
                    <div
                      onClick={() => onImageRemove(index)}
                      className="w-7 h-7 bg-primary rounded-full flex justify-center items-center text-base-100 absolute top-0 right-0 cursor-pointer"
                    >
                      <AiFillDelete />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </ImageUploading>
      </div>

      <div className="form_group mt-2">
        <p>Category name</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          defaultValue={category?.name}
        />
      </div>

      <div className="mt-4">
        <button
          onClick={handleUpdateCategory}
          className="bg-primary text-base-100 px-6 py-1.5 rounded"
          disabled={updateLoading && "disabled"}
        >
          {updateLoading ? "Loading.." : "Update"}
        </button>
      </div>
    </div>
  );
}