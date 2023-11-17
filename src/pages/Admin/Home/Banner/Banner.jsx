import { Link } from "react-router-dom";
import {
  useDeleteBannerMutation,
  useGetBannersQuery,
} from "../../../../Redux/banner/bannerApi";
import Spinner from "../../../../components/Spinner/Spinner";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Banner() {
  const { data, isLoading, isError } = useGetBannersQuery();
  const [deleteBanner, { isSuccess, isError: deleteError }] =
    useDeleteBannerMutation();

  const handleDeleteBanner = (id) => {
    const isConfirm = window.confirm("are you sure delete this banner?");
    if (isConfirm) {
      deleteBanner(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      Swal.fire("", "delete success", "success");
    }
    if (deleteError) {
      Swal.fire("", "somethin wront, please try again", "error");
    }
  }, [isSuccess, deleteError]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <p>Fail fetch </p>;
  }

  return (
    <section className="bg-base-100 shadow rounded">
      <div className="p-4 border-b text-neutral font-medium flex justify-between items-center">
        <h3>Banner Lists</h3>
        <Link
          to="/admin/front-end/home-page/add-banner"
          className="primary_btn"
        >
          Add Banner
        </Link>
      </div>
      <div className="p-4">
        <div className="relative overflow-x-auto shadow-lg">
          <table className="dashboard_table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Banner Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((banner, i) => (
                <tr key={banner?.uuid}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/images/banners/${banner?.image}`}
                        alt=""
                        className="w-16 h-10"
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteBanner(banner?.uuid)}
                      className="hover:text-red-500 duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
