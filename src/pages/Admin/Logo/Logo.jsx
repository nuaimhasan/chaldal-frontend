import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";

export default function Logo() {
  const [mainLogos, setMainLogos] = useState([]);
  const [dashboardLogos, setDashboardLogos] = useState([]);

  return (
    <section>
      <div className="p-4 border-b bg-base-100 rounded">
        <h1 className="font-medium text-neutral">Logo Setting</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="bg-base-100 rounded shadow">
          <div>
            <p className="text-neutral-content border-b p-3">
              Main Logo <small>(max 150px/50px)</small>
            </p>
            <div className="p-4">
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
            </div>
          </div>

          <div className="flex justify-end mt-6 border-t p-4">
            <button className="primary_btn">Update Logo</button>
          </div>
        </div>

        <div className="bg-base-100 rounded shadow">
          <div>
            <p className="text-neutral-content border-b p-3">
              Dashboard Logo <small>(max 150px/50px)</small>
            </p>
            <div className="p-4">
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
            </div>
          </div>

          <div className="flex justify-end mt-6 border-t p-4">
            <button className="primary_btn">Update Logo</button>
          </div>
        </div>
      </div>
    </section>
  );
}
