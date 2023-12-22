import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";

import {
  useAddLogoMutation,
  useGetMainLogoQuery,
  useUpdateMainLogoMutation,
} from "../../../Redux/logo/logoApi";

export default function Logo() {
  const [mainLogos, setMainLogos] = useState([]);
  const { data: mainLogo, isLoading } = useGetMainLogoQuery();

  const [
    updateMainLogo,
    {
      isLoading: mainLogoLoading,
      isSuccess: mainLogoSuccess,
      isError: mainLogoError,
    },
  ] = useUpdateMainLogoMutation();

  const [
    addLogo,
    {
      isLoading: addLogoLoading,
      isSuccess: addLogoSuccess,
      isError: addLogoError,
    },
  ] = useAddLogoMutation();

  
  const id = mainLogo?.data[0]?._id;

  const handleUpdateAddMainLogo = async () => {
    const logo = mainLogos[0]?.file;

    if (!logo) {
      return Swal.fire("", "Logo is required", "error");
    }

    const formData = new FormData();
    formData.append("logo", logo);

    if (mainLogo?.data[0]?.logo && id) {
      // Update the existing logo
      await updateMainLogo({ id, formData });
    } else {
      const res = await addLogo(formData);
      console.log(res);
    }
  };

  useEffect(() => {
    if (mainLogoSuccess) {
      Swal.fire("", "Logo Update success", "success");
      setMainLogos([]);
    }

    if (addLogoSuccess) {
      Swal.fire("", "Logo successfully added", "success");
    }

    if (mainLogoError) {
      Swal.fire("", "somethin wrong, please try again", "error");
    }

    if (addLogoError) {
      Swal.fire("", "Something went wrong when uploading", "error");
    }
  }, [mainLogoSuccess, mainLogoError, addLogoSuccess, addLogoError]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <h1 className="font-medium text-neutral">Logo Setting</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="bg-base-100 rounded shadow">
          <div>
            <p className="text-neutral-content border-b p-3">
              Logo <small>(max 120px/56px)</small>
            </p>
            <div className="p-4 sm:flex items-center gap-4">
              <ImageUploading
                value={mainLogos}
                onChange={(icn) => setMainLogos(icn)}
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

                    <div className={`${mainLogos?.length > 0 && "mt-4"} `}>
                      {mainLogos?.map((img, index) => (
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

              {mainLogo?.data[0]?.logo && mainLogos?.length >= 0 && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/logo/${
                    mainLogo?.data[0]?.logo
                  }`}
                  alt=""
                  className="w-32 mt-4"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 border-t p-4">
            <button
              disabled={(mainLogoLoading || addLogoLoading) && "disabled"}
              onClick={handleUpdateAddMainLogo}
              className="primary_btn"
            >
              {mainLogoLoading || addLogoLoading
                ? "Loading"
                : id
                ? "Update Logo"
                : "Add Logo"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
