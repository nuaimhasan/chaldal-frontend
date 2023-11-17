import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Spinner from "../../../components/Spinner/Spinner";
import Swal from "sweetalert2";

import {
  useGetDashboardLogoQuery,
  useGetMainLogoQuery,
  useUpdateDashboardLogoMutation,
  useUpdateMainLogoMutation,
} from "../../../Redux/logo/logoApi";

export default function Logo() {
  const [mainLogos, setMainLogos] = useState([]);
  const [dashboardLogos, setDashboardLogos] = useState([]);
  const { data: mainLogo, isLoading } = useGetMainLogoQuery();
  const { data: dashboardLogo, isLoading: dashboardLoading } =
    useGetDashboardLogoQuery();

  const [
    updateMainLogo,
    {
      isLoading: mainLogoLoading,
      isSuccess: mainLogoSuccess,
      isError: mainLogoError,
    },
  ] = useUpdateMainLogoMutation();
  const [
    updateDashboardLogo,
    {
      isLoading: dashboardUpdateLoading,
      isSuccess: dashboardSuccess,
      isError: dashboardError,
    },
  ] = useUpdateDashboardLogoMutation();

  const handleUpdateMainLogo = () => {
    let logo = mainLogos[0]?.file;
    const id = mainLogo?.data?.uuid;

    if (!logo) {
      return Swal.fire("", "Logo is Recuired", "error");
    }

    const formData = new FormData();
    formData.append("logo", logo);

    updateMainLogo({ id, formData });
  };

  const handleUpdateDashboardLogo = () => {
    let logo = dashboardLogos[0]?.file;
    const id = dashboardLogo?.data?.uuid;

    if (!logo) {
      return Swal.fire("", "Logo is Recuired", "error");
    }

    const formData = new FormData();
    formData.append("logo", logo);

    updateDashboardLogo({ id, formData });
  };

  useEffect(() => {
    if (mainLogoSuccess) {
      Swal.fire("", "Logo Update success", "success");
      setMainLogos([]);
    }

    if (mainLogoError) {
      Swal.fire("", "somethin wrong, please try again", "error");
    }

    if (dashboardSuccess) {
      Swal.fire("", "Logo Update success", "success");
      setDashboardLogos([]);
    }

    if (dashboardError) {
      Swal.fire("", "somethin wrong, please try again", "error");
    }
  }, [mainLogoSuccess, mainLogoError, dashboardSuccess, dashboardError]);

  if (isLoading || dashboardLoading) {
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
              Main Logo <small>(max 120px/56px)</small>
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

              {mainLogo?.data?.logo && mainLogos?.length >= 0 && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/logos/${
                    mainLogo?.data?.logo
                  }`}
                  alt=""
                  className="w-32 mt-4"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 border-t p-4">
            <button
              disabled={mainLogoLoading && "disabled"}
              onClick={handleUpdateMainLogo}
              className="primary_btn"
            >
              {mainLogoLoading ? "Loading" : "Update Logo"}
            </button>
          </div>
        </div>

        <div className="bg-base-100 rounded shadow">
          <div>
            <p className="text-neutral-content border-b p-3">
              Dashboard Logo <small>(max 150px/80px)</small>
            </p>
            <div className="p-4 sm:flex items-center gap-4">
              <ImageUploading
                value={dashboardLogos}
                onChange={(icn) => setDashboardLogos(icn)}
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

                    <div className={`${dashboardLogos?.length > 0 && "mt-4"} `}>
                      {dashboardLogos?.map((img, index) => (
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

              {dashboardLogo?.data?.logo && dashboardLogos?.length >= 0 && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/images/logos/${
                    dashboardLogo?.data?.logo
                  }`}
                  alt=""
                  className="w-32 mt-4"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6 border-t p-4">
            <div className="flex justify-end mt-6 border-t p-4">
              <button
                disabled={dashboardUpdateLoading && "disabled"}
                onClick={handleUpdateDashboardLogo}
                className="primary_btn"
              >
                {dashboardUpdateLoading ? "Loading" : "Update Logo"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
