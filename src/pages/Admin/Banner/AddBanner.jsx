import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { useAddBannerMutation } from "../../../Redux/banner/bannerApi";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBanner() {
  const [banners, setbanners] = useState([]);
  const [addBanner, { isLoading, isSuccess, isError }] = useAddBannerMutation();
  const navigate = useNavigate();

  const handleAddBanner = (e) => {
    e.preventDefault();
    const image = banners[0]?.file;
    if (!image) {
      return Swal.fire("", "Image is required", "error");
    }

    const formData = new FormData();
    formData.append("image", image);
    addBanner(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "banner add success", "success");
      setbanners([]);
      navigate("/admin/front-end/banner");
    }
    if (isError) {
      Swal.fire("", "something went wrong, please try again", "success");
    }
  }, [isSuccess, isError, navigate]);
  return (
    <section className="md:w-[600px] bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium">
        <h3>Add New Banner</h3>
      </div>
      <div className="p-4">
        <div className="p-4">
          <p className="text-neutral-content text-sm pb-1">
            Max Size (1000px / 400px)
          </p>
          <ImageUploading
            value={banners}
            onChange={(icn) => setbanners(icn)}
            dataURLKey="data_url"
          >
            {({ onImageUpload, onImageRemove, dragProps }) => (
              <div
                className="border rounded border-dashed p-4 w-max"
                {...dragProps}
              >
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <span
                    onClick={onImageUpload}
                    className="px-4 py-1.5 rounded-2xl text-base-100 bg-primary cursor-pointer text-sm"
                  >
                    Choose Image
                  </span>

                  <p className="text-neutral-content">or Drop here</p>
                </div>

                <div className={`${banners?.length > 0 && "mt-4"} `}>
                  {banners?.map((img, index) => (
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

        <div className="flex justify-end mt-6 border-t p-4">
          <button
            disabled={isLoading && "disabled"}
            onClick={handleAddBanner}
            className="primary_btn"
          >
            {isLoading ? "Loading..." : "Add Banner"}
          </button>
        </div>
      </div>
    </section>
  );
}
