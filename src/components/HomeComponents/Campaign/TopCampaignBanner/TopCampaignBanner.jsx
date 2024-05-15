import { Link } from "react-router-dom";
import { useGetTopCampaignBannersQuery } from "../../../../Redux/topCampaignBanner";

export default function TopCampaignBanner() {
  const { data, isLoading } = useGetTopCampaignBannersQuery();

  if (isLoading) {
    return (
      <div className="w-full h-28 sm:h-40 lg:h-60 bg-gray-100 rounded"></div>
    );
  }

  return (
    <section className="py-4">
      <div className="container">
        <div className="w-full lg:w-5/6 mx-auto h-28 sm:h-40 lg:h-60">
          <Link to="/shops">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/banner/${
                data?.data[0]?.image
              }`}
              alt=""
              className="w-full h-full rounded"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
